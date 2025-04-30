import { useLoaderData } from "react-router";
import type { FilmeProps } from "~/interfaces/filmeProps";
import { CarouselDemo } from "~/components/Carrossel";
import Menu from "~/components/Menu";
import LogoCinza from "../images/LogoCinza.png";
import type { Route } from "./+types/home";
import { useMediaQuery } from "usehooks-ts";
import { useEffect, useState } from "react";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
import erro from "../images/LogoCinza.png";

export function meta({}: Route.MetaArgs) {
  return [{ title: "StreamVibe" }];
}

export async function loader() {
  const res1 = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
  );
  const res2 = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=2`
  );

  const data1 = await res1.json();
  const data2 = await res2.json();

  return [...data1.results, ...data2.results];
}

export default function PaginaPrincipal() {
  const filmes = useLoaderData() as FilmeProps[];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width:1024px)");

  const filmesParaMostrar = isClient
    ? isLg
      ? filmes.slice(0, 40)
      : isMd
      ? filmes.slice(0, 20)
      : filmes.slice(0, 9)
    : filmes.slice(0, 9);

  return (
    <div className=" flex flex-col">
      <div className="absolute w-full z-10">
        <Menu />
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <div
          className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8  gap-2 w-[100%] h-[400px] lg:h-[500px] xl:h-[600px]  relative 
        mask-radial-[75%_75%] mask-b-from-50% mask-radial-from-40%
      "
        >
          <div className="absolute inset-0 md:mt-10 flex justify-center items-center ">
            <img
              className="w-[170px] md:w-[230px] xl:w-[330px] 2xl:w-[400px]  h-auto opacity-75"
              src={LogoCinza}
            ></img>
          </div>
          {filmesParaMostrar.map((filme: FilmeProps) => (
            <div
              key={filme.id}
              className="flex justify-center inset-shadow-sm "
            >
              <img
                className="w-full h-auto object-cover rounded-md "
                src={IMAGE_BASE_URL + filme.backdrop_path}
                onError={(e) => {
                  e.currentTarget.src = erro;
                }}
              ></img>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center -mt-15 gap-10 md:gap-15 xl:gap-18 md:-mt-10 xl:-mt-5 items-center">
          <div className="flex flex-col gap-2 md:gap-3 2xl:gap-5 text-center w-[300px] md:w-[500px] lg:w-[800px] xl:w-[1000px]">
            <h1 className="text-xl font-bold text-secondary-foreground flex flex-col md:text-3xl 2xl:text-5xl ">
              O melhor site de streaming
            </h1>
            <p className="text-sm text-muted-foreground  md:text-base lg:text-xl 2xl:text-2xl ">
              Descubra uma nova maneira de assistir filmes e séries com o nosso
              site de streaming.
            </p>
          </div>
          <div className="ml-2 flex flex-col gap-2  md:gap-3 2xl:gap-5 w-[300px] md:w-[700px] lg:w-[900px]  xl:w-[1200px] 2xl:w-[1500px]">
            <h3 className="text-lg font-bold text-secondary-foreground flex flex-col md:text-2xl 2xl:text-4xl ">
              Explore nossa variedade de filmes
            </h3>
            <p className="text-xs text-muted-foreground  md:text-sm lg:text-lg 2xl:text-xl ">
              Explore os filmes populares, os mais assistidos e aclamados nos
              últimos tempos. Descubra novos filmes e diversifique sua
              experiência cinematográfica no melhor site de streaming.
            </p>
          </div>
          <div className="items-center flex flex-col">
            <CarouselDemo filmes={filmes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <h1>Erro</h1>;
}
