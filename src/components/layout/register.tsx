"use client";
import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogFooter,
  DialogClose,
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
import $axios from "@/http/axios";
import { toast } from "sonner";
import clsx from "clsx";
import { Login } from "./login";
import useRegisterModal from "@/hook/useRegisterModal";
import useLoginModal from "@/hook/useLoginModal";
const Register = ({
  situation,
}: //
{
  situation: "text" | "button";
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // const onToggle = useCallback(() => {
  //   registerModal.onClose();
  //   loginModal.onOpen();
  //   console.log(registerModal?.isOpen);
  // }, [registerModal, loginModal]);
  const onToggle = () => {
    // loginModal.onOpen();
    console.log(registerModal?.isOpen, "------");

    registerModal.onClose();
    registerModal.onClose;

    console.log(registerModal?.isOpen, "++++++++++++++++++++");
  };
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState({ phoneNumber: "", password: "" });

  return (
    <Dialog open={registerModal?.isOpen} onOpenChange={registerModal?.onClose}>
      <DialogTrigger asChild>
        <button
          onClick={() => registerModal?.onOpen()}
          className={clsx(
            situation === "button" &&
              "py-1 px-2  md:block  border-[2px] rounded-md border-primary bg-white",
            situation === "text" && "text-base font-medium text-primary"
          )}
        >
          Ro'yxatdan o'tish
        </button>
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
            <div className="mb-4 text-sm text-primary/70 flex gap-2 justify-center items-center w-full">
              <p>Menda allaqachon akkaunt bor</p>
              <div onClick={() => onToggle()}>
                <Login situation="text" />
              </div>
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
      confirmPassword: "",
    },
  });
  const onSubmit = (values: any) => {
    `use server`;
    // $axios
    console.log(values);
    toast.success("sms code jo'natildi");
    setStep(2);
  };
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
              <FormMessage className="text-red-600" />
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
                />
              </FormControl>
              <FormMessage className="text-red-600" />
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
              <FormMessage className="text-red-600" />
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
                  value={field.value || ""}
                  className="border-[2px] border-primary-500 focus-visible:border-primary-500/70"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="py-[12px] w-full rounded-lg text-lg font-medium leading-[100%] text-white bg-primary"
        >
          Tasdiqlash
        </button>
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
  const onSubmit = (value: any) => {
    console.log(value);
    // toast.success(value);
  };
  return (
    <Form {...form} key={"step2"}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-4"
      >
        <DialogTitle className="px-0 py-0.5 leading-[100%] font-medium text-3xl text-mainindigo">
          Telefon raqamingizni tasdiqlang
        </DialogTitle>
        <DialogDescription className="text-sm text-mainindigo/80">
          Sizning telefon raqamingizga SMS yubordik. Iltimos, SMS dagi kodni
          kiriting.
        </DialogDescription>
        <FormField
          name="smsCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  // value={field.value || ""}
                  placeholder="Kod"
                  {...field}
                  className="border-[2px] border-primary-500 focus-visible:border-primary-500/70"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="py-[12px] w-full rounded-lg text-lg font-medium leading-[100%] text-white bg-primary"
        >
          Tasdiqlash
        </button>
      </form>
    </Form>
  );
};
