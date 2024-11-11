import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import CustomFormField, {FormFieldType} from "@/components/custom/form-field";
import {
    Form,
} from "@/components/ui/form";
import useLoginModal from "@/hook/useLoginModal";
import {login} from "@/lib/actions/auth.action";
import {loginSchema} from "@/lib/validation";
import {toast} from "sonner";

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
        const res = await login(values);
        if (res === "ok"){
            toast.success("Tizimga kirdingiz");
            loginModal.onClose();
        }else{
            toast.error("Telefon raqam yoki parol noto'g'ri");
        }
        // try {
        //     const { data } = await $axios({
        //         endpoint: "/auth/login",
        //         options: {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: values,
        //         },
        //     });
        //
        //     window.location.reload();
        // } catch (error) {
        //     toast.error("Telefon raqam yoki parol noto'g'ri");
        //     console.log(error);
        // }
    }
    
    const { isSubmitting } = form.formState;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 md:space-y-4"
            >
                <CustomFormField
                    name="phoneNumber"
                    label={"Telefon raqami"}
                    control={form.control}
                    fieldType={FormFieldType.PHONE_INPUT}
                />
                {/* <FormField */}
                {/*  name="phoneNumber" */}
                {/*  control={form.control} */}
                {/*  render={({ field }) => ( */}
                {/*    <FormItem className="space-y-1"> */}
                {/*      <FormLabel className="text-base font-medium"> */}
                {/*        Telefon raqam */}
                {/*      </FormLabel> */}
                {/*      <FormControl> */}
                {/*        <PhoneInput */}
                {/*          type="tel" */}
                {/*          defaultCountry={"UZ"} */}
                {/*          international */}
                {/*          placeholder="+998912345678" */}
                {/*          className="rounded-md font-normal md:font-medium text-base border-[2px] border-primary-500 focus-visible:border-primary-500/70" */}
                {/*          {...field} */}
                {/*        /> */}
                {/*      </FormControl> */}
                {/*      <FormMessage className="text-red-600" /> */}
                {/*    </FormItem> */}
                {/*  )} */}
                {/* /> */}
                <CustomFormField
                    name="password"
                    label={"Parol"}
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    type={"password"}
                    placeholder={"********"}
                />
                {/* <FormField */}
                {/*    name="password" */}
                {/*    control={form.control} */}
                {/*    render={({field}) => ( */}
                {/*        <FormItem className="space-y-1"> */}
                {/*            <FormLabel className="text-base font-medium">Parol</FormLabel> */}
                {/*            <FormControl> */}
                {/*                <Input */}
                {/*                    type="password" */}
                {/*                    placeholder="Password" */}
                {/*                    {...field} */}
                {/*                    className="border-[2px] font-normal md:font-medium text-base border-primary-500 focus-visible:border-primary-500/70" */}
                {/*                /> */}
                {/*            </FormControl> */}
                {/*            <FormMessage className="text-red-600"/> */}
                {/*        </FormItem> */}
                {/*    )} */}
                {/* /> */}
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full rounded-lg bg-primary py-3 text-lg font-normal leading-[100%] text-white disabled:cursor-not-allowed disabled:bg-primary/50 md:font-medium"
                >
                    Tasdiqlash
                </button>
            </form>
        </Form>
    );
};

export default LoginForm;
