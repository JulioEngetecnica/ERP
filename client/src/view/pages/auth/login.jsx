import logo from "@/assets/logo.png";
import styles from "./styles/login.module.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";

export default function LoginForm() {
  const navigate = useNavigate();
  const { form, loading, error, handleChange, submitLogin } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitLogin();
      navigate("/");
    } catch {
      // erro já tratado no hook
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <img src={logo} alt="Logo do posto" className={styles["login-logo"]} />
        <h1>Bem-vindo(a)</h1>
        <p className={styles["subtitle"]}>Acesse sua conta para continuar</p>

        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <div className={styles["form-group"]}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="exemplo@posto.com"
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <span className={styles.error}>{error}</span>}

          <button
            type="submit"
            className={styles["login-button"]}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <a href="#" className={styles["forgot-password"]}>
          Esqueceu sua senha?
        </a>
      </div>
    </div>
  );
}
