import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
const FinancingComponent = () => {
  const form = useForm();
  return (
    <>
      <div className="flex flex-col space-y-2 w-full">
        <span className="text-center w-full  font-bold text-[32px]">Financing</span>
        <div className="flex lg:flex-row flex-col gap-2">
          <div className="lg:w-1/2 w-full">
            <Card>
              <CardContent className="p-5 ">
                <Form {...form}>
                  <form
                    // onSubmit={form.handleSubmit(onSubmit)}
                    className=" grid grid-cols-2 gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="car_price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car Price</FormLabel>
                          <Input {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vat(7%)</FormLabel>
                          <Input {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="final_price_vat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Final Price With VAT (7%)</FormLabel>
                          <Input {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number</FormLabel>
                          <Input {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="down_payment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>DownPayment</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="down_payment_percent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>&nbsp;</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="loan_amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loan Amount</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="loan_amount_percent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>&nbsp;</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="loan_amount_percent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interest Rate</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="loan_tenure"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loan Tenure</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="text-[#047857] col-start-1 col-end-3 bg-[#D1FAE5]"
                    >
                      Calculate
                    </Button>
                  </form>
                </Form>
              </CardContent>
         
            </Card>
          </div>
          <div className="lg:w-1/2 w-full ">
            <div className="flex  flex-col items-center min-h-[520px] justify-center bg-[#D9D9D9] w-full h-full rounded-xl">
              <p>Monthly Instalment Amount</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FinancingComponent;
