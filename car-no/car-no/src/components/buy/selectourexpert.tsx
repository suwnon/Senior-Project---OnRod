import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { fetchJs } from "@/lib/fetchAxios";
import { useApprove } from "@/context/carStore";
type User = {
  Id?: number;
  username: string;
  email: string;
  phone: string;
  role: string | null;
  token: string;
  fullName: string;
  link: string;
  photo_certificate: string;
};
const SelectourExpertComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User>({} as User);
  const data = useApprove((state) => state.data);
  useEffect(() => {
    const fetchExpert = async () => {
      const res = await fetchJs<User[]>("/user/expert", "GET");
      if (res.success) {
        setUsers(res.data);
      }
    };

    fetchExpert();
  }, []);
  const handleOpen = (data: User) => {
    setOpen(true);
    setUser(data);
  };
  const handlePost = async (id: string) => {
    const res = await fetchJs("/appov", "POST", {
      ...data,
      expertise_id: id,
    });
    if (res.success) {
      setOpen(false);
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-2 w-full p-5">
        <p className="text-[#1B1C57] text-center font-semibold text-[32px]">
          Select our Expert
        </p>
        <div className=" grid grid-cols-3 gap-4">
          {users.map((_, index) => (
            <div
              className="bg-white flex flex-col space-y-2 p-5 rounded-xl shadow-md h-[130px] justify-center cursor-pointer"
              key={index}
              onClick={() => handleOpen(_)}
            >
              <div className="flex flex-row space-x-2 items-center">
                <Avatar className="  w-[24px] h-[24px]   rounded-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className=" rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-sm">{_.fullName}</p>
              </div>
              <a className="font-bold">Link to {_.link || "-"}</a>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Select Expert</DialogTitle>
            <DialogDescription className="flex justify-center">
              <div className="space-y-2 max-w-[240px] w-full flex justify-center flex-col items-start">
                <div className="flex flex-row space-x-2 items-center">
                  <Avatar className="  w-[24px] h-[24px]   rounded-full">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      className=" rounded-full"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">{user.fullName}</p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                 
                    {user.link && (
                    <a href={`http://${user.link}`} className="text-blue-500 hover:underline">
                    {user.link}
                  </a>
                  )}
                  </div>
                {!!user.photo_certificate && (  
                  <div className="bg-white border w-full h-[240px] rounded-lg">
                    <img
                      src={`http://localhost:3000/image/${user.photo_certificate}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                <Button
                  type="button"
                  className="text-[#047857] w-full bg-[#D1FAE5]"
                  onClick={() => handlePost(user?.Id?.toString() ?? "")}
                >
                  Confirm
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SelectourExpertComponent;
