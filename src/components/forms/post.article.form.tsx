"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import React from 'react'
import {useForm} from "react-hook-form";
import {z} from "zod";

import CustomFormField, {FormFieldType} from "@/components/custom/form-field";
import {Form} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {CreateApplicationSchema} from "@/lib/validation";
import {IDirection} from "@/types";

interface PostArticleFormProps {
    directions?: IDirection[],
    conferenceName?: string
}

const PostArticleForm = ({directions, conferenceName}: PostArticleFormProps) => {

    const form = useForm<z.infer<typeof CreateApplicationSchema>>({
        resolver: zodResolver(CreateApplicationSchema),
        defaultValues: {
            name: "",
            authors: "",
            description: "",
            directionId: ""
        }
    })


    async function onSubmit(values: z.infer<typeof CreateApplicationSchema>) {
    }

    return (
        <div className={"flex flex-col"}>
            <h2 className={"text-center text-2xl font-semibold"}>Maqola yuborish</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-y-4"}>
                    <Label htmlFor={"conferenceName"}>Konferensiya nomi</Label>
                    <Input id={"conferenceName"} className={"border"} value={conferenceName} readOnly/>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.SELECT}
                        name={"directionId"}
                        label={"Yo'nalish"}
                        placeholder={"Raqamli texnologiyalar"}
                    >
                        {directions?.map((direction) => (
                            <option key={direction.id} value={direction.id}>{direction.name}</option>
                        ))}
                    </CustomFormField>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name={"name"}
                        label={"Maqola nomi"}
                        placeholder={"Raqamli texnologiyalar"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name={"authors"}
                        label={"Mualliflar"}
                        placeholder={"Solijoniy Jahongir, Qudratjonov Shohruh"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name={"description"}
                        label={"Annotatsiya"}
                        placeholder={"Maqola tavsifi"}
                    />
                </form>
            </Form>
        </div>
    )
}
export default PostArticleForm
