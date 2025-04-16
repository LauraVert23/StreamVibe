import { useLoaderData } from "react-router";
import type { FilmeProps } from "~/interfaces/filmeProps";
import { CarouselDemo } from "~/components/Carrossel";
import Menu from "~/components/Menu";
import LogoCinza from "../images/LogoCinza.png";
import type { Route } from "./+types/home";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

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
      <div className="absolute w-full z-10">
        <Menu />
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className=" ">
          <div className="grid grid-cols-3 gap-2 w-[100%] h-[400px] relative  ">
            <div className="absolute inset-0 flex justify-center items-center ">
              <img
                className="w-[110px] h-auto opacity-75"
                src={LogoCinza}
              ></img>
            </div>
            {filmes.slice(0, 9).map((filme: FilmeProps) => (
              <div key={filme.id} className="flex justify-center  ">
                <img
                  className="w-full h-auto object-cover rounded-md "
                  src={IMAGE_BASE_URL + filme.backdrop_path}
                ></img>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <CarouselDemo filmes={filmes}></CarouselDemo>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <h1>Erro</h1>;
}
