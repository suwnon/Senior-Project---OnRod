import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { fetchJs, fetchJson } from "@/lib/fetchAxios";
import useUserSession from "@/lib/getUser";
import { useNavigate } from "@tanstack/react-router";
import { ToastContainer, toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

const data = [
  {
    name: "Buyer",
  },
  {
    name: "Seller",
  },
  {
    name: "Expert",
  },
];
const SelectRoleComponents = () => {
  const [role, setRole] = useState<"buyer" | "seller" | "expert">("buyer");
  const navigator = useNavigate({ from: "/role" });
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<{
    link: string;
    photo_certificate: string;
  }>({
    link: "",
    photo_certificate: "",
  });
  const user = useUserSession();
  const handleData = async () => {
    if (user) {
      if (role === "expert" && modal === false) {
        setModal(true);
        return;
      }
      const resUpdateLink = await fetchJs(`/user/${user.Id}`, "PUT", form);

      if (!resUpdateLink.success) {
        toast.error(resUpdateLink.message);
      }

      const res = await fetchJs("/updateRole", "PUT", {
        role,
        id: user.Id,
      });
      if (res.success) {
        sessionStorage.setItem("user", JSON.stringify({ ...user, role: role }));
        navigator({ to: `/${role === "buyer" ? "" : role}` });
      }
    }
  };

  const handleUploadImage = async (item: HTMLInputElement) => {
    if (item.files === null) return;

    const formData = new FormData();

    formData.append(`image_car`, item.files[0]);

    try {
      const response = await fetchJson("/uploadfile", "POST", formData);
      if (response.success) {
        setForm((prev) => ({
          ...prev,
          photo_certificate: item.files[0]?.name,
        }));
      } else {
        throw new Error(`Failed to upload images: ${response.message}`);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <>
      <Card className="w-full justify-center items-center flex flex-col space-y-2 border-0 shadow-[0px]">
        <CardHeader>
          <CardTitle>Welcome, Select your role?</CardTitle>
        </CardHeader>
        <CardContent className="max-w-[400px] w-full">
          <div className="flex flex-col space-y-8">
            {data.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                className={`  rounded-full ${
                  role === _.name.toLocaleLowerCase()
                    ? "bg-[#D1FAE5] text-[#047857]"
                    : ""
                }`}
                onClick={() =>
                  setRole(_.name.toLowerCase() as "buyer" | "seller" | "expert")
                }
              >
                {_.name}
              </Button>
            ))}
            <Button
              variant="outline"
              className="rounded-full bg-[#D1FAE5] text-[#047857]"
              onClick={handleData}
            >
              Go to use website!
            </Button>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={modal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Expert</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-4 items-center justify-center">
                  <span className="flex flex-row items-center justify-center">
                    Link
                  </span>
                  <Input onChange={(e)=>{
                    return setForm({link:e.target.value,photo_certificate:form.photo_certificate})
                  }} />
                </div>
                <div className="w-full h-[244px] border  rounded-lg relative ">
                  {form.photo_certificate ? (
                    <img
                      src={`http://localhost:3000/image/${form.photo_certificate}`}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="w-full h-full absolute  flex justify-center items-center">
                        Upload certificated
                      </div>
                      <Input
                        type="file"
                        className="file:hidden w-full h-full opacity-0 z-10 cursor-pointer absolute "
                        onChange={(e) => handleUploadImage(e.target)}
                      />
                    </>
                  )}
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                handleData();
                setModal(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ToastContainer />
    </>
  );
};
export default SelectRoleComponents;
