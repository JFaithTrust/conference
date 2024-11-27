import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { PhoneInput } from "@/components/custom/phone-input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {activate, forgotPassword, resetPassword} from "@/lib/actions/auth.action";
import {ConfirmPhoneCodeSchema, forgotPasswordSchema1, ResetPasswordSchema} from "@/lib/validation";
import useLoginModal from "../../hook/useLoginModal";
import {useForgotPasswordModal} from "@/hook";

const ForgotPasswordForm = () => {
    const [step, setStep] = useState(1);
    const [saved, setSaved] = useState({ phoneNumber: "" });

    return step === 1 ? (
        <Step1 setSaved={setSaved} setStep={setStep} />
    ) : step === 2 ? (
        <Step2 phoneNumber={saved.phoneNumber} setStep={setStep} />
    ) : (
        <Step3 phoneNumber={saved.phoneNumber} />
    );
};

export default ForgotPasswordForm;

const Step1 = ({
                   setSaved,
                   setStep,
               }: {
    setSaved: Dispatch<SetStateAction<{ phoneNumber: string; }>>;
    setStep: Dispatch<SetStateAction<number>>;
}) => {
    const form = useForm<z.infer<typeof forgotPasswordSchema1>>({
        resolver: zodResolver(forgotPasswordSchema1),
        defaultValues: {
            phoneNumber: "",
        },
    });


    async function onSubmit(values: z.infer<typeof forgotPasswordSchema1>) {
        const res = await forgotPassword(values);

        if (res === "ok") {
            toast.success("SMS kod yuborildi. Tekshirib ko'ring");
            setSaved({
                phoneNumber: values.phoneNumber,
            });
            setStep(2);
        } else {
            toast.error("Xatolik yuz berdi");
        }
    }

    const { isSubmitting } = form.formState;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3 md:space-y-4">
                <FormField
                    name="phoneNumber"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel className="text-base font-medium">Telefon raqam</FormLabel>
                            <FormControl>
                                <PhoneInput
                                    type="tel"
                                    placeholder="+998912345678"
                                    className="rounded-md border-2 border-primary-500 text-base font-normal focus-visible:border-primary-500/70 md:font-medium"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-red-600" />
                        </FormItem>
                    )}
                />
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full rounded-lg bg-primary py-[12px] text-lg font-normal leading-[100%] text-white disabled:cursor-not-allowed disabled:opacity-50 md:font-medium"
                >
                    SMS Kod yuborish
                </button>
            </form>
        </Form>
    );
};

const Step2 = ({
                   phoneNumber,
                   setStep,
               }: {
    phoneNumber: string;
    setStep: Dispatch<SetStateAction<number>>;
}) => {
    const form = useForm<z.infer<typeof ConfirmPhoneCodeSchema>>({
        resolver: zodResolver(ConfirmPhoneCodeSchema),
        defaultValues: {
            smsCode: "",
        },
    });

    async function onSubmit(values: z.infer<typeof ConfirmPhoneCodeSchema>) {
        const res = await activate({ phoneNumber, smsCode: values.smsCode });

        if (res === "ok") {
            toast.success("Kod tasdiqlandi. Endi parolni o'zgartirishingiz mumkin.");
            setStep(3);
        } else {
            toast.error("Xatolik yuz berdi");
        }
    }

    const { isSubmitting } = form.formState;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3 md:space-y-4">
                <FormField
                    name="smsCode"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="SMS kod"
                                    {...field}
                                    className="border-2 border-primary-500 px-2 py-1 focus-visible:border-primary-500/70 md:px-3 md:py-2"
                                />
                            </FormControl>
                            <FormMessage className="text-red-600" />
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

const Step3 = ({
                   phoneNumber,
               }: {
    phoneNumber: string;
}) => {
    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const {onClose} = useForgotPasswordModal();

    async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
        console.log(values);
        const res: string = await resetPassword({
            phoneNumber,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        });
        onClose()
        if (res === "ok") {
            toast.success("Parol muvaffaqiyatli o'zgartirildi");

        } else {
            toast.error("Xatolik yuz berdi");
        }
    }

    const { isSubmitting } = form.formState;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3 md:space-y-4">
                <FormField
                    name="newPassword"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel className="text-base font-medium">Yangi parol</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Yangi parol"
                                    {...field}
                                    className="border-2 border-primary-500 px-2 py-1 text-base font-normal focus-visible:border-primary-500/70 md:px-3 md:py-2 md:font-medium"
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
                            <FormLabel className="text-base font-medium">Parolni takrorlang</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Parolni tasdiqlang"
                                    {...field}
                                    className="border-2 border-primary-500 px-2 py-1 text-base font-normal focus-visible:border-primary-500/70 md:px-3 md:py-2 md:font-medium"
                                />
                            </FormControl>
                            <FormMessage className="text-red-600" />
                        </FormItem>
                    )}
                />
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full rounded-lg bg-primary py-[12px] text-lg font-normal leading-[100%] text-white disabled:cursor-not-allowed disabled:opacity-50 md:font-medium"
                >
                    Parolni yangilash
                </button>
            </form>
        </Form>
    );
};
