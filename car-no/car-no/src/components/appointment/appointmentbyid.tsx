import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

const AppointmentById = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="w-full flex flex-col space-y-2">
          <div className="flex flex-row text-sm items-center space-x-2">
            <div className="w-[42px] h-[42px] rounded-full border"></div>
            <div className="flex flex-col">
              <p>Robert Deejai</p>
              <p>robert.d@gmail.com</p>
            </div>
          </div>
          <div className="w-full justify-center flex">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Appointment list</CardTitle>
                <CardDescription className="flex space-y-2 flex-col">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      className="flex flex-col space-y-2 border rounded-xl p-5 bg-white"
                      key={index}
                    >
                      <div className="flex flex-row  items-center ">
                        <div className="w-1/2 flex flex-col">
                          <p>Mazda 3 sedan</p>
                          <p>Bangkapi (Bangkok)</p>
                        </div>
                        <div className="w-1/2 space-x-2 flex justify-evenly">
                          <div className="w-1/2 space-x-2">
                            <Button className="bg-[#F4FAD1] text-[#767804] rounded-full">
                              Details
                            </Button>
                            <Button className="bg-[#D1FAE5] text-[#047857] rounded-full">
                              Confrim
                            </Button>
                            <Button className="bg-[#FAD1D1] text-[#780404] rounded-full">
                              Cancel
                            </Button>
                          </div>
                          <div className="w-1/2 flex flex-col">
                            <p>Date</p>
                            <p>Date</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
export default AppointmentById;
