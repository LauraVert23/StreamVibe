import { useLoaderData } from "react-router";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface FilmeProps {
  id: number;
  title: string;
  backdrop_path: string;
}

function ListaFilmes() {
  const filmes = useLoaderData() as FilmeProps[];

  return (
    <div>
      <div className="text-white">
        {filmes.map((filme: FilmeProps) => (
          <div>
            <p key={filme.id}>{filme.title}</p>
            <img src={IMAGE_BASE_URL + filme.backdrop_path}></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaFilmes;
