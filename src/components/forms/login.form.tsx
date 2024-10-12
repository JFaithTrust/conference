import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PhoneInput } from "@/components/custom/phone-input";
import $axios from "@/http/axios";
import useLoginModal from "@/hook/useLoginModal";
import { toast } from "sonner";
import { setCookie } from "@/lib/actions/auth.action";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const loginModal = useLoginModal();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const { data } = await $axios.post("/auth/login", values);
      const encodedData = data.token?.split(".")[1];
      const { role } = JSON.parse(atob(encodedData || ""));
      await setCookie(data.token, role);
      loginModal.onClose();
      window.location.reload();
    } catch (error) {
      toast.error("Telefon raqam yoki parol noto'g'ri");
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-4"
      >
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-base font-medium">
                Telefon raqam
              </FormLabel>
              <FormControl>
                <PhoneInput
                  type="tel"
                  placeholder="+998912345678"
                  className="rounded-md font-normal md:font-medium text-base border-[2px] border-primary-500 focus-visible:border-primary-500/70"
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
                  className="border-[2px] font-normal md:font-medium text-base border-primary-500 focus-visible:border-primary-500/70"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="py-[12px] w-full rounded-lg text-lg ont-normal md:font-medium leading-[100%] text-white bg-primary"
        >
          Tasdiqlash
        </button>
      </form>
    </Form>
  );
};

export default LoginForm;
