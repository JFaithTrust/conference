"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {Dispatch, SetStateAction, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

import {PhoneInput} from "@/components/custom/phone-input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import useRegisterModal from "@/hook/useRegisterModal";
import {activate, login, register} from "@/lib/actions/auth.action";
import {ConfirmPhoneCodeSchema, registerSchema} from "@/lib/validation";

const RegisterForm = () => {
    const [step, setStep] = useState(1);
    const [saved, setSaved] = useState({phoneNumber: "", password: ""});

    return step === 1 ? (
        <Step1 setSaved={setSaved} setStep={setStep}/>
    ) : (
        <Step2 saved={saved}/>
    );
};

export default RegisterForm;

const Step1 = ({
                   setSaved,
                   setStep,
               }: {
    setSaved: Dispatch<SetStateAction<{ phoneNumber: string; password: string }>>;
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
        const res = await register(values);

        if (res === "ok") {
            toast.success("SMS kod yuborildi. Tekshirib ko'ring");
            setSaved({
                phoneNumber: values.phoneNumber,
                password: values.password,
            });
            setStep(2);
        } else {
            toast.error("Xatolik yuz berdi");
        }
    }

    const {isSubmitting} = form.formState;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full space-y-3 md:space-y-4"
            >
                <FormField
                    name="fullName"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="space-y-1">
                            <FormLabel className="text-base font-medium">F.I.SH</FormLabel>
                            <FormControl className="w-full">
                                <Input
                                    type="text"
                                    placeholder="Full Name"
                                    {...field}
                                    className="border-2  border-primary-500 px-2 py-1 text-base font-normal focus-visible:border-primary-500/70 md:px-3 md:py-2 md:font-medium"
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
                            <FormLabel className="text-base font-medium">
                                Telefon raqam
                            </FormLabel>
                            <FormControl>
                                <PhoneInput
                                    type="tel"
                                    placeholder="+998912345678"
                                    className="rounded-md  border-2 border-primary-500 text-base font-normal focus-visible:border-primary-500/70 md:font-medium"
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
                            <FormLabel className="text-base font-medium">Parol</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                    className="border-2 border-primary-500 px-2 py-1 text-base font-normal focus-visible:border-primary-500/70 md:px-3 md:py-2 md:font-medium"
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
                            <FormLabel className="text-base font-medium">
                                Parolni takrorlang
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Confirm Password"
                                    {...field}
                                    value={field.value || ""}
                                    className="border-2 border-primary-500 px-2 py-1 text-base font-normal focus-visible:border-primary-500/70 md:px-3 md:py-2 md:font-medium"
                                />
                            </FormControl>
                            <FormMessage className="text-red-600"/>
                        </FormItem>
                    )}
                />
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full rounded-lg bg-primary py-[12px] text-lg font-normal leading-[100%] text-white disabled:cursor-not-allowed disabled:opacity-50 md:font-medium"
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
    saved: {
        phoneNumber: string;
        password: string;
    };
}) => {
    const registerModal = useRegisterModal();

    const form = useForm<z.infer<typeof ConfirmPhoneCodeSchema>>({
        resolver: zodResolver(ConfirmPhoneCodeSchema),
        defaultValues: {
            smsCode: "",
        },
    });

    async function onSubmit(values: z.infer<typeof ConfirmPhoneCodeSchema>) {
        const res = await activate(
            {
                ...saved,
                ...values,
            }
        );
        if (res === "ok") {
            toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz");
            await login({
                phoneNumber: saved.phoneNumber,
                password: saved.password,
            })
            registerModal.onClose();
        } else {
            toast.error("Xatolik yuz berdi");
        }
    }

    const {isSubmitting} = form.formState;
    return (
        <Form {...form} key={"step2"}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full space-y-3 md:space-y-4"
            >
                {/* <DialogTitle className="px-0 py-0.5 leading-[100%] font-medium text-3xl text-mainindigo"> */}
                {/*    Telefon raqamingizni tasdiqlang */}
                {/* </DialogTitle> */}
                {/* <DialogDescription className="text-sm text-mainindigo/80"> */}
                {/*    Sizning telefon raqamingizga SMS yubordik. Iltimos, SMS dagi kodni */}
                {/*    kiriting. */}
                {/* </DialogDescription> */}
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
                                    className="border-2 border-primary-500 px-2 py-1 focus-visible:border-primary-500/70 md:px-3 md:py-2"
                                />
                            </FormControl>
                            <FormMessage className="text-red-600"/>
                        </FormItem>
                    )}
                />
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full rounded-lg bg-primary py-[12px] text-lg font-normal leading-[100%] text-white disabled:cursor-not-allowed disabled:opacity-50 md:font-medium"
                >
                    Tasdiqlash
                </button>
            </form>
        </Form>
    );
};
