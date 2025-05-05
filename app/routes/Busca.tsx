import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import type { Route } from "../+types/root";
import type { detalhesProps } from "~/interfaces/detalhesProps";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
import { Card, CardContent, CardDescription } from "../components/ui/card";
import Menu from "~/components/Menu";
import erro from "../images/LogoCinza.png";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { useEffect, useState } from "react";
import { SkeletonCard } from "~/components/SkeletonCard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "StreamVibe" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("q");
  const page = url.searchParams.get("page") || "1";
  const pesquisa = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchParams}&page=${page}&api_key=${process.env.REACT_APP_API_KEY}`
  );
  const data = await pesquisa.json();
  return data;
}

export default function Busca() {
  const pesquisa = useLoaderData();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const page = Number(searchParams.get("page"));
  const [finishedTimeout, setFinishedTimeout] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setFinishedTimeout(true);
    }, 1600);
    return () => clearTimeout(id);
  }, []);

  return (
    <div>
      <div>
        <Menu />
      </div>

      <div className=" flex flex-col justify-center mt-10 gap-3 items-center mb-3 xl:gap-8">
        <input
          className="w-full max-w-[98%] h-10 bg-foreground rounded-md p-2 text-primary xl:h-15 lg:text-lg"
          type="text"
          placeholder="Digite o nome do filme"
          value={query ?? ""}
          onChange={(e) => {
            setSearchParams({ q: e.target.value, page: "1" });
          }}
        />
        {query ? (
          <div>
            {!finishedTimeout && <SkeletonCard></SkeletonCard>}
            <div className="flex flex-wrap gap-3 lg:gap-5 justify-center">
              {pesquisa.results.map((filme: detalhesProps) => (
                <Card
                  className="w-[150px] lg:w-[200px] xl:w-[250px] h-full"
                  key={filme.id}
                >
                  <CardContent className="flex aspect-square flex-col justify-center p-2 gap-2">
                    <img
                      className="object-cover rounded-md h-[150px]"
                      onClick={() => navigate(`/detalhes/${filme.id}`)}
                      src={IMAGE_BASE_URL + filme.poster_path}
                      onError={(e) => (e.currentTarget.src = erro)}
                    ></img>

                    <CardDescription>{filme.title}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="text-chart-5 lg:text-xl xl:text-2xl">
            Faça uma busca
          </h1>
        )}
        {page < 1 ? (
          <></>
        ) : (
          <Pagination>
            <PaginationContent className="gap-2 md:gap-3 xl:gap-5">
              {page > 1 && (
                <>
                  <PaginationItem>
                    <PaginationPrevious
                      className="w-full"
                      href={`?q=${query}&page=${Math.max(1, page - 1)}`}
                      aria-disabled={page === 1}
                    ></PaginationPrevious>
                  </PaginationItem>
                  <PaginationItem className="bg-chart-2 rounded-md xl:p-0.5 xl:justify-center hidden md:flex">
                    <PaginationLink href={`?q=${query}&page=${page - 1}`}>
                      {page - 1}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem className="bg-destructive rounded-md xl:p-0.5 xl:justify-center">
                <PaginationLink href={`?q=${query}&page=${page}`}>
                  {page}
                </PaginationLink>
              </PaginationItem>

              {page < pesquisa.total_pages && (
                <>
                  <PaginationItem className="bg-chart-2 rounded-md hidden md:flex xl:p-0.5 xl:justify-center">
                    <PaginationLink href={`?q=${query}&page=${page + 1}`}>
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      className="w-full"
                      href={`?q=${query}&page=${Math.min(
                        pesquisa.total_pages,
                        page + 1
                      )}`}
                      aria-disabled={page === pesquisa.total_pages}
                    ></PaginationNext>
                  </PaginationItem>
                </>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
