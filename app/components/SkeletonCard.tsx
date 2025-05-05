import { Card, CardContent, CardDescription } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export function SkeletonCard() {
  const cards = 5;
  return (
    <Carousel className="w-[300px] h-[200px] gap-2 md:w-[700px] lg:h-[300px] lg:w-[900px]  xl:w-[1000px] 2xl:h-[400px] ">
      <CarouselContent>
        {Array.from({ length: cards }).map((_, i) => (
          <CarouselItem className="basis-1/2 md:basis-1/4 lg:basis-1/5" key={i}>
            <Skeleton className="w-[140px] md:w-[155px] p-1 rounded:md h-[150px]">
              <Card>
                <CardContent className="h-[80px] object-cover rounded-md  "></CardContent>
                <CardDescription></CardDescription>
              </Card>
            </Skeleton>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
