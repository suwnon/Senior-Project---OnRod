import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { fetchJs } from "@/lib/fetchAxios";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/context/authOption";
interface Approve {
  Id: number;
  customer_id: number;
  expertise_id: number;
  appointment_date: Date;
  appointment_status: string;
  location: string;
  preferred_time: string;
  name_customer: string;
  phone_customer: string;
  car_id: number;
  car_name: string;
}
const ViewAppoveCustomer = () => {
  const [data, setData] = useState([] as Approve[]);
  const { user } = useAuth();
  useEffect(() => {
    const getAppov = async () => {
      const res = await fetchJs<Approve[]>("/appov", "GET");
      if (res.success) {
        const filter = res.data.filter((_) => _.customer_id === user?.Id);
        setData(filter);
      }
    };
    getAppov();
  }, [user?.Id]);

  function formatDate(dateString) {
    if (!dateString) return ""; // Handle cases where dateString is null or undefined

    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust the parameters of this method to customize the format
  }

  //   const handleUpdateStatus = async (
  //     id: number,
  //     status: string,
  //     car_id: number
  //   ) => {
  //     const res = await fetchJs(`/appov/${id}/${car_id}`, "PUT", {
  //       status: status,
  //     });
  //     if (res.success) {
  //       console.log(res);
  //       const index = data.findIndex((_) => _.Id === id);
  //       data[index].appointment_status = status;
  //       setData([...data]);
  //     }
  //   };
  return (
    <>
      <div className=" container mx-auto">
        <div className="flex flex-col space-y-2">
          <p className="text-[40px]  text-[#1B1C57] font-bold w-fit">
            Order to check the car
          </p>
          <div className="w-full flex flex-row gap-2">
            <div className="w-1/2 flex flex-col gap-4">
              {data.map((_, index) => (
                <div
                  className="flex flex-col space-y-2 border rounded-xl p-5 bg-white"
                  key={index}
                >
                  <div className="flex flex-row  items-center ">
                    <div className="w-1/2">
                      <p>Car : {_?.car_name}</p>
                    </div>
                    <div className="w-1/2 justify-center flex">
                      status : {_?.appointment_status}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <Input value={_?.location} disabled />
                  </div>
                  <div className="w-1/2">
                    <Input value={formatDate(_?.appointment_date)} disabled />
                  </div>
                  <Link
                    to={"/expert/$postId"}
                    params={{ postId: _.car_id.toString() }}
                  >
                    <Button className="bg-[#D1FAE5] text-[#047857] rounded-full">
                      Details
                    </Button>
                  </Link>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </>
  );
};
export default ViewAppoveCustomer;
