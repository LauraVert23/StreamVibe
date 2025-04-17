import type { FilmeProps } from "~/interfaces/filmeProps";
import { Card, CardContent, CardDescription } from "../components/ui/card";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export function CarouselDemo({ filmes }: { filmes: FilmeProps[] }) {
  const navigate = useNavigate();
  return (
    <Carousel
      className="w-[300px] h-[400px] gap-2"
      opts={{
        slidesToScroll: 2,
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {filmes.map((filme: FilmeProps) => (
          <CarouselItem className="basis-1/2" key={filme.id}>
            <div className="p-1">
              <Card className=" flex flex-col gap-10">
                <CardContent className="flex aspect-square flex-col justify-center p-2">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={IMAGE_BASE_URL + filme.backdrop_path}
                    onClick={() => navigate(`/detalhes/${filme.id}`)}
                  ></img>
                  <CardDescription>
                    <div className="flex flex-row justify-between  ">
                      {filme.title}
                      <ArrowRight></ArrowRight>
                    </div>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
