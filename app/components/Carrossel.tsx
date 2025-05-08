import type { FilmeProps } from "~/interfaces/filmeProps";
import { Card, CardContent, CardDescription } from "../components/ui/card";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
import erro from "../images/LogoCinza.png";
import { useMediaQuery } from "usehooks-ts";

export function CarouselDemo({ filmes }: { filmes: FilmeProps[] }) {
  const navigate = useNavigate();
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 1024px)");

  return (
    <Carousel
      className="w-[300px] h-[200px] gap-2 md:w-[700px] lg:h-[300px] lg:w-[900px]  xl:w-[1000px] 2xl:h-[400px] "
      opts={{
        slidesToScroll: isLg ? 5 : isMd ? 4 : 2,
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {filmes.map((filme: FilmeProps) => (
          <CarouselItem
            className="basis-1/2 md:basis-1/4 lg:basis-1/5"
            key={filme.id}
          >
            <div className="p-1">
              <Card
                className=" flex flex-col gap-10 hover:scale-105 cursor-pointer"
                onClick={() => navigate(`/detalhes/${filme.id}`)}
              >
                <CardContent className="flex aspect-square flex-col justify-center p-2 ">
                  <img
                    className="w-full hover:scale-110 h-full object-cover rounded-md mask-b-from-30% mask-radial-[100%_100%] mask-radial-from-20% cursor-pointer"
                    src={IMAGE_BASE_URL + filme.backdrop_path}
                    onError={(e) => (e.currentTarget.src = erro)}
                  ></img>

                  <CardDescription>
                    <div className="flex flex-row justify-between ">
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
      <div className="hidden lg:flex">
        <CarouselPrevious />
      </div>
      <div className="hidden lg:flex">
        <CarouselNext />
      </div>
    </Carousel>
  );
}
