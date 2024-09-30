"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ConfirmPhoneCodeSchema, registerSchema } from "@/lib/validation";

const Register = ({
  open,
  isOpen,
}: {
  isOpen: boolean;
  open: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState({ phoneNumber: "", password: "" });
  return (
    <Dialog open={isOpen} onOpenChange={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => open(true)}
          className="py-1 px-2 text-base font-medium text-primary md:block hidden border-[2px] rounded-md border-primary bg-white hover:bg-white"
        >
          Ro'yxatdan o'tish
        </Button>
      </DialogTrigger>
      <DialogOverlay className="bg-black/10">
        <DialogContent
          aria-describedby={undefined}
          className="max-w-[450px] w-full p-12 !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center"
        >
          {step === 1 ? (
            <Step1 setSaved={setSaved} setStep={setStep} />
          ) : (
            <Step2 saved={saved} />
          )}
          <DialogFooter>
            <div className="mb-4 text-sm text-mainindigo/80 flex flex-col text-left px-[110px]">
              <p>
                I have already an account
                <span
                  className="cursor-pointer underline text-mainindigo hover:no-underline ml-3"
                  // onClick={onToggle}
                >
                  Login
                </span>
              </p>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Register;

const Step1 = ({
  setSaved,
  setStep,
}: {
  setSaved: React.Dispatch<
    React.SetStateAction<{ phoneNumber: string; password: string }>
  >;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "+998",
      password: "",
    },
  });
  const onSubmit = () => {};
  return (
    <Form {...form} key={"step1"}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-4"
      >
        <DialogTitle className=" font-medium text-3xl text-primary-500 text-center">
          Akkaunt yaratish
        </DialogTitle>
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-base font-medium ">F.I.SH</FormLabel>
              <FormControl className="w-full">
                <Input
                  type="text"
                  placeholder="Full Name"
                  {...field}
                  className="border-[2px] border-primary-500 focus-visible:border-primary-500/70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-base font-medium ">
                Telefon raqam
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+998912345678"
                  className="border-[2px] border-primary-500 focus-visible:border-primary-500/70"
                  {...field}
                  maxLength={13}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-base font-medium ">Parol</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  className="border-[2px] border-primary-500 focus-visible:border-primary-500/70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-base font-medium ">
                Parolni takrorlang
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                  className="border-[2px] border-primary-500 focus-visible:border-primary-500/70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <CustomButton
          type="submit"
          disabled={isSubmitting}
          label={"Verify Phone Number"}
          mainable
          classNames="py-[12px] px-[100px] rounded-2xl text-xl font-medium leading-[100%]"
        /> */}
      </form>
    </Form>
  );
};

const Step2 = ({
  saved,
}: {
  saved: { phoneNumber: string; password: string };
}) => {
  const form = useForm<z.infer<typeof ConfirmPhoneCodeSchema>>({
    resolver: zodResolver(ConfirmPhoneCodeSchema),
    defaultValues: {
      smsCode: "",
    },
  });
  const onSubmit = () => {};
  return (
    <Form {...form} key={"step2"}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-[48px] pt-[48px] pb-[15px] flex flex-col justify-center items-center gap-[30px] w-[504px]"
      >
        <h1 className="px-0 py-0.5 leading-[100%] font-medium text-3xl text-mainindigo">
          Confirm Phone Number
        </h1>
        <p className="text-sm text-mainindigo/80">
          We have sent you an SMS with a code to your phone number. Please enter
          the code in the field below.
        </p>
        <FormField
          name="smsCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Code"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <CustomButton
      type="submit"
      disabled={isSubmitting}
      label={"Verify Phone Number"}
      mainable
      classNames="py-[12px] px-[100px] rounded-2xl text-xl font-medium leading-[100%]"
    /> */}
      </form>
    </Form>
  );
};
