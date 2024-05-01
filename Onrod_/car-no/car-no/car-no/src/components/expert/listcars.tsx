import { useCarFilterStore } from "@/context/carStore";
import { fetchJs } from "@/lib/fetchAxios";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
interface UserInfo {
  Id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  link: string;
  role: string;
  photo_certificate: string;
}
const CarListComponent = () => {
  const [data, setData] = useState<CarInfo[]>([]);
  const car = useCarFilterStore((state) => state.data);
  const getUserById = async (id: string) => {
    try {
      const res = await fetchJs<UserInfo>(`/user/${id}`, "POST");
      if (res.success) {
        return res.data.fullName;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetchJs<CarInfo[]>("/getCar", "POST", car);
        if (res.success) {
          for (const s of res.data) {
            s.user_name = (await getUserById(s.user_id + "")) ?? "";
          }
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
      <div className="flex items-center flex-col justify-center">
        <p className="text-[40px]  text-[#1B1C57] font-bold w-[360px]">
          Cars List
        </p>
        <div className="grid grid-cols-4 gap-4">
          {data.map((item, index) => (
            <Link
              to="/expert/comment/$postId"
              params={{ postId: item.Id + "" }}
              key={index}
              className="p-5 border rounded-xl flex flex-col  space-y-2 h-[441px] items-center justify-center shadow-md"
            >
              <p className="text-left w-full">{item.user_name}</p>
              <div className="w-[343px] h-[214px] relative">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={`http://localhost:3000/image/${
                    item.image_name.split(",")[0]
                  }`}
                />
              </div>
              <div className="h-1/2 flex items-start justify-center flex-col">
                <p>Car brand : {item.car_brand}</p>
                <p>Body Type : {item.type_of_car}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
export default CarListComponent;
