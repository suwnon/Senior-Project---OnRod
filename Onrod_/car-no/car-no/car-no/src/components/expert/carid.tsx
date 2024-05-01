import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "@/components/ui/time-picker";
import { AuthContext } from "@/context/authOption";
import { fetchJs } from "@/lib/fetchAxios";
import { cn } from "@/lib/utils";
import { expertCarId } from "@/pages/expert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useRouter } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
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
const ExpertSelectCarId = () => {
  const [open, setOpen] = React.useState(false);
  const appove = useForm();
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
  const [isCheckStatus, setIsCheckStatus] = useState(true);

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
  const handleGetApprove = async () => {
    try {
      const res = await fetchJs<{
        Id: number;
        customer_id: number;
        expertise_id: number;
        appointment_date: Date;
        appointment_status: string;
        location: string;
        preferred_time: string;
        name_customer: string;
        phone_customer: string;
        [key: string]: string | number | Date | undefined;
      }>("/appov/" + postId, "GET");
      if (res.success) {
        setOpen(true);
        for (const keys in res.data) {
          if (keys !== "preferred_time") {
            appove.setValue(keys, res.data[keys]);
          } else {
            const [hour, minute] = res.data[keys].split(":").map(Number);
            const preferredTime = { hour, minute };
            appove.setValue(keys, preferredTime);
          }
        }

        console.log(appove.getValues());

        setIsCheckStatus(res.data.appointment_status === "pending");
      }
    } catch (e) {
      console.log(e);
    }
  };
  function handleDecimalsOnValue(value: string) {
    const regex = /([0-9]*[.|,]{0,1}[0-9]{0,2})/s;
    if (/\d+/g.test(value)) {
      if (Number(value) <= 5) {
        return value.match(regex)?.[0] ?? "";
      }
    }
  }

  const onSubmit = async (data) => {
    console.log(data);

    const resAppov = await fetchJs(`/approve/${data.Id}/${postId}`, "PUT", {
      appointment_date: data.appointment_date,
      preferred_time: data.preferred_time,
      location: data.location,
    });
    if (resAppov.success) {
      router.navigate({ to: "/expert" });
    }
  };

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
      console.log(result);
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
                        control={Form.control}
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
                      <Button
                        type="button"
                        className="text-[#047857] col-start-1 col-end-3 bg-[#D1FAE5]"
                        onClick={() => handleGetApprove()}
                      >
                        Schedule viewing
                      </Button>
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
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center font-bold">
              Schedule viewing
            </DialogTitle>
            <DialogDescription className="space-y-2">
              <p className="font-semibold text-black text-[14px]">
                Select Your Preferred Date and Time
              </p>
              <Form {...appove}>
                <form
                  onSubmit={appove.handleSubmit(onSubmit)}
                  className=" flex flex-col space-y-2"
                >
                  <FormField
                    control={appove.control}
                    name="appointment_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-2 w-full">
                        <FormLabel>Preferred Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white border rounded-xl z-50"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="preferred_time"
                    control={appove.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <TimePicker {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="location"
                    control={appove.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Input {...field} placeholder="Type location" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="font-semibold text-black text-[14px]">
                    Fill In Your Contact Details
                  </p>
                  <FormField
                    name="name_customer"
                    disabled
                    control={appove.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <Input {...field} placeholder="E.g. Dannie Somjai" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled
                    name="phone_customer"
                    control={appove.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="E.g. XXX-XXX-XXXX" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <>
                    <Button
                      className="bg-[#D1FAE5] text-[#047857] rounded-full"
                      type="submit"
                    >
                      Confrim
                    </Button>
                    <Button className="bg-[#FAD1D1] text-[#780404] rounded-full">
                      Cancel
                    </Button>
                  </>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ExpertSelectCarId;
