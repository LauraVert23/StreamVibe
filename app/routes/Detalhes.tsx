import { useLoaderData } from "react-router";
import Menu from "~/components/Menu";
import type { detalhesProps } from "~/interfaces/detalhesProps";
import type { Route } from "./+types/home";
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
      <div className="mt-10">
        <h1 className="text-white ">{filme.title}</h1>
        <img src={IMAGE_BASE_URL + filme.backdrop_path}></img>
      </div>
      <div>
        <h2 className="text-white">{filme.overview}</h2>
      </div>
    </div>
  );
}
