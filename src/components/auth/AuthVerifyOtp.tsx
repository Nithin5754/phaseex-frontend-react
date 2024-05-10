import {  useNavigate, useSearchParams } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useAppDispatch } from "@/app/store/store";
import { VerifyUserThunk, resendOTPThunk } from "@/app/thunk/userThunk";
import { useState } from "react";



const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const AuthVerifyOtp = () => {
  const [searchParams] = useSearchParams();
  const tokenId:string = searchParams.get("tokenId") as string;
  const navigate=useNavigate()
  const [isTokenId,setTokenId]=useState(tokenId)
if (!tokenId) {
  navigate('/login')
}

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, "otp-verify");
    console.log(tokenId, "tokenId-verify");

    if (!data && !tokenId) {
      throw new Error("tokenId / otp empty");
    } else {
      const otp: string = data.pin 

    let verifyData = { tokenId , otp };

      dispatch(VerifyUserThunk(verifyData)).then((res)=>{
        if (res.meta.requestStatus === "rejected") {
       
          throw new Error("error in creating");
          // toast.error(errorMessage);
        } else {
         setTokenId('')
          const url: string = '/login';
          navigate(url);
        }
      })
    }
  }


  async function sendOtp() {
    console.log(isTokenId);
    
   dispatch(resendOTPThunk(isTokenId)).unwrap()
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      <Button onClick={sendOtp}>resend Otp</Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default AuthVerifyOtp;
