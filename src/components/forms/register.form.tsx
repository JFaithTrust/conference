import {Dispatch, SetStateAction, useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {ConfirmPhoneCodeSchema, registerSchema} from "@/lib/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import $axios from "@/http/axios";
import {toast} from "sonner";
import {PhoneInput} from "@/components/custom/phone-input";
import useRegisterModal from "@/hook/useRegisterModal";
import {setCookie} from "@/lib/actions/auth.action";

const RegisterForm = () => {
    const [step, setStep] = useState(1);
    const [saved, setSaved] = useState({phoneNumber: "", password: ""});

    return (
        step === 1 ? (
            <Step1 setSaved={setSaved} setStep={setStep}/>
        ) : (
            <Step2 saved={saved}/>
        )
    )
}

export default RegisterForm

const Step1 = (
    {setSaved, setStep}
        : {
        setSaved: Dispatch<
            SetStateAction<{ phoneNumber: string; password: string }>
        >;
        setStep: Dispatch<SetStateAction<number>>;
    }) => {

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        try {
            await $axios.post("/auth/register", values);
            setSaved({
                phoneNumber: values.phoneNumber,
                password: values.password,
            });
            setStep(2);
        } catch (error) {
            toast.error("Xatolik yuz berdi");
            console.log(error);
        }
    }


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full space-y-4"
            >
                <FormField
                    name="fullName"
                    control={form.control}
                    render={({field}) => (
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
                            <FormMessage className="text-red-600"/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="phoneNumber"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="space-y-1">
                            <FormLabel className="text-base font-medium ">
                                Telefon raqam
                            </FormLabel>
                            <FormControl>
                                <PhoneInput
                                    type="tel"
                                    placeholder="+998912345678"
                                    className="border-[2px] border-primary-500 focus-visible:border-primary-500/70 rounded-md"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-red-600"/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({field}) => (
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
                            <FormMessage className="text-red-600"/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({field}) => (
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
                            <FormMessage className="text-red-600"/>
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
    )
}

const Step2 = (
    {saved}
        : {
        saved: {
            phoneNumber: string;
            password: string;
        }
    }) => {
    const registerModal = useRegisterModal();

    const form = useForm<z.infer<typeof ConfirmPhoneCodeSchema>>({
        resolver: zodResolver(ConfirmPhoneCodeSchema),
        defaultValues: {
            smsCode: "",
        },
    });

    async function onSubmit(values: z.infer<typeof ConfirmPhoneCodeSchema>) {
        try {
            await $axios.post("/auth/activate", {
                ...saved,
                ...values,
            });
            const {data} = await $axios.post("/auth/login", {
                phoneNumber: saved.phoneNumber,
                password: saved.password,
            });
            const encodedData =  data.token?.split(".")[1];
            const { role } = JSON.parse(atob(encodedData || ""));
            await setCookie(data.token, role);
            registerModal.onClose();
            window.location.reload();
        } catch (error) {
            toast.error("Xatolik yuz berdi");
            console.log(error);
        }
    }

    return (
        <Form {...form} key={"step2"}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full space-y-4"
            >
                {/*<DialogTitle className="px-0 py-0.5 leading-[100%] font-medium text-3xl text-mainindigo">*/}
                {/*    Telefon raqamingizni tasdiqlang*/}
                {/*</DialogTitle>*/}
                {/*<DialogDescription className="text-sm text-mainindigo/80">*/}
                {/*    Sizning telefon raqamingizga SMS yubordik. Iltimos, SMS dagi kodni*/}
                {/*    kiriting.*/}
                {/*</DialogDescription>*/}
                <FormField
                    name="smsCode"
                    control={form.control}
                    render={({field}) => (
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
                            <FormMessage className="text-red-600"/>
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
    )
}


