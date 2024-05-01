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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TimePicker } from "@/components/ui/time-picker";
import { Calendar } from "@/components/ui/calendar";
import FeedbackComponent from "../content/feedback";
import { carIdRoute } from "@/pages/car";
import { fetchJs } from "@/lib/fetchAxios";
import { TimeValue } from "react-aria";
import * as dayjs from "dayjs";
import { useAuth } from "@/context/authOption";
import { useApprove } from "@/context/carStore";
import { useRouter } from "@tanstack/react-router";
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
const SelectCaruById = () => {
  const form = useForm();
  const setApprove = useApprove((state) => state.setApprove);
  const router = useRouter();
  const appoval = useForm<{
    appointment_date: Date;
    preferred_time: TimeValue;
    location: string;
    phone_customer: string;
    name_customer: string;
    customer_id: string;
    expertise_id: string;
  }>();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState<CarInfo>();
  const { carId } = carIdRoute.useParams();
  const { user } = useAuth();
  useEffect(() => {
    const getCar = async () => {
      try {
        const res = await fetchJs<CarInfo>(`/car/${carId}`, "GET");
        if (res.success) {
          const { data } = res;
          for (const key in data) {
            if (!data[key] && data[key] !== 0) data[key] = "";
            form.setValue(key, data[key]);
          }
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCar();
  }, [carId, form]);

  const onSubmit = async (values: {
    appointment_date: Date;
    preferred_time: TimeValue;
    location: string;
    phone_customer: string;
    name_customer: string;
    customer_id: string;
  }) => {
    const { hour, minute } = values.preferred_time;
    const date = dayjs(values.appointment_date).format("YYYY-MM-DD");
    const time = `${hour}:${minute}`;
    setApprove({
      ...values,
      customer_id: user?.Id?.toString() ?? "1",
      appointment_date: date,
      preferred_time: time,
      expertise_id: carId,
      car_id: carId,
    });
    router.navigate({ to: "/car/$carId/expert", params: { carId } });
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
                  <Form {...form}>
                    <form
                      // onSubmit={form.handleSubmit(onSubmit)}
                      className=" grid grid-cols-2 gap-4"
                    >
                      <FormField
                        disabled
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
                        name="contact_phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <Input type="number" min={0} {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {!!user && (
                        <Button
                          type="button"
                          className="text-[#047857] col-start-1 col-end-3 bg-[#D1FAE5]"
                          onClick={() => setOpen(true)}
                        >
                          Schedule viewing
                        </Button>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            <div className="lg:w-1/2 w-full flex flex-col space-y-2  items-center px-5 md:px-0">
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
          {/* <FinancingComponent /> */}
          {/* <SelectourExpertComponent /> */}
          <FeedbackComponent
            image={data?.image_name ?? ""}
            carId={data?.Id ?? 0}
          />
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
              <Form {...appoval}>
                <form
                  onSubmit={appoval.handleSubmit(onSubmit)}
                  className=" flex flex-col space-y-2"
                >
                  <FormField
                    control={appoval.control}
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
                            className="w-auto p-0 bg-white border rounded-xl"
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
                    control={appoval.control}
                    name="preferred_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <TimePicker {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={appoval.control}
                    name="location"
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
                    control={appoval.control}
                    name="name_customer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <Input {...field} placeholder="E.g. Dannie Somjai" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={appoval.control}
                    name="phone_customer"
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
                  <Button
                    type="submit"
                    className="text-[#047857] col-start-1 col-end-3 bg-[#D1FAE5]"
                    onClick={() => setOpen(true)}
                  >
                    Schedule viewing
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SelectCaruById;
