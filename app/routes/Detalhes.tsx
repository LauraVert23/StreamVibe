import { Await, redirect, useLoaderData } from "react-router";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
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
  Car,
} from "lucide-react";
import Estrelas from "~/components/Estrelas";
import type { FilmeProps } from "~/interfaces/filmeProps";
import { CarouselDemo } from "~/components/Carrossel";
import { Button } from "~/components/ui/button";
import type { FavoritoProps } from "~/interfaces/favoritoProps";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
import erro from "../images/LogoCinza.png";
import React, { useEffect, useState } from "react";
import { SkeletonCard } from "~/components/SkeletonCard";
import type { reviewsProps } from "~/interfaces/reviewsProps";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Card, CardContent, CardDescription } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [{ title: "StreamVibe" }];
}
export async function loader({ request, params }: Route.LoaderArgs) {
  const { getSession } = await import("../sessions.server");
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.get("auth")) {
    return redirect("/");
  }

  const filmeResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
  );
  const reviewsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`
  );
  const similaresResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}`
  );
  const filme = await filmeResponse.json();
  const reviewsData = await reviewsResponse.json();
  const similares = await similaresResponse.json();
  let nonCriticalData = new Promise((res) =>
    setTimeout(() => res(similares.results), 1500)
  );

  return { filme, nonCriticalData, reviews: reviewsData.results };
}

export default function PaginaDetalhes() {
  const { filme, nonCriticalData, reviews } = useLoaderData() as {
    filme: detalhesProps;
    nonCriticalData: FilmeProps[];
    reviews: reviewsProps[];
  };
  const avaliacao = parseFloat(filme.vote_average) / 2;
  const [isClient, setIsClient] = useState(false);
  const isMd = useMediaQuery("(min-width: 768px)");
  const [favoritosFilmes, setFavoritosFilmes] = useLocalStorage<
    FavoritoProps[]
  >("favoritos", []);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

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
        <div className="flex items-center justify-center p-4 relative w-[100%] lg:w-[95%]  mask-radial-[80%_80%] mask-b-from-85% mask-radial-from-70%">
          <div className="absolute inset-0 flex justify-center items-center flex-col  gap-2 xl:gap-5 mt-20  md:mt-60 lg:mt-80 xl:mt-110 ">
            <div className="hidden md:flex flex-col text-center w-[90%] xl:gap-2 ">
              <h1 className="text-primary text-xl font-bold lg:text-3xl xl:text-4xl">
                {filme.title}
              </h1>
              <p className="text-primary-foreground lg:text-lg xl:text-2xl">
                {filme.overview.split(".")[0]}
              </p>
            </div>
            <div className="flex md:flex-row gap-2 xl:gap-4 flex-col items-center">
              <Button className="bg-chart-5 hover:scale-105  w-[150px] lg:w-[200px] lg:text-xl">
                <Play fill="#fafafa" />
                Assistir
              </Button>
              <div className="flex flex-row gap-2 ">
                <div className="w-fit bg-background border-2 border-ring rounded-md p-1">
                  <Plus color="white" />
                </div>
                <div className="w-fit hover:scale-110 bg-background border-2 border-ring rounded-md p-1">
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
          </div>
          <img
            className=" w-full h-[400px] lg:h-[500px] xl:h-[700px] object-cover object-[25%_20%] rounded-md "
            src={IMAGE_BASE_URL + filme.poster_path}
            onError={(e) => {
              e.currentTarget.src = erro;
            }}
          ></img>
        </div>

        <div
          className="flex flex-col-reverse gap-5 md:flex-row w-[300px] md:w-[740px] lg:w-[900px] xl:w-[1000px]
         items-center md:items-start "
        >
          <div className="flex-col gap-3 flex ">
            <div className="bg-foreground flex flex-col gap-1 min-h-[170px] md:min-h-[150px] rounded-md p-2">
              <h5 className="text-muted-foreground xl:text-xl">Descrição</h5>
              <div>
                <p className="text-primary-foreground xl:text-xl">
                  {filme.overview}
                </p>
              </div>
            </div>
            <div className="flex bg-foreground flex-col w-[300px] md:w-[420px] lg:w-[600px] xl:w-[700px] gap-2 rounded-md p-2">
              <h5 className="text-muted-foreground xl:text-xl">Reviews</h5>
              <div>
                <Carousel
                  className="h-auto w-full gap-2"
                  opts={{
                    slidesToScroll: isMd ? 2 : 1,
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {reviews.map((comentario: reviewsProps) => (
                      <CarouselItem
                        className="basis-full md:basis-1/2"
                        key={comentario.id}
                      >
                        <Card>
                          <CardContent className="p-2 xl:text-xl gap-1">
                            <span>{comentario.author}</span>
                            {
                              <Estrelas
                                nota={comentario.author_details.rating}
                              />
                            }
                          </CardContent>
                          <CardDescription className="p-1 break-words -mt-5 xl:text-lg">
                            {comentario.content.slice(0, 130)}
                            {comentario.content.length > 100 ? "..." : ""}
                          </CardDescription>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-2 gap-10 md:mt-4 lg:mt-3 lg:justify-between lg:gap-0 w-full relative">
                    <CarouselPrevious className=" static translate-y-0 left-0 " />
                    <CarouselNext className="static translate-y-0 right-0" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
          <div className="bg-foreground flex flex-col justify-center min-w-[300px] min-h-[170px] md:min-h-[150px] rounded-md p-2 gap-3 lg:text-xl">
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
        </div>

        <div className="flex flex-col gap-5 xl:gap-8 mt-2 md:mt-3 lg:mt-8 xl:mt-10">
          <h1 className="text-chart-5 text-center font-bold text-xl lg:text-2xl 2xl:text-4xl">
            Relacionados
          </h1>
          <React.Suspense
            fallback={
              <div>
                <SkeletonCard />
              </div>
            }
          >
            <Await resolve={nonCriticalData}>
              {(filmes) => (
                <div className="items-center flex flex-col mb-12 md:mb-20 lg:mb-5">
                  <CarouselDemo filmes={filmes ?? []} />
                </div>
              )}
            </Await>
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <h1>Erro</h1>;
}
