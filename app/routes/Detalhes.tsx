import { useLoaderData } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import Menu from "~/components/Menu";
import type { detalhesProps } from "~/interfaces/detalhesProps";
import type { Route } from "./+types/home";
import {
  Calendar,
  Star,
  LayoutGrid,
  Play,
  Plus,
  ThumbsUp,
  Volume2,
} from "lucide-react";
import Estrelas from "~/components/Estrelas";
import type { FilmeProps } from "~/interfaces/filmeProps";
import { CarouselDemo } from "~/components/Carrossel";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import type { FavoritoProps } from "~/interfaces/favoritoProps";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
import erro from "../images/LogoCinza.png";
export function meta({}: Route.MetaArgs) {
  return [{ title: "StreamVibe" }];
}
export async function loader({ params }: { params: { id: string } }) {
  const filmeResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
  );
  const similaresResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}`
  );
  const filme = await filmeResponse.json();
  const similares = await similaresResponse.json();

  return { filme, similares: similares.results };
}

export default function PaginaDetalhes() {
  const { filme, similares } = useLoaderData() as {
    filme: detalhesProps;
    similares: FilmeProps[];
  };
  const avaliacao = parseFloat(filme.vote_average) / 2;

  const [favoritosFilmes, setFavoritosFilmes] = useLocalStorage<
    FavoritoProps[]
  >("favoritos", []);

  const filmeFavorito = favoritosFilmes.find((item) => item.id === filme.id);
  const favoritar = (id: number) => {
    if (filmeFavorito) {
      setFavoritosFilmes(favoritosFilmes.filter((filme) => filme.id !== id));
    } else {
      setFavoritosFilmes([...favoritosFilmes, { id, favorito: true }]);
    }
  };

  return (
    <div>
      <Menu />
      <div className="flex flex-col items-center gap-2 ">
        <div className="flex aspect-square items-center justify-center p-4 relative ">
          <div className="absolute inset-0 flex justify-center items-center flex-col gap-2 mt-20">
            <Button className="bg-chart-5 w-[200px]">
              <Play fill="#fafafa" />
              Assistir
            </Button>
            <div className="flex flex-row gap-2">
              <div className="w-fit bg-background border-2 border-ring rounded-md p-1">
                <Plus color="white" />
              </div>
              <div className="w-fit bg-background border-2 border-ring rounded-md p-1">
                <ThumbsUp
                  color="white"
                  fill={filmeFavorito?.favorito ? "red" : undefined}
                  className="cursor-pointer"
                  onClick={() => {
                    favoritar(filme.id);
                  }}
                />
              </div>
              <div className="w-fit bg-background border-2 border-ring rounded-md p-1">
                <Volume2 color="white" />
              </div>
            </div>
          </div>
          <img
            className="rounded-md object-cover h-[450px] w-[300px]"
            src={IMAGE_BASE_URL + filme.poster_path}
            onError={(e) => {
              e.currentTarget.src = erro;
            }}
          ></img>
        </div>
        <div className="bg-foreground flex flex-col justify-center gap-1 w-[300px] minh-[180px] rounded-md p-2">
          <h5 className="text-muted-foreground">Descrição</h5>
          <div>
            <p className="text-primary-foreground">{filme.overview}</p>
          </div>
        </div>
        <div className="bg-foreground flex flex-col justify-center  w-[300px] minh-[180px] rounded-md p-2 gap-3">
          <div className="flex flex-row gap-3">
            <Calendar color="#464444" />
            <h3 className="text-muted-foreground">Data de Lançamento</h3>
          </div>
          <p className="text-primary-foreground">
            {filme.release_date.split("-")[0]}
          </p>

          <div className="flex flex-row gap-3">
            <Star color="#464444" />
            <h3 className="text-muted-foreground">Avaliação</h3>
          </div>
          <div className="text-primary-foreground flex flex-row gap-4">
            <Estrelas nota={filme.vote_average}></Estrelas>
            {avaliacao.toFixed(2)}
          </div>
          <div className="flex flex-row gap-3">
            <LayoutGrid color="#464444" />
            <h3 className="text-muted-foreground">Gêneros</h3>
          </div>
          <div className="flex flex-row gap-3 text-primary-foreground flex-wrap">
            {filme.genres.map((genero) => (
              <span
                key={genero.id}
                className="bg-foreground text-primary-foreground px-2 py-1 rounded-md text-sm border-1 border-border w-fit"
              >
                {genero.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-chart-5 text-center font-bold text-xl">
            Relacionados
          </h1>
          <CarouselDemo filmes={similares} />
        </div>
      </div>
    </div>
  );
}
