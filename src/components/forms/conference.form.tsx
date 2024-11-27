"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import React from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

import CustomFormField, {FormFieldType} from "@/components/custom/form-field";
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput, MultiSelectorItem, MultiSelectorList,
    MultiSelectorTrigger
} from "@/components/custom/multi-selector";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {postConference, putConference} from "@/lib/actions/conference.action";
import {ConferenceAddSchema} from "@/lib/validation";
import {ConferenceType, IDirection} from "@/types";

interface ConferenceFormProps {
    directionData: IDirection[],
    conferenceData?: ConferenceType
}

const ConferenceForm = ({directionData, conferenceData}: ConferenceFormProps) => {
    const router = useRouter()
    let directionMatchNames: string[] = []
    if(conferenceData){
        directionMatchNames = directionData.map((item) =>
            conferenceData.directions?.includes(item.id) ? item.name : ""
        )
    }

    const form = useForm<z.infer<typeof ConferenceAddSchema>>({
        resolver: zodResolver(ConferenceAddSchema),
        defaultValues: {
            name: conferenceData?.name || "",
            startsAt: conferenceData?.startsAt || undefined,
            endsAt: conferenceData?.endsAt || undefined,
            deadlineForThesis: conferenceData?.deadlineForThesis || undefined,
            description: conferenceData?.description || "",
            requirements: conferenceData?.requirements || "",
            address: conferenceData?.address || "",
            cost: conferenceData?.cost || "",
            directionIds: directionMatchNames
        }
    })

    async function onSubmit(values: z.infer<typeof ConferenceAddSchema>) {
        const selectedDirectionsId = directionData.filter((direction) => values.directionIds.includes(direction.name)).map((direction) => direction.id)
        if(conferenceData){
            const res = await putConference(conferenceData.id, {...values, directionIds: selectedDirectionsId})
            if (res === "ok") {
                toast.success("Konferensiya muvaffaqiyatli tahrirlandi")
                form.reset()
                router.back()
            } else {
                toast.error("Konferensiyani tahrirlashda xatolik")
            }
        }else{
            const res = await postConference({...values, directionIds: selectedDirectionsId})
            if (res === "ok") {
                toast.success("Konferensiya muvaffaqiyatli yaratildi")
                form.reset()
            } else {
                toast.error("Konferensiya yaratishda xatolik")
            }
        }
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
                <FormField
                    control={form.control}
                    name="directionIds"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Yo&apos;nalishlar</FormLabel>
                            <FormControl>
                                <MultiSelector
                                    onValuesChange={field.onChange}
                                    values={field.value}
                                >
                                    <MultiSelectorTrigger>
                                        <MultiSelectorInput
                                            placeholder="Yo'nalish biriktiring"
                                        />
                                    </MultiSelectorTrigger>
                                    <MultiSelectorContent
                                    >
                                        <MultiSelectorList
                                            className={"bg-white"}
                                        >
                                            {directionData.map((direction) => (
                                                <MultiSelectorItem key={direction.id} value={direction.name}>
                                                    <span>{direction.name}</span>
                                                </MultiSelectorItem>
                                            ))}
                                        </MultiSelectorList>
                                    </MultiSelectorContent>
                                </MultiSelector>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className={"grid grid-cols-4 items-center gap-20"}>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"deadlineForThesis"}
                        label={"Ro'yhatdan o'tish vaqti"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"startsAt"}
                        label={"Boshlanish vaqti"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"endsAt"}
                        label={"Tugash vaqti"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name={"cost"}
                        label={"Narxi"}
                        placeholder={"50000"}
                    />
                </div>
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
                <Button
                    type={"submit"}
                    className={"w-full bg-primary px-20 text-lg text-white"}
                >
                    {conferenceData ? "Tahrirlash" : "Yaratish" }
                </Button>
            </form>
        </Form>
    )
}
export default ConferenceForm
