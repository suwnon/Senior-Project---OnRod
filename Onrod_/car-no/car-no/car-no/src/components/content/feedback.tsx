import CardFeedback from "../widget/cardfeedback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { fetchJs } from "@/lib/fetchAxios";
const FeedbackComponent = ({
  image = "",
  carId = 0,
}: {
  image: string;
  carId: number;
}) => {
  const [comment, setComment] = useState<
    {
      car_id: string;
      user_id: string;
      comment: string;
      rating: string;
    }[]
  >([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchJs<
        {
          car_id: string;
          user_id: string;
          comment: string;
          rating: string;
        }[]
      >(`/comment/${carId}`, "GET");
      setComment(result.data);
    };
    fetch();
  }, [carId]);

  return (
    <>
      <div className=" container mx-auto flex flex-col space-y-[16px] ">
        <p className="text-center text-[#F59E0B]">See Our Review</p>
        <p className="text-center text-[32px] text-[#1B1C57] font-semibold  ">
          What Our User Say About Us
        </p>
        <div className="w-[1080px]  relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full absolute "
          >
            <CarouselContent>
              {comment.map((data, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <div className="p-1">
                    <Card className="border-0 bg-transparent shadow-none">
                      <CardContent className="flex items-start justify-start w-full">
                        <CardFeedback image={image.split(",")[0]} data={data} />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  );
};
export default FeedbackComponent;
