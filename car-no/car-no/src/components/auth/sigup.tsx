import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchJs } from "@/lib/fetchAxios";
import { useNavigate } from "@tanstack/react-router";
const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    fullname: z.string().min(2, {
      message: "Fullname must be at least 2 characters.",
    }),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 characters.",
      })
      .regex(/^\d+$/, {
        message: "Please enter a valid phone number.",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
const SignupComponents = () => {
  const navigate = useNavigate({ from: "/signup" });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetchJs("/register", "POST", values);
      if (res.success) {
        navigate({ to: "/sigin", replace: true });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className=" flex items-center justify-center">
        <Card className="w-full justify-center items-center flex flex-col space-y-2 border-0 shadow-[0px] bg-transparent">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
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
                        <Input placeholder="Email" {...field} />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telephone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Telephone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Sign up</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default SignupComponents;
