"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {z} from "zod";

import CustomFormField, {FormFieldType} from "@/components/custom/form-field";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {CreateApplicationSchema} from "@/lib/validation";
import {IDirection} from "@/types";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {ImageUploader} from "@/components/custom/image-uploader";
import {Button} from "@/components/ui/button";

interface PostArticleFormProps {
    directions?: IDirection[],
    conferenceName?: string
}

const PostArticleForm = ({directions, conferenceName}: PostArticleFormProps) => {
    const [file, setFile] = useState<File | null>(null);

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
                    <FormField
                        control={form.control}
                        name={`directionId`}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Yo&apos;nalish</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                        }}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="border">
                                            <SelectValue placeholder="Yo'nalish tanlang"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {directions && directions.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
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
                    <ImageUploader
                        onChange={setFile}
                        className="w-full"
                    />
                    <div className={"flex justify-end"}>
                        <Button
                            type={"submit"}
                            className={"bg-primary text-white"}
                        >
                            Yuborish
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
export default PostArticleForm
