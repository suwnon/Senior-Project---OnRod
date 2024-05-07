import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchJs } from "@/lib/fetchAxios";
import { useCarFilterStore } from "@/context/carStore";
interface CarInfo {
  Id: number;
  car_area: string;
  car_brand: string;
  car_description: null | string;
  car_price: number;
  color: null | string;
  contact_phone: string;
  distance: string;
  fuel: null | string;
  image_name: string;
  reason: null | string;
  selling_status: null | string;
  type_of_car: string;
  type_of_tranmission: null | string;
  user_id: number;
  user_name: string;
  year_of_car: null | number;
}
const Viewproducts = () => {
  const [data, setData] = useState<CarInfo[]>([]);
  const car = useCarFilterStore((state) => state.data);
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetchJs<CarInfo[]>("/getCar", "POST", car);
        if (res.success) {
          setData(
            res.data.filter(
              (item) => item.selling_status === "pending" && item.car_price > 0
            )
          );
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchCar();
  }, [car]);
  return (
    <>
      <div className="flex flex-row  overflow-hidden">
        <div className=" container mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {data.map((item, index) => (
              <Link
                to="/car/$carId"
                params={{ carId: `${item.Id}` }}
                key={index}
                className="p-5 border rounded-xl flex flex-col  space-y-2 h-[441px] items-center justify-center shadow-md"
              >
                <p className="text-left w-full">{item.user_name}</p>
                <div className="w-[240px] h-[214px] relative">
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={`http://localhost:3000/image/${
                      item.image_name.split(",")[0]
                    }`}
                  />
                </div>
                <div className="h-1/2 flex items-start justify-center flex-col">
                  <p>Car brand : {item.car_brand}</p>
                  <p>Body Type: {item.type_of_car}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* <div className=" flex flex-col">
            <div className="flex flex-col md:flex-row gap-4  items-start">
              <div className="w-2/6 flex flex-col space-y-2">
                <span className="text-[#F59E0B]">Our Recommendation</span>
                <span className="text-[#1B1C57] text-[32px]  font-medium">
                  OnRod
                </span>
              </div>
              <div className="w-full md:w-2/6 flex flex-row space-x-2  items-center justify-center">
                <Button
                  variant="outline"
                  className="bg-[#D1FAE5] rounded-full border-0 text-[#10B981] font-bold"
                >
                  Cars
                </Button>
                <Button
                  variant="outline"
                  className="bg-[#D1FAE5] rounded-full border-0 text-[#10B981] font-bold"
                >
                  Price
                </Button>
                <Button
                  variant="outline"
                  className="bg-[#D1FAE5] rounded-full border-0 text-[#10B981] font-bold"
                >
                  Model
                </Button>
              </div>
              <div className="w-2/6 space-x-2 flex items-center justify-center">
                <Button variant="outline" className="rounded-full" size="icon">
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-full" size="icon">
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="w-[2000px] h-fit">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full "
              >
                <CarouselContent>
                  {data.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="sm:basis-1/2 md:basis-1/4 border-0 bg-transparent  "
                    >
                      <div className="p-1">
                        <Link to="/car/$carId" params={{ carId: `${item.Id}` }}>
                          <Card className="border-0 bg-transparent shadow-none">
                            <CardContent className="flex  items-center justify-start w-full h-fit">
                              <div className="flex flex-col space-y-[24px]">
                                <div className="w-[340px] h-[382px] p-[24px] flex items-center  relative">
                                  <img
                                    src={`http://localhost:3000/image/${
                                      item.image_name.split(",")[0]
                                    }`}
                                    className=" object-cover"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[#0E1735] text-[24px] font-medium">
                                    {item.car_brand}
                                  </span>
                                  <span className="text-[#3C4563] text-[20px] font-medium">
                                    {item.car_price && item.car_price.toLocaleString('en-US')}
                                  </span>
                                </div>
                                <div className="space-x-2 flex items-center">
                                  <Avatar className="  w-[40px] h-[40px]   top-6 border-4  rounded-full">
                                    <AvatarImage
                                      src="https://github.com/shadcn.png"
                                      className=" rounded-full"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                  <span className="text-[#0E1735] text-[18px] font-bold">
                                    {item.user_name}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default Viewproducts;
