import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { fetchJs } from "@/lib/fetchAxios";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type user = {
  Id: number;
  username: string;
  email: string;
  phone: string;
  role: "buyer" | "seller" | "expert" | null;
  token: string;
};
import { useAuth } from "@/context/authOption";
const SiginComponents = () => {
  const navigate = useNavigate({ from: "/sigin" });
  const { login } = useAuth();
  const route = useRouter();
  const form = useForm<{
    email: string;
    password: string;
  }>();
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await fetchJs<user>("/login", "POST", data);
      if (res.success) {
        const { data: userData }: { data: user } = res;
        sessionStorage.setItem("user", JSON.stringify(userData));
        login(userData);
        const { role } = userData;
        if (role !== null) {
          route.navigate({
            to: `/${role === "buyer" ? "" : role}`,
            replace: true,
          });
        } else {
          navigate({ to: "/role", replace: true });
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" flex items-center justify-center">
        <Card className="w-full justify-center items-center flex flex-col space-y-2 border-0 shadow-[0px] bg-transparent">
          <CardHeader>
            <CardTitle>Log in</CardTitle>
          </CardHeader>
          <CardContent className="max-w-[400px] w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Log in</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
};
export default SiginComponents;
