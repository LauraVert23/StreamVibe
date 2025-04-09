import ListaFilmes from "~/components/ListaFilmes";
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

export default function PaginaPrincipal() {
  return (
    <div>
      <h1>Início</h1>
      {/* <ListaFilmes /> */}
    </div>
  );
}

export function ErrorBoundary() {
  return <h1>Erro</h1>;
}
