import { Outlet, useLoaderData } from "react-router";
import type { FilmeProps } from "~/interfaces/filmeProps";
import { CarouselDemo } from "~/components/Carrossel";
import Menu from "~/components/Menu";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "StreamVibe" }];
}

export async function loader() {
  const filmes = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
  );
  const data = await filmes.json();
  return data.results;
}

export default function PaginaPrincipal() {
  const filmes = useLoaderData() as FilmeProps[];
  return (
    <div>
      <Menu />
      <div></div>
      <div className="flex justify-center pt-10">
        <CarouselDemo filmes={filmes}></CarouselDemo>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <h1>Erro</h1>;
}
