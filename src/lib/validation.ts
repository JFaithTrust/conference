import * as z from "zod";

export const loginSchema = z.object({
    phoneNumber: z.string().min(10),
    password: z.string().min(6),
});

const passwordSchema = z
    .string()
    .min(6, {message: "Password kamida 6 ta harakterdan iborat bo'lishi kerak"})
    .max(30, {message: "Password 30 ta harakterdan oshmasligi kerak"});

export const registerSchema = z
    .object({
        fullName: z.string().min(3),
        phoneNumber: z.string().min(13),
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwordlar mos kelmadi! Iltimos qayta urinib ko'ring.",
        path: ["confirmPassword"],
    });

export const forgotPasswordSchema1 = z.object({
    phoneNumber: z.string().min(13),
});

export const forgotPasswordSchema2 = z.object({
    smsCode: z.string().min(6).max(6),
});

export const forgotPasswordSchema3 = z.object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
});

export const createPostSchema = z.object({
    name: z.string(),
    authors: z.string().nonempty("Iltimos mualliflarni kiriting."),
    description: z.string().nonempty("Iltimos izoh qoldiring."),
});

export const userAddSchema = z.object({
    users: z.array(z.string()).nonempty("Iltimos foydalanuvchilarni tanlang."),
});

export const ConfirmPhoneCodeSchema = z.object({
    smsCode: z.string().min(4).max(4),
});

export const DirectionSchema = z.object({
    name: z.string().min(3),
});
z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
});

export const ConferenceAddSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    requirements: z.string().min(3),
    address: z.string().min(3),
    cost: z.string().min(0),
    startsAt: z.date({
        required_error: "Sana kiritilishi shart.",
    }),
    endsAt: z.date({
        required_error: "Sana kiritilishi shart.",
    }),
    deadlineForThesis: z.date({
        required_error: "Sana kiritilishi shart.",
    }),
    paymentDate: z.date({
        required_error: "Sana kiritilishi shart.",
    }),
    directions: z.array(z.string()).nonempty("Iltimos yo'nalishni tanlang."),
});

export const PostConferenceFormSchema = z.object({
    nameUz: z.string().min(3),
    nameRu: z.string().min(3),
    nameEng: z.string().min(3),
    directions: z.array(
        z.string().min(1, "Yo'nalish bo'lishi shart.")
    ).min(1, "Yo'nalishni tanlang"),
    startsAt: z.date({
        required_error: "Sana kiritilishi shart.",
    }),
    endsAt: z.date({
        required_error: "Sana kiritilishi shart.",
    }),
    registrationStartsAt: z.date({
        required_error: "Sana kiritilishi shart.",
    }),
    registrationEndsAt: z.date({
        required_error: "Sana kiritilishi shart.",
    }),
    paymentStartsAt: z.date({
        required_error: "Sana kiritilishi shart.",
    }),
    paymentEndsAt: z.date({
        required_error: "Sana kiritilishi shart.",
    }),
    publishDate: z.date({
        required_error: "Sana kiritilishi shart.",
    }),
    goal: z.string().min(3),
    cost: z.string().min(3),
    address: z.string().min(3),
    organization: z.string().min(3),
    requirements: z.string().min(3),
    description: z.string().min(3),
    doiRequired: z.boolean().default(false),
    antiPlagiarismRequired: z.boolean().default(false)
});


export const CreateApplicationSchema = z.object({
    name: z.string().min(3),
    authors: z.string().min(3),
    description: z.string().min(3),
    directionId: z.string().min(1),
});


export const ResetPasswordSchema = z.object({
    newPassword: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
    confirmPassword: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Parollar mos kelmaydi",
    path: ["confirmPassword"],
});