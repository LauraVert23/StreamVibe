import type { Route } from "./+types/home";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../images/Logo.png";
import { AlignRight } from "lucide-react";

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
    } else {
      alert("Usuário ou senha incorretos");
      setUsuario("");
      setPassword("");
    }
  };
  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex justify-center mt-15 ml-2 mr-2">
        <img src={Logo}></img>
      </div>
      <div className="flex justify-center">
        <h1 className="text-primary-foreground font-bold text-center ml-2 mr-2 text-xl">
          Desfrute do melhor Streamer da história
        </h1>
      </div>

      <div className="flex items-center justify-center  pb-4">
        <div className="flex-1 flex flex-col items-center gap-5 min-h-0">
          <header className="flex flex-col items-center gap-9"></header>
          <div className="max-w-[250px] w-full space-y-6 px-4">
            <nav className="rounded-3xl border-2  p-5 border-destructive space-y-4">
              <p className="leading-6  text-chart-5 text-center">
                Tela de Login
              </p>
            </nav>
          </div>
        </div>
      </div>
      <div className="shadow rounded-lg px-2 py-3 bg-foreground mt-4 w-[250px] mx-auto flex flex-col gap-2 shadow-destructive">
        <Input
          type="user"
          placeholder="Usuário"
          className="text-primary"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          className="text-primary"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          onClick={() => login()}
          className="bg-muted-foreground text-background "
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}

export default Login;
