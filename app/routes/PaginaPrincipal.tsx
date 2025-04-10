import { useLoaderData } from "react-router";
import Logo from "../images/Logo.png";
import { AlignRight } from "lucide-react";
import type { FilmeProps } from "~/interfaces/filmeProps";
import { CarouselDemo } from "~/components/Carrossel";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

async function getLista() {
  const filmes = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
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

export default function PaginaPrincipal() {
  const filmes = useLoaderData() as FilmeProps[];
  return (
    <div>
      <nav>
        <div className="flex justify-between">
          <img src={Logo}></img>
          <AlignRight />
        </div>
      </nav>
      <div></div>
      <div className="flex justify-center pt-10">
        <CarouselDemo filmes={filmes}></CarouselDemo>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <h1>Erro</h1>;
}
