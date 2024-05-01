import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";

import React, { useContext, useEffect, useState } from "react";

import { expertCarId } from "@/pages/expert";
import { fetchJs } from "@/lib/fetchAxios";
import { useRouter } from "@tanstack/react-router";
import { AuthContext } from "@/context/authOption";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CarInfo {
  Id: number;
  car_area: string;
  car_brand: string;
  car_name: string;
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
  [key: string]: string | number | null | undefined;
}
const CarCommentComponent = () => {
  const carform = useForm();
  const { postId } = expertCarId.useParams();
  const router = useRouter();
  const [data, setData] = React.useState<CarInfo>();
  const user = useContext(AuthContext);
  const [textComment, setTextComment] = useState({
    carId: 0,
    userId: 0,
    rating: "",
    comment: "",
  });
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
      >(`/comment/${postId}`, "GET");
      setComment(result.data);
    };
    fetch();
  }, [postId]);

  const fetchNew = async () => {
    const result = await fetchJs<
      {
        car_id: string;
        user_id: string;
        comment: string;
        rating: string;
      }[]
    >(`/comment/${postId}`, "GET");
    setComment(result.data);
  };

  useEffect(() => {
    const getCar = async () => {
      try {
        const res = await fetchJs<CarInfo>(`/car/${postId}`, "GET");
        if (res.success) {
          const { data } = res;
          for (const key in data) {
            if (!data[key] && data[key] !== 0) data[key] = "";
            carform.setValue(key, data[key]);
          }
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCar();
  }, [postId, carform]);

  function handleDecimalsOnValue(value: string) {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    if (/\d+/g.test(value)) {
      if (Number(value) <= 5) {
        return value.match(regex)?.[0] ?? "";
      }
    }
  }

  const handleFormatRating = (e: string) => {
    if (e === null || e === undefined) {
      return;
    }
    setTextComment({
      ...textComment,
      rating: handleDecimalsOnValue(e) ?? "",
    });
  };

  const handleAddComment = async () => {
    const { rating, comment } = textComment;
    if (rating === "" || comment === "") {
      return;
    }
    try {
      const result = await fetchJs(
        "/addComment/" + postId + "/" + user?.user.Id,
        "POST",
        {
          comment,
          rating,
        }
      );
      if (result.success) {
        fetchNew();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto lg:py-0 py-5 ">
        <div className="flex flex-col space-y-[16px] items-start justify-center ">
          <p className="text-[40px]  text-[#1B1C57] font-bold w-[360px]">
            Car Overview
          </p>
          <div className="w-full flex lg:flex-row flex-col gap-2 ">
            <div className="lg:w-1/2 w-full">
              <Card className="border-0">
                <CardContent className="p-5 ">
                  <Form {...carform}>
                    <form
                      // onSubmit={form.handleSubmit(onSubmit)}
                      className=" grid grid-cols-2 gap-4"
                    >
                      <FormField
                        disabled
                        control={carform.control}
                        name="car_brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Car</FormLabel>
                            <Input placeholder="Type Car brand" {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={carform.control}
                        name="car_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Model Name</FormLabel>
                            <Input placeholder="Type Model Name" {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={carform.control}
                        name="color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type of Color</FormLabel>
                            <Input placeholder="Type Color" {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={carform.control}
                        name="car_area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Car Viewing Point</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={carform.control}
                        name="car_price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price </FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min={0} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={carform.control}
                        name="distance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mile</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={carform.control}
                        name="year_of_car"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year Of Car</FormLabel>
                            <Input placeholder="Year Of Car" {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={carform.control}
                        name="type_of_tranmission"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type Of Tranmission</FormLabel>
                            <Input
                              placeholder="Type Of Tranmission"
                              {...field}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={carform.control}
                        name="fuel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fuel/Electric</FormLabel>
                            <Input placeholder="Fuel/Electric" {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={carform.control}
                        name="type_of_car"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Body Type</FormLabel>
                            <Input placeholder="Body Type" {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={carform.control}
                        name="user_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <Input {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        disabled
                        control={carform.control}
                        name="contact_phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <Input type="number" min={0} {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* <Button
                        type="button"
                        className="text-[#047857] col-start-1 col-end-3 bg-[#D1FAE5]"
                        onClick={() => handleGetApprove()}
                      >
                        Schedule viewing
                      </Button> */}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            <div className="lg:w-1/2 w-full flex flex-col space-y-2  items-center">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-sm"
              >
                <CarouselContent>
                  {data?.image_name &&
                    data?.image_name.split(",").map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-full lg:basis-full"
                      >
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-3xl font-semibold">
                                <img
                                  src={`http://localhost:3000/image/${image}`}
                                />
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="flex flex-col space-y-2 w-full items-center">
                <div className="text-start w-full">Description</div>
                <Textarea
                  disabled
                  placeholder="Description..."
                  className="resize-none w-full"
                  value={data?.car_description}
                />
              </div>
            </div>
          </div>

          <p className="text-[40px]  text-[#1B1C57] font-bold w-[360px]">
            Add comment
          </p>
          {comment.map((comment, index) => (
            <div
              className="flex flex-col space-y-2 w-full bg-slate-400/20 p-5 rounded-xl"
              key={index}
            >
              <p>Comment : {comment.comment}</p>
              <p>Rating : {comment.rating}</p>
            </div>
          ))}
          <div className="flex flex-row w-full">
            <div className="w-1/2 flex flex-col space-y-2">
              <Textarea
                placeholder="Comment..."
                className="resize-none w-full"
                onChange={(e) =>
                  setTextComment((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
              />
              <div className="flex flex-row space-x-2 items-center justify-center">
                <div className="flex flex-col space-y-2 w-1/2">
                  <p>Rating</p>
                  <Input
                    value={textComment.rating}
                    className="w-[200px]"
                    type="number"
                    onChange={(e) => handleFormatRating(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <Button onClick={handleAddComment}>Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CarCommentComponent;
