import { CarouselDemo } from "~/components/Carrossel";
import Menu from "~/components/Menu";
import type { Route } from "./+types/home";
import * as React from "react";
import { Await, redirect, useLoaderData } from "react-router";
import subContainer from "../images/Sub Container.png";
import subContainer1 from "../images/Sub Container (1).png";
import subContainer2 from "../images/Sub Container (2).png";
import { SkeletonCard } from "~/components/SkeletonCard";
import { getSession } from "~/sessions.server";
export function meta({}: Route.MetaArgs) {
  return [{ title: "StreamVibe" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userAuth = session.get("auth");
  if (!userAuth) {
    return redirect("/");
  }

  const res1 = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
  );
  const data1 = await res1.json();

  let nonCriticalData = new Promise((resolve) =>
    setTimeout(() => resolve(data1.results), 1500)
  );

  return { nonCriticalData };
}

export default function PaginaPrincipal() {
  const { nonCriticalData } = useLoaderData();

  return (
    <div className=" flex flex-col">
      <div className="absolute w-full z-10">
        <Menu />
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="h-max-[450px] md:h-max-[350px] lg:h-max-[500px] xl:h-max-[600px] w-[100%]">
          <img
            className="flex md:hidden w-full object-cover h-auto"
            src={subContainer}
          ></img>
          <img
            className="hidden md:flex xl:hidden w-full object-cover h-auto"
            src={subContainer1}
          ></img>
          <img
            className="hidden xl:flex w-full object-cover h-auto"
            src={subContainer2}
          ></img>
        </div>
        <div className="flex flex-col justify-center -mt-15 gap-10 lg:gap-15 items-center">
          <div className="flex flex-col gap-2 md:gap-3 text-center w-[300px] md:w-[500px] lg:w-[800px] xl:w-[1000px]]">
            <h1 className="text-xl font-bold text-secondary-foreground flex flex-col md:text-3xl xl:text-4xl ">
              O melhor site de streaming
            </h1>
            <p className="text-sm text-muted-foreground  md:text-lg lg:text-xl xl:text-2xl ">
              Descubra uma nova maneira de assistir filmes e séries com o nosso
              site de streaming.
            </p>
          </div>
          <div className="ml-2 flex flex-col gap-2  md:gap-3 2xl:gap-5 w-[300px] md:w-[700px] lg:w-[900px] xl:w-[1000px]">
            <h3 className="text-lg font-bold text-secondary-foreground flex flex-col md:text-2xl xl:text-3xl ">
              Explore nossa variedade de filmes
            </h3>
            <p className="text-xs text-muted-foreground  md:text-sm lg:text-lg xl:text-xl ">
              Explore os filmes populares, os mais assistidos e aclamados nos
              últimos tempos. Descubra novos filmes e diversifique sua
              experiência cinematográfica no melhor site de streaming.
            </p>
          </div>
          <React.Suspense
            fallback={
              <div>
                <SkeletonCard />
              </div>
            }
          >
            <Await resolve={nonCriticalData}>
              {(filmes) => (
                <div className="items-center flex flex-col mb-5 md:mb-10 lg:mb-5">
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
