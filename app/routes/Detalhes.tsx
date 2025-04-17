import { useLoaderData } from "react-router";
import Menu from "~/components/Menu";
import type { detalhesProps } from "~/interfaces/detalhesProps";
import type { Route } from "./+types/home";
import { Calendar, Star, LayoutGrid } from "lucide-react";
import Estrelas from "~/components/Estrelas";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export function meta({}: Route.MetaArgs) {
  return [{ title: "StreamVibe" }];
}

export async function loader({ params }: { params: { id: string } }) {
  const filmes = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
  );
  const data = await filmes.json();
  return data;
}

export default function PaginaDetalhes() {
  const filme = useLoaderData() as detalhesProps;
  return (
    <div>
      <Menu />
      <div className="flex flex-col items-center gap-2 ">
        <div className="flex aspect-square items-center justify-center p-4 ">
          <img
            className="rounded-md object-cover h-[450px] w-[300px]"
            src={IMAGE_BASE_URL + filme.poster_path}
          ></img>
        </div>
        <div className="bg-foreground flex flex-col justify-center gap-1 w-[300px] minh-[180px] rounded-md ">
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
          <div className="text-primary-foreground">
            <Estrelas nota={filme.vote_average}></Estrelas>
          </div>
          <div className="flex flex-row gap-3">
            <LayoutGrid color="#464444" />
            <h3 className="text-muted-foreground">Gêneros</h3>
          </div>
          <div className="flex flex-row gap-3 text-primary-foreground">
            {filme.genres.map((genero) => (
              <span
                key={genero.id}
                className="bg-foreground text-primary-foreground px-2 py-1 rounded-md text-sm border-1 border-border "
              >
                {genero.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
