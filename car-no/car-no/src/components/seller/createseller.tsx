import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileImage } from "lucide-react";
import { fetchJs, fetchJson } from "@/lib/fetchAxios";
import { useAuth } from "@/context/authOption";
import { ToastContainer, toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Car {
  user_id: number;
  car_price: number;
  car_brand: string;
  car_area: string;
  year_of_car: string;
  distance: string;
  color: string;
  type_of_tranmission: string;
  fuel: string;
  type_of_car: string;
  car_description: string;
  image_name: string[];
  reason: string;
  user_name: string;
  selling_status: string;
  setThePrice: number;
  contact_phone: string;
  car_name: string;
}
const CreateCarSeller = () => {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const [imageFile, setImageFile] = React.useState<
    {
      file: File | null;
      idx: number;
    }[]
  >(Array.from({ length: 2 }).map((_, index) => ({ file: null, idx: index })));
  const form = useForm<Car>();
  async function onSubmit(values: Car) {
    values.user_id = user?.Id ?? 0;
    values.image_name = imageFile.map((item) => item.file?.name ?? "");
    if (Number(values.car_price) === 0 || values.car_price === undefined) {
      setOpen(true);
      if (open) {
        const res = await fetchJs("/car", "POST", values);
        if (res.success) {
          setOpen(false);
          await handleUploadImage();
          resetForm();
        }
      }
      return;
    } else {
      const res = await fetchJs("/car", "POST", values);
      if (res.success) {
        setOpen(false);
        await handleUploadImage();
        resetForm();
      }
    }
  }
  const resetForm = () =>
    form.reset({
      car_area: "",
      car_brand: "",
      car_price: 0,
      contact_phone: "",
      distance: "",
      setThePrice: 0,
      type_of_car: "",
      user_id: 0,
      user_name: "",
      reason: "",
      car_description: "",
      year_of_car: "",
      color: "",
      type_of_tranmission: "",
      fuel: "",
    });
  const handleUploadImage = async () => {
    const formData = new FormData();
    const hasFiles = imageFile.some((item) => Boolean(item.file));

    if (!hasFiles) {
      toast.error("Please select at least one image to upload.");
      throw new Error("No files to upload.");
    }

    imageFile.forEach((item) => {
      if (item.file) {
        formData.append(`image_car`, item.file);
      }
    });
    try {
      const response = await fetchJson("/uploadfile", "POST", formData);
      if (response.success) {
        setImageFile(
          Array.from({ length: 2 }).map((_, index) => ({
            file: null,
            idx: index,
          }))
        );
      } else {
        throw new Error(`Failed to upload images: ${response.message}`);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    if (e.target.files) {
      imageFile[index].file = e.target.files[0];
      imageFile[index].idx = index;
      setImageFile([...imageFile]);
    }
  }
  return (
    <>
      <div className=" container mx-auto">
        <div className="flex flex-col space-y-2">
          <p className="text-md md:text-[40px]  text-[#1B1C57] font-bold w-[360px]">
            Sell Your Car At the Right Price
          </p>
          <div className="w-full flex md:flex-row flex-col gap-2">
            <div className="w-full md:w-1/2">
              <Card>
                <CardContent className="p-5">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className=" grid grid-cols-2 gap-4"
                      onError={() => {
                        console.log("12312");
                      }}
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
                            <FormLabel>Set The Price </FormLabel>
                            <FormControl>
                              <Input placeholder="Type Car Price" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="car_area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Car Viewing Point</FormLabel>
                            <FormControl>
                              <Input placeholder="Type Car Area" {...field} />
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
                              <Input placeholder="Type Model Name" {...field} />
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
                                    {
                                      length:
                                        new Date().getFullYear() - 1990 + 1,
                                    },
                                    (_, i) => i + 1990
                                  ).map((year) => (
                                    <SelectItem
                                      key={year}
                                      value={year.toString()}
                                    >
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
                              <Input placeholder="Mile" {...field} />
                            </FormControl>

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
                            <FormLabel>Type of tranmission</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Type of tranmission" />
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
                                  <SelectItem value="Gasohol">
                                    Gasohol
                                  </SelectItem>
                                  <SelectItem value="Electric">
                                    Electric
                                  </SelectItem>
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
                                  <SelectItem value="Minivan">
                                    Minivan
                                  </SelectItem>
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
                      <FormField
                        control={form.control}
                        name="user_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Type Your Name" {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contact_phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <Input
                              placeholder="Type Your Contact Number"
                              min={0}
                              {...field}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className=" col-start-1 col-end-3">
                        Submit
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            <div className="w-full md:w-1/2">
              <Card>
                <CardContent className="p-5">
                  <div className=" grid grid-cols-2 gap-4">
                    {imageFile.map((data, index) => (
                      <div
                        className="border w-fit rounded-xl relative"
                        key={index}
                      >
                        <div className=" absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                          {data?.file ? (
                            <img
                              src={URL.createObjectURL(data?.file)}
                              alt={`Car image ${index}`}
                              className="max-h-[220px] max-w-full"
                            />
                          ) : (
                            <>
                              <FileImage />
                            </>
                          )}
                        </div>
                        <Input
                          type="file"
                          className="file:hidden h-[220px] w-full opacity-0 z-10"
                          id={`file-input-${index}`}
                          multiple
                          onChange={(e) => onFileChange(e, index)}
                        />
                      </div>
                    ))}
                    <div className="border rounded-xl relative h-[220px] max-w-[290px] w-full flex justify-center items-center">
                      <Button
                        onClick={() =>
                          setImageFile((prev) => [
                            ...prev,
                            {
                              file: null,
                              idx: prev.length,
                            },
                          ])
                        }
                      >
                        ADD
                      </Button>
                    </div>
                  </div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="rounded-xl grid grid-cols-2"
                    >
                      <FormField
                        control={form.control}
                        name="car_description"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Fill the description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Why do you set 0 bath price?</DialogTitle>
            <DialogDescription className="flex flex-col space-y-3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" grid grid-cols-1 gap-4"
                >
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Reason..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Want to sell">
                                Want to sell
                              </SelectItem>
                              <SelectItem value="The car broke down">
                                The car broke down
                              </SelectItem>
                              <SelectItem value="Charitable Donation">
                                Charitable Donation
                              </SelectItem>
                              <SelectItem value="Cannot sell the car">
                                Cannot sell the car
                              </SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className=" w-full">
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
};
export default CreateCarSeller;
