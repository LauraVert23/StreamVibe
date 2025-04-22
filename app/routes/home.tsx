import type { Route } from "./+types/home";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import Menu from "~/components/Menu";

export function meta({}: Route.MetaArgs) {
  return [{ title: "StreamVibe" }];
}

export async function action() {
  const email = "admin@exemplo.com";
  const senha = "senha123";
  localStorage.setItem("email", email);
  localStorage.setItem("senha", senha);
}

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const email = localStorage.getItem("email");
    const senha = localStorage.getItem("senha");
    if (email === usuario.trim() && senha === password.trim()) {
      navigate("/principal");
    }
  };
  return (
    <div className="flex flex-col  ">
      <div>
        <Menu />
      </div>
      <div className="flex items-center justify-center pt-14 pb-4">
        <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <header className="flex flex-col items-center gap-9"></header>
          <div className="max-w-[300px] w-full space-y-6 px-4">
            <nav className="rounded-3xl border  p-6 dark:border-chart-1 space-y-4">
              <p className="leading-6  dark:text-primary-foreground text-center">
                Tela de Login
              </p>
            </nav>
          </div>
        </div>
      </div>
      <div className="shadow-md rounded-lg px-2 py-3 bg-foreground w-[250px] mx-auto flex flex-col gap-2">
        <Input
          type="user"
          placeholder="Usuário"
          className="text-primary"
          onChange={(e) => setUsuario(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          className="text-primary"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button onClick={() => login()} className="bg-primary text-background ">
          Entrar
        </Button>
      </div>
    </div>
  );
}

export default Login;
