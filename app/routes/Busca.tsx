import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import type { Route } from "../+types/root";
import type { detalhesProps } from "~/interfaces/detalhesProps";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
import { Card } from "../components/ui/card";

import Menu from "~/components/Menu";

export function meta({}: Route.MetaArgs) {
  return [{ title: "StreamVibe" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("q");
  const pesquisa = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchParams}&api_key=${process.env.REACT_APP_API_KEY}`
  );
  const data = await pesquisa.json();
  return data.results;
}

export default function Busca() {
  const pesquisa = useLoaderData();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <div>
        <Menu />
      </div>

      <div className=" flex flex-col justify-center mt-10">
        <input
          className="w-full h-10 bg-foreground rounded-md p-2 text-primary"
          type="text"
          onBlur={(e) => {
            setSearchParams({ q: e.target.value });
          }}
        />

        {pesquisa.map((filme: detalhesProps) => (
          <Card className="w-[100px]">
            <img
              className="w-[150px] object-cover rounded-md "
              onClick={() => navigate(`/detalhes/${filme.id}`)}
              src={IMAGE_BASE_URL + filme.poster_path}
            ></img>
          </Card>
        ))}
      </div>
    </div>
  );
}
