import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import type { Route } from "../+types/root";
import type { detalhesProps } from "~/interfaces/detalhesProps";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
import { Card, CardContent, CardDescription } from "../components/ui/card";
import Menu from "~/components/Menu";
import erro from "../images/LogoCinza.png";

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
  const page = Number(searchParams.get("page") || 1);
  return (
    <div>
      <div>
        <Menu />
      </div>

      <div className=" flex flex-col justify-center mt-10 gap-3 items-center mb-3">
        <input
          className="w-full max-w-[98%] h-10 bg-foreground rounded-md p-2 text-primary"
          type="text"
          placeholder="Digite o nome do filme"
          onChange={(e) => {
            setSearchParams({ q: e.target.value });
          }}
        />
        {query ? (
          <div className="flex flex-wrap gap-3 justify-center">
            {pesquisa.results.map((filme: detalhesProps) => (
              <Card className="w-[150px] h-full" key={filme.id}>
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
        ) : (
          <h1 className="text-chart-5">Faça uma busca</h1>
        )}

        {/* {pesquisa.total_pages > 1 && (
          <div className="flex gap-2 justify-center my-4">
            {Array.from({ length: Math.min(pesquisa.total_pages, 10) }).map(
              (_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 rounded ${
                      pageNum === page ? "bg-destructive text-white" : "bg-ring"
                    }`}
                    onClick={() =>
                      setSearchParams({
                        q: query || "",
                        page: pageNum.toString(),
                      })
                    }
                  >
                    {pageNum}
                  </button>
                );
              }
            )}
          </div>
        )} */}
      </div>
    </div>
  );
}
