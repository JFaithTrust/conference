import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {PhoneInput} from "@/components/custom/phone-input";
import {Input} from "@/components/ui/input";
import {Dispatch, SetStateAction, useState} from "react";
import useForgotPasswordModal from "@/hook/useForgotPasswordModal";
import {Button} from "@/components/ui/button";
import {forgotPasswordSchema1, forgotPasswordSchema2, forgotPasswordSchema3} from "@/lib/validation";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import $axios from "@/http/axios";
import useLoginModal from "@/hook/useLoginModal";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";

const ForgotPasswordForm = () => {
    const [step, setStep] = useState(1);
    const [saved, setSaved] = useState({ phoneNumber: "" });

    return (
        step === 1 ? (
            <ForgotStep1 setSaved={setSaved} setStep={setStep} />
        ) : step === 2 ? (
            <ForgotStep2 saved={saved} setStep={setStep} />
        ) : (
            <ForgotStep3 saved={saved} />
        )
    )
}

export default ForgotPasswordForm


function ForgotStep1({
                         setSaved,
                         setStep,
                     }: {
    setSaved: Dispatch<SetStateAction<{ phoneNumber: string }>>;
    setStep: Dispatch<SetStateAction<number>>;
}) {
    const form = useForm<z.infer<typeof forgotPasswordSchema1>>({
        resolver: zodResolver(forgotPasswordSchema1),
        defaultValues: {
            phoneNumber: "",
        },
    });

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema1>) {
        try {
            const { data } = await $axios.post("/auth/forgot", values);
            if (data.success) {
                setSaved({
                    phoneNumber: values.phoneNumber,
                });
                setStep(2);
            }
        } catch (error) {
            toast.error("Telefon raqam yoki parol noto'g'ri");
            console.log(error)
        }
    }

    const { isSubmitting } = form.formState;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormField
                    name="phoneNumber"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel
                                className="text-base font-medium"
                            >
                                Telefon raqam
                            </FormLabel>
                            <FormControl>
                                <PhoneInput
                                    type="tel"
                                    placeholder="+998912345678"
                                    {...field}
                                    className="rounded-md border-[2px] border-primary-500 focus-visible:border-primary-500/70"
                                    maxLength={13}
                                />
                            </FormControl>
                            <FormMessage className="text-red-600" />
                        </FormItem>
                    )}
                />
                <button
                    type="submit"
                    aria-disabled={isSubmitting}
                    className="py-[12px] w-full rounded-lg text-lg font-medium leading-[100%] text-white bg-primary"
                >
                    Tasdiqlash
                </button>
            </form>
        </Form>
    );
}


function ForgotStep2({
                         saved,
                         setStep,
                     }: {
    saved: { phoneNumber: string };
    setStep: Dispatch<SetStateAction<number>>;
}) {
    const form = useForm<z.infer<typeof forgotPasswordSchema2>>({
        resolver: zodResolver(forgotPasswordSchema2),
        defaultValues: {
            smsCode: "",
        },
    });

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema2>) {
        try {
            const { data } = await $axios.post("/auth/forgot/verify", {
                ...saved,
                ...values,
            });
            if (data.success) {
                setStep(3);
            }
        } catch (error) {
            toast.error("Telefon raqam yoki parol noto'g'ri");
            console.log(error)
        }
    }

    const { isSubmitting } = form.formState;
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/*<h1 className="px-0 py-0.5 leading-[100%] font-medium text-3xl text-mainindigo">*/}
                    {/*    Tasdiqlash*/}
                    {/*</h1>*/}
                    {/*<p>Telefon raqamingizga yuborilgan SMS kodni kiriting</p>*/}
                    <FormField
                        name="smsCode"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium">
                                    SMS kod
                                </FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-[12px] w-full rounded-lg text-lg font-medium leading-[100%] text-white bg-primary"
                    >Verify Phone Number</Button>
                </form>
            </Form>
        </div>
    );
}

function ForgotStep3({ saved }: { saved: { phoneNumber: string } }) {
    const forgotPasswordModal = useForgotPasswordModal();
    const loginModal = useLoginModal();

    const form = useForm<z.infer<typeof forgotPasswordSchema3>>({
        resolver: zodResolver(forgotPasswordSchema3),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema3>) {
        try {
            const { data: response } = await $axios.post("/auth/reset", {
                ...saved,
                ...values,
            });
            if (response.success) {
                // const { data } = await axios.post("/api/auth/forgot/verify", {
                //   phoneNumber: saved.phoneNumber,
                // });
                forgotPasswordModal.onClose();
                loginModal.onOpen();
                // localStorage.setItem("access_token", data.token);
                // const userToken = localStorage.getItem("access_token");
                // const encodedData = userToken?.split(".")[1];
                // const { role } = JSON.parse(atob(encodedData || ""));
                // localStorage.setItem("role", role);
                // if (role === "SUPER_ADMIN") {
                //   router.replace("/dashboard");
                // }
            }
        } catch (error) {
            toast.error("Telefon raqam yoki parol noto'g'ri");
            console.log(error)
        }
    }

    const { isSubmitting } = form.formState;
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/*<h1 className="px-0 py-0.5 leading-[100%] font-medium text-3xl text-mainindigo">*/}
                    {/*    Parolni tiklash*/}
                    {/*</h1>*/}
                    {/*<p>Yangi parolni kiriting</p>*/}
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium">
                                    Parol
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="*******"
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
                            <FormItem>
                                <FormLabel className="text-base font-medium">
                                    Parol
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="*******"
                                        {...field}
                                        className="border-[2px] border-primary-500 focus-visible:border-primary-500/70"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-[12px] w-full rounded-lg text-lg font-medium leading-[100%] text-white bg-primary"
                    >
                        Tasdiqlash
                    </Button>
                </form>
            </Form>
        </div>
    );
}