import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email") && !localStorage.getItem("senha")) {
      localStorage.setItem("email", "admin@exemplo.com");
      localStorage.setItem("senha", "senha123");
    }
  }, []);
  const login = () => {
    const email = localStorage.getItem("email");
    const senha = localStorage.getItem("senha");
    if (email === usuario.trim() && senha === password.trim()) {
      console.log("Login bem sucedido");
      navigate("/PáginaPrincipal");
    }
  };
  return (
    <div className="flex flex-col  ">
      <div className="flex items-center justify-center pt-16 pb-4">
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <header className="flex flex-col items-center gap-9"></header>
          <div className="max-w-[300px] w-full space-y-6 px-4">
            <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
              <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
                Tela de Login
              </p>
            </nav>
          </div>
        </div>
      </div>
      <div className="shadow-md rounded-lg px-2 py-3 bg-gray-950 w-[250px] mx-auto flex flex-col gap-2">
        <Input
          type="user"
          placeholder="Usuário"
          onChange={(e) => setUsuario(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button onClick={() => login()}>Entrar</Button>
      </div>
    </div>
  );
}

export default Login;
