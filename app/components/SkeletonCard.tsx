import { Card, CardContent, CardDescription } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export function SkeletonCard() {
  const cards = 5;
  return (
    <Carousel className="w-[300px] h-[200px] gap-2 md:w-[700px] lg:h-[300px] lg:w-[900px]  xl:w-[1000px] 2xl:h-[400px] ">
      <CarouselContent className="p-2">
        {Array.from({ length: cards }).map((_, i) => (
          <CarouselItem className="basis-1/2 md:basis-1/4 lg:basis-1/5" key={i}>
            <Skeleton className="w-[140px] md:w-[155px] xl:w-[170px] xl:h-[160px] p-1 rounded:md h-[150px]">
              <Card className="p-1">
                <CardContent className="h-[80px] xl:h-[90px] object-cover rounded-md  "></CardContent>
                <CardDescription></CardDescription>
              </Card>
            </Skeleton>
          </CarouselItem>
        ))}
      </CarouselContent>{" "}
      <div className="flex justify-center gap-10 md:mt-8 lg:mt-3 lg:justify-between lg:gap-0 w-full relative">
        <CarouselPrevious className="static translate-y-0 left-0 !text-background" />
        <CarouselNext className="static translate-y-0 right-0 !text-background" />
      </div>
    </Carousel>
  );
}
