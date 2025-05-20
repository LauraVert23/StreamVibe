import type { Route } from "./+types/home";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { redirect, useActionData } from "react-router";
import Logo from "../images/Logo.png";
import { Form } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "StreamVibe" }];
}

export async function action({ request }: Route.ActionArgs) {
  const email = import.meta.env.VITE_ADMIN_EMAIL;
  const senha = import.meta.env.VITE_ADMIN_PASSWORD;
  let formData = await request.formData();
  let usuario_email = formData.get("email");
  let usuario_senha = formData.get("senha");

  if (email === usuario_email && senha === usuario_senha) {
    return redirect("/principal");
  } else {
    return { error: "Email ou senha incorretos", redirect: false };
  }
}

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.error) {
      setUsuario("");
      setPassword("");
    }
  }, [actionData]);

  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex justify-center mt-15 lg:mt-25 ml-2 mr-2">
        <img
          className="md:w-[150px] lg:w-[200px] object-cover"
          src={Logo}
        ></img>
      </div>
      <div className="flex justify-center">
        <h1 className="text-primary-foreground font-bold text-center ml-2 mr-2 text-xl lg:text-2xl">
          Desfrute do melhor Streamer da história
        </h1>
      </div>

      <div className="flex items-center justify-center  pb-4">
        <div className="flex-1 flex flex-col items-center gap-5 min-h-0">
          <header className="flex flex-col items-center gap-9"></header>
          <div className="max-w-[250px] w-full space-y-6 px-4 md:max-w-[300px] lg:max-w-[350px]">
            <nav className="rounded-3xl border-2  p-5 border-destructive space-y-4 lg:p-8">
              <p className="leading-6  text-chart-5 text-center">
                Tela de Login
              </p>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <Form
          method="post"
          className="shadow rounded-lg px-2 py-3 bg-foreground mt-4 w-[250px] md:w-[300px] lg:w-[400px] mx-auto flex flex-col gap-2 md:gap-4 shadow-destructive"
        >
          <Input
            type="user"
            name="email"
            placeholder="Usuário"
            className="text-primary lg:text-lg xl:text-xl "
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <Input
            type="password"
            name="senha"
            placeholder="Senha"
            className="text-primary lg:text-lg xl:text-xl"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            className="bg-muted-foreground text-background lg:text-lg xl:text-xl "
          >
            Entrar
          </Button>
          {actionData?.error && (
            <p className="text-red-500 text-center">{actionData.error}</p>
          )}
        </Form>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <h1>Erro</h1>;
}
