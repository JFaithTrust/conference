"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {LuPlus} from "react-icons/lu";
import {MdDelete} from "react-icons/md";
import {toast} from "sonner";
import {z} from "zod";

import CustomFormField, {FormFieldType} from "@/components/custom/form-field";
import ReviewerModal from "@/components/modals/reviewer.modal";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {useReviewerAdd} from "@/hook";
import {AddReviewerToDirection, postDirection} from "@/lib/actions/direction.action";
import {DirectionSchema} from "@/lib/validation";
import {IDirection, UserType} from "@/types";

interface DirectionFormProps {
    reviewerData: UserType[],
    directionData?: IDirection,
    directionReviewers?: UserType[]
}

const DirectionForm = ({reviewerData, directionData, directionReviewers}: DirectionFormProps) => {
    const reviewersForEdit = directionReviewers?.map((item) => item.id.toString())
    const [selectedReviewersId, setSelectedReviewersId] = useState<string[]>(reviewersForEdit || [])
    const reviewerAdd = useReviewerAdd()

    const form = useForm<z.infer<typeof DirectionSchema>>({
        resolver: zodResolver(DirectionSchema),
        defaultValues: {
            name: directionData?.name || "",
        },
    });

    const onDeleteReviewer = (id: number) => {
        setSelectedReviewersId((prev) => prev.filter((item) => item !== id.toString()));
    }


    async function onSubmit(values: z.infer<typeof DirectionSchema>) {
        const data = await postDirection(values)
        if (data) {
            if (selectedReviewersId.length > 0) {
                const reviewersId: any[] = []
                selectedReviewersId.forEach((item) => {
                    reviewersId.push({
                        id: parseInt(item),
                    })
                })
                const res = await AddReviewerToDirection(data.id, reviewersId)
                if (res) {
                    setSelectedReviewersId([])
                    toast.success("Muharrirlar yo'nalishga qo'shildi")
                } else {
                    toast.error("Muharrirlar yo'nalishga qo'shishda xatolik")
                }
            }
            form.reset()
            toast.success("Yo'nalish yaratildi")
        } else {
            toast.error("Yo'nalish yaratishda xatolik")
        }
    }

    const {isSubmitting} = form.formState

    return (
        <div className={"space-y-4"}>
            <ReviewerModal
                data={reviewerData as UserType[]}
                selectedReviewersId={selectedReviewersId}
                setSelectedReviewersId={setSelectedReviewersId}
                label={"Yo'nalishga muharrir biriktirish"}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"flex items-end gap-x-6"}>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name={"name"}
                        label={"Yo'nalish nomi"}
                        placeholder={"IOT, AI, Blockchain..."}
                    />
                    <Button
                        type={"button"}
                        onClick={reviewerAdd.onOpen}
                        className="flex gap-x-2 rounded-lg border-none bg-indigo-500 py-5 text-white"
                    >
                        <LuPlus className={"size-4"}/>
                        <span>Muharrir qo&apos;shish</span>
                    </Button>
                </form>
            </Form>
            <div
                className={`flex min-h-56 w-full rounded-md shadow ${selectedReviewersId.length > 0 ? "flex-col gap-y-2 p-4" : "items-center justify-center"}`}>
                {selectedReviewersId.length > 0 ? (
                    reviewerData.filter((item) => selectedReviewersId.includes(item.id.toLocaleString())).map((item) => (
                        <div
                            key={item.id}
                            className="flex h-fit w-full flex-row items-center justify-between rounded border px-2 py-1"
                        >
                            <span className="text-sm">
                                {item.fullName}
                            </span>
                            <span className="text-sm">
                                {item.phoneNumber}
                            </span>
                            <div className="flex items-center gap-x-3">
                                <button className="rounded bg-green-500 px-2.5 py-0.5 text-white">
                                    {item.userStatus.charAt(0).toUpperCase() + item.userStatus.slice(1).toLowerCase()}
                                </button>
                                <button
                                    className={"rounded bg-destructive px-2.5 py-1.5 text-white"}

                                    onClick={() => onDeleteReviewer(item.id)}>
                                    <MdDelete/>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className={"text-center text-xl font-medium text-muted-foreground"}>
                    Muharrir biriktirish ixtiyoriy, agar muharrir biriktirmoqchi bo&apos;lsangiz, yuqoridagi tugmani bosing
                </span>
                )}
            </div>
            <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className={"w-full bg-primary px-20 text-lg text-white disabled:cursor-not-allowed disabled:bg-primary/80"}
            >
                Yaratish
            </Button>
        </div>
    )
}
export default DirectionForm