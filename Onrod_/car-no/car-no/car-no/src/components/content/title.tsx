import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useRouter } from "@tanstack/react-router";
import { useCarFilterStore } from "@/context/carStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
const TitleComponets = () => {
  const setCars = useCarFilterStore((state) => state.setCars);
  const router = useRouter();
  const form = useForm<{
    car_brand: string;
    year_of_car: string;
    distance: string;
    color: string;
    type_of_tranmission: string;
    fuel: string;
    type_of_car: string;
    car_area: string;
    car_name: string;
    car_price: number;
  }>();
  const onSubmit = async (data: {
    car_brand: string;
    year_of_car: string;
    distance: string;
    color: string;
    type_of_tranmission: string;
    fuel: string;
    type_of_car: string;
    car_area: string;
    car_name: string;
    car_price: number;
  }) => {
    setCars(data);
    router.navigate({ to: `/buyer` });
  };

  const USDollar = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  });

  return (
    <>
      <div className="flex flex-row h-[720px] relative">
        <div className="w-[741px] h-[523px] -left-[173px] -top-[162px] absolute">
          <div className="w-[438px] h-[494px] left-[494px] top-[85px] absolute rotate-90 origin-[0_0] opacity-[0.30] bg-[#82F7FF] [box-shadow:120px_120px_120px] filter blur-[120px]" />
          <div className="w-[438px] h-[494px] left-[741px] top-0 absolute rotate-90 origin-[0_0] opacity-[0.30] bg-[#82FFD2] [box-shadow:120px_120px_120px] filter blur-[120px]" />
        </div>
        <div className="container mx-auto relative flex ">
          <div className="flex flex-row w-full">
            <div className="flex flex-col space-y-2 justify-center w-full md:w-1/2">
              <span
                className="not-italic font-extrabold
              capitalize text-[2.5rem] text-[#1B1C57]"
              >
                Find The Car
              </span>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="text-[#626687] text-[1rem] font-medium gap-4 grid grid-cols-2 mr-2"
                >
                  <FormField
                    control={form.control}
                    name="car_brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Car brand</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Car brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Toyota">Toyota</SelectItem>
                              <SelectItem value="Isuzu">Isuzu</SelectItem>
                              <SelectItem value="Honda">Honda</SelectItem>
                              <SelectItem value="Ford">Ford</SelectItem>
                              <SelectItem value="Mitsubishi">
                                Mitsubishi
                              </SelectItem>
                              <SelectItem value="BYD">BYD</SelectItem>
                              <SelectItem value="MG">MG</SelectItem>
                              <SelectItem value="Mazda">Mazda</SelectItem>
                              <SelectItem value="Nissan">Nissan</SelectItem>
                              <SelectItem value="Neta">Neta</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="car_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Slider
                            defaultValue={[0]}
                            max={5000000}
                            step={1}
                            onValueChange={(value: number[]) =>
                              field.onChange(value[0] || 0)
                            }
                          />
                        </FormControl>
                        {USDollar.format(form.watch("car_price") || 0)}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="car_area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Car area</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Car area"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="car_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Model Name"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year_of_car"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of car</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Year of car" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from(
                                { length: new Date().getFullYear() - 1990 + 1 },
                                (_, i) => i + 1990
                              ).map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mile</FormLabel>
                        <FormControl>
                          <Slider
                            defaultValue={[0]}
                            max={500000}
                            step={1}
                            onValueChange={(value: number[]) =>
                              field.onChange(value[0] || 0)
                            }
                          />
                        </FormControl>
                        {parseFloat(form.watch("distance") || 0).toLocaleString()} km
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="brown">Brown</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="gray">Gray</SelectItem>
                            <SelectItem value="orange">Orange</SelectItem>
                            <SelectItem value="purple">Purple</SelectItem>
                            <SelectItem value="pink">Pink</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="silver">Silver</SelectItem>
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="yellow">Yellow</SelectItem>
                            <SelectItem value="Maroon">Maroon</SelectItem>
                            <SelectItem value="Bronze">Bronze</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type_of_tranmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of transmission</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Type of transmission" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Automatic">
                                Automatic
                              </SelectItem>
                              <SelectItem value="Manual">Manual</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fuel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel/Electric</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Fuel" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Diesel">Diesel</SelectItem>
                              <SelectItem value="Gasohol">Gasohol</SelectItem>
                              <SelectItem value="Electric">Electric</SelectItem>
                              <SelectItem value="Plug-in Hybrid">
                                Plug-in Hybrid
                              </SelectItem>
                              <SelectItem value="Petrol">Petrol</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type_of_car"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Body Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Sedan">Sedan</SelectItem>
                              <SelectItem value="Coupe">Coupe</SelectItem>
                              <SelectItem value="Sport Car">
                                Sport Car
                              </SelectItem>
                              <SelectItem value="Hatchback">
                                Hatchback
                              </SelectItem>
                              <SelectItem value="Convertible">
                                Convertible
                              </SelectItem>
                              <SelectItem value="SUV">SUV</SelectItem>
                              <SelectItem value="Minivan">Minivan</SelectItem>
                              <SelectItem value="Pickup truck">
                                Pickup truck
                              </SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center items-center">
                    <Button type="submit">Search</Button>
                  </div>
                </form>
              </Form>
            </div>
            <div className="relative md:w-1/2 md:flex hidden   ">
              <div className="absolute w-[1481px]  overflow-hidden h-full">
                <img
                  src="/img/d2c58e77ee78130c5685c9ae3f889ebb.jpg"
                  className="  w-full h-full  object-cover rounded-bl-[80px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TitleComponets;
