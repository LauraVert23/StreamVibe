import type { FilmeProps } from "~/interfaces/filmeProps";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export function CarouselDemo({ filmes }: { filmes: FilmeProps[] }) {
  const navigate = useNavigate();
  return (
    <Carousel className="w-[168px] h-[155px] gap-2">
      <CarouselContent>
        {filmes.map((filme: FilmeProps) => (
          <CarouselItem key={filme.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img
                    src={IMAGE_BASE_URL + filme.backdrop_path}
                    onClick={() => navigate(`/detalhes/${filme.id}`)}
                  ></img>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
