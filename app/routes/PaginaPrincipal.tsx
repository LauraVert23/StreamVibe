const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
import { useLoaderData } from "react-router";

async function getLista() {
  const filmes = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=ed8ed527460694e8203a9865b9328154"
  );
  console.log("filmes:", filmes);
  const data = await filmes.json();
  console.log(data.results);
  return data.results;
}

export async function loader() {
  try {
    return await getLista();
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
}
interface FilmeProps {
  id: number;
  title: string;
  backdrop_path: string;
}

export default function PaginaPrincipal() {
  const filmes = useLoaderData() as FilmeProps[];
  return (
    <div>
      <h1 className="text-white">Início</h1>
      <div className="">
        {filmes.map((filme: FilmeProps) => (
          <div className="text-white">
            <p key={filme.id}>{filme.title}</p>
            <img src={IMAGE_BASE_URL + filme.backdrop_path}></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <h1>Erro</h1>;
}
