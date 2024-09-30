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
import $axios from "@/http/axios";
import { toast } from "sonner";
import { loginSchema } from "@/lib/validation";
import clsx from "clsx";
import useLoginModal from "@/hook/useLoginModal";
import Register from "./register";
export const Login = ({ situation }: { situation: "text" | "button" }) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });
  const { isOpen, onClose } = useLoginModal();
  const onSubmit = () => {};
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <button
          className={clsx(
            situation === "button" &&
              "py-1 px-2  md:block  border-[2px] rounded-md border-primary bg-primary text-white",
            situation === "text" &&
              "text-base  underline font-medium text-primary"
          )}
        >
          Login
        </button>
      </DialogTrigger>
      <DialogOverlay className="bg-black/10">
        <DialogContent
          aria-describedby={undefined}
          className="max-w-[450px] w-full p-12 !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center"
        >
          <DialogTitle className=" font-medium text-3xl text-primary-500 text-center">
            Login
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <FormLabel className="text-base font-medium ">
                      Parol
                    </FormLabel>
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
              <button
                type="submit"
                className="py-[12px] w-full rounded-lg text-lg font-medium leading-[100%] text-white bg-primary"
              >
                Tasdiqlash
              </button>
            </form>
          </Form>

          <DialogFooter>
            <div className="mb-4 text-sm text-primary/70 flex gap-2 justify-center items-center w-full">
              <p>
                Menda akkaunt mavjud emas
                <span
                  className="cursor-pointer underline text-primary hover:no-underline ml-3"
                  // onClick={onToggle}
                >
                  Registratsiya
                </span>
              </p>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
