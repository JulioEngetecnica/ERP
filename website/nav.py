import os
import sys
from PyQt5.QtCore import QUrl, Qt
from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QToolBar, QAction, QLineEdit, QMessageBox
)
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEngineProfile, QWebEnginePage
from PyQt5.QtWebEngineCore import QWebEngineUrlRequestInterceptor, QWebEngineSettings


# ----------------------------
# Interceptor simples (bloqueio de domínios)
# ----------------------------
class Blocker(QWebEngineUrlRequestInterceptor):
    def __init__(self, blocked_hosts=None):
        super().__init__()
        self.blocked_hosts = set(blocked_hosts or [])

    def interceptRequest(self, info):
        url = info.requestUrl()
        host = url.host().lower()
        # bloqueia subdomínios também: ex. ads.example.com
        if any(host == b or host.endswith("." + b) for b in self.blocked_hosts):
            info.block(True)


# ----------------------------
# Page para controle de permissões e popups
# ----------------------------
class SecurePage(QWebEnginePage):
    def __init__(self, profile, parent=None):
        super().__init__(profile, parent)

        # Controle de permissões (geoloc, notif etc.)
        self.featurePermissionRequested.connect(self.on_permission_requested)

    def createWindow(self, window_type):
        # Bloqueia popups abrindo novas janelas
        # Se você quiser abrir em aba/mesma janela, dá para redirecionar.
        return None

    def on_permission_requested(self, origin, feature):
        # Política padrão: negar tudo. Você pode criar whitelist.
        self.setFeaturePermission(origin, feature, QWebEnginePage.PermissionDeniedByUser)


# ----------------------------
# Janela principal
# ----------------------------
class NavegadorSeguro(QMainWindow):
    def __init__(self, start_url="https://example.com", use_private_profile=True):
        super().__init__()
        self.setWindowTitle("Navegador Seguro (PyQt)")
        self.setGeometry(80, 80, 1280, 820)

        # Perfil
        if use_private_profile:
            # Off-the-record: não grava cookies/histórico em disco
            self.profile = QWebEngineProfile(self)
            self.profile.setOffTheRecord(True)
        else:
            # Perfil persistente (salva em disco)
            self.profile = QWebEngineProfile("perfil_padrao", self)

        # Bloqueios simples (edite a lista)
        blocked = {
            "doubleclick.net",
            "googlesyndication.com",
            "googleadservices.com",
            "adsystem.com",
            "facebook.net",
            "connect.facebook.net",
        }
        self.blocker = Blocker(blocked_hosts=blocked)
        self.profile.setUrlRequestInterceptor(self.blocker)

        # View + Page
        self.browser = QWebEngineView()
        self.page = SecurePage(self.profile, self.browser)
        self.browser.setPage(self.page)
        self.setCentralWidget(self.browser)

        # Hardening de settings (sem “anti-fingerprint”, só segurança)
        s = self.browser.settings()
        s.setAttribute(QWebEngineSettings.JavascriptEnabled, True)  # precisa rodar sites
        s.setAttribute(QWebEngineSettings.LocalStorageEnabled, True)
        s.setAttribute(QWebEngineSettings.PluginsEnabled, False)
        s.setAttribute(QWebEngineSettings.FullScreenSupportEnabled, False)
        s.setAttribute(QWebEngineSettings.ScreenCaptureEnabled, False)
        s.setAttribute(QWebEngineSettings.WebGLEnabled, True)  # muitos sites exigem
        s.setAttribute(QWebEngineSettings.ErrorPageEnabled, True)

        # Barra
        navbar = QToolBar("Navegação")
        navbar.setMovable(False)
        self.addToolBar(navbar)

        back_btn = QAction("⬅", self)
        back_btn.triggered.connect(self.browser.back)
        navbar.addAction(back_btn)

        forward_btn = QAction("➡", self)
        forward_btn.triggered.connect(self.browser.forward)
        navbar.addAction(forward_btn)

        reload_btn = QAction("🔄", self)
        reload_btn.triggered.connect(self.browser.reload)
        navbar.addAction(reload_btn)

        home_btn = QAction("🏠", self)
        home_btn.triggered.connect(lambda: self.browser.setUrl(QUrl("https://example.com")))
        navbar.addAction(home_btn)

        navbar.addSeparator()

        self.url_bar = QLineEdit()
        self.url_bar.setPlaceholderText("Digite a URL e ENTER…")
        self.url_bar.returnPressed.connect(self.navegar_para_url)
        navbar.addWidget(self.url_bar)

        navbar.addSeparator()

        clear_btn = QAction("🧹 Limpar dados", self)
        clear_btn.triggered.connect(self.limpar_dados)
        navbar.addAction(clear_btn)

        info_btn = QAction("🔒 Info TLS", self)
        info_btn.triggered.connect(self.mostrar_info_tls)
        navbar.addAction(info_btn)

        # Signals
        self.browser.urlChanged.connect(self.atualizar_url)
        self.browser.loadFinished.connect(self.on_load_finished)

        # Ir para página inicial
        self.browser.setUrl(QUrl(start_url))

    def navegar_para_url(self):
        url = self.url_bar.text().strip()
        if not url:
            return
        if "://" not in url:
            url = "https://" + url  # força https por padrão
        self.browser.setUrl(QUrl(url))

    def atualizar_url(self, qurl):
        self.url_bar.setText(qurl.toString())

    def on_load_finished(self, ok):
        if not ok:
            QMessageBox.warning(self, "Falha ao carregar", "Não foi possível carregar a página.")

    def limpar_dados(self):
        # Off-the-record já não grava; aqui serve para perfis persistentes também.
        self.profile.cookieStore().deleteAllCookies()
        self.profile.clearHttpCache()
        QMessageBox.information(self, "Limpeza", "Cookies e cache limpos.")

    def mostrar_info_tls(self):
        # QWebEngine não expõe fácil detalhes completos do certificado via API pública,
        # mas dá para ao menos mostrar se está em https.
        url = self.browser.url()
        if url.scheme().lower() == "https":
            QMessageBox.information(self, "TLS", f"Conexão HTTPS ativa:\n{url.toString()}")
        else:
            QMessageBox.warning(self, "TLS", f"ATENÇÃO: não é HTTPS:\n{url.toString()}")


def main():
    # ----------------------------
    # Proxy legítimo (ex.: corporativo)
    # Use assim:
    #   python navegador.py --proxy http://usuario:senha@proxy.minhaempresa.com:3128
    # ou:
    #   python navegador.py --proxy http://proxy.minhaempresa.com:3128
    # ----------------------------
    proxy = None
    start_url = "https://example.com"
    private = True

    args = sys.argv[1:]
    if "--start" in args:
        i = args.index("--start")
        if i + 1 < len(args):
            start_url = args[i + 1]

    if "--persistente" in args:
        private = False

    if "--proxy" in args:
        i = args.index("--proxy")
        if i + 1 < len(args):
            proxy = args[i + 1].strip()

    # Proxy via flags do Chromium (QWebEngine)
    if proxy:
        # Atenção: isso é para cenários administrativos/rede.
        os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = f'--proxy-server="{proxy}"'

    app = QApplication(sys.argv)
    w = NavegadorSeguro(start_url=start_url, use_private_profile=private)
    w.show()
    sys.exit(app.exec_())


if __name__ == "__main__":
    main()
