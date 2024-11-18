"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import CustomFormField, {FormFieldType} from "@/components/custom/form-field";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {ConferenceAddSchema} from "@/lib/validation";

const ConferenceForm = () => {

    const form = useForm<z.infer<typeof ConferenceAddSchema>>({
        resolver: zodResolver(ConferenceAddSchema),
        defaultValues: {
            name: "",
            description: "",
            // startsAt: "",
            // endsAt: "",
            requirements: "",
            address: "",
            cost: "",
            // deadlineForThesis: "",
        }
    })

    async function onSubmit(values: z.infer<typeof ConferenceAddSchema>) {
        console.log(values)
    }

    return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-y-4"}>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name={"name"}
                        label={"Konferensiya nomi"}
                        placeholder={"Raqamli texnologiyalar"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name={"address"}
                        label={"Manzil"}
                        placeholder={"Toshkent shahri, Yunusobod tumani, Olmazor ko'chasi, 12-uy"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name={"description"}
                        label={"Tavsif"}
                        placeholder={"Konferensiya haqida qisqacha tavsif"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name={"requirements"}
                        label={"Talablar"}
                        placeholder={"Konferensiyaga qatnashish uchun talablar"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"deadlineForThesis"}
                        label={"Registratsiya muddati"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"startsAt"}
                        label={"Boshlanish sanasi"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"endsAt"}
                        label={"Tugash sanasi"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name={"cost"}
                        label={"Narxi"}
                        placeholder={"50000"}
                    />
                    <Button
                        type={"submit"}
                        className={"w-full bg-primary px-20 text-lg text-white"}
                    >
                        Yaratish
                    </Button>
                </form>
            </Form>
    )
}
export default ConferenceForm
