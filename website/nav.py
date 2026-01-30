import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QToolBar, QAction, QLineEdit
from PyQt5.QtCore import QUrl
from PyQt5.QtWebEngineWidgets import QWebEngineView


class Navegador(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Meu Navegador Custom")
        self.setGeometry(100, 100, 1200, 800)

        # Criar o componente web
        self.browser = QWebEngineView()
        self.browser.setUrl(QUrl("https://www.google.com"))
        self.setCentralWidget(self.browser)

        # Criar barra de ferramentas
        navbar = QToolBar()
        self.addToolBar(navbar)

        # Botão Voltar
        back_btn = QAction("⬅", self)
        back_btn.triggered.connect(self.browser.back)
        navbar.addAction(back_btn)

        # Botão Avançar
        forward_btn = QAction("➡", self)
        forward_btn.triggered.connect(self.browser.forward)
        navbar.addAction(forward_btn)

        # Botão Recarregar
        reload_btn = QAction("🔄", self)
        reload_btn.triggered.connect(self.browser.reload)
        navbar.addAction(reload_btn)

        # Barra de endereço
        self.url_bar = QLineEdit()
        self.url_bar.returnPressed.connect(self.navegar_para_url)
        navbar.addWidget(self.url_bar)

        # Atualizar barra de endereço ao mudar de página
        self.browser.urlChanged.connect(self.atualizar_url)

    def navegar_para_url(self):
        url = self.url_bar.text()
        if not url.startswith("http"):
            url = "http://" + url
        self.browser.setUrl(QUrl(url))

    def atualizar_url(self, q):
        self.url_bar.setText(q.toString())


if __name__ == "__main__":
    app = QApplication(sys.argv)
    navegador = Navegador()
    navegador.show()
    sys.exit(app.exec_())
