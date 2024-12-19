"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {MDXEditorMethods} from "@mdxeditor/editor";
import {PlusIcon} from "lucide-react";
import dynamic from "next/dynamic";
import React, {useRef, useState} from 'react'
import {useForm} from "react-hook-form";
import {z} from "zod";

import DirectionCard from "@/components/cards/direction.card";
import CustomFormField, {FormFieldType} from "@/components/custom/form-field";
import {ImageUploader} from "@/components/custom/image-uploader";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {postAttachment} from "@/lib/actions/attachment.action";
import {postConference} from "@/lib/actions/conference.action";
import {PostConferenceFormSchema} from "@/lib/validation";

const Editor = dynamic(() => import("@/components/editor"), {
    ssr: false,
});

const PostConferenceForm = () => {
    const [infFile, setInfFile] = useState<File | null>(null)
    const [examFile, setExamFile] = useState<File | null>(null)
    const editorRef = useRef<MDXEditorMethods>(null);
    const form = useForm<z.infer<typeof PostConferenceFormSchema>>({
        resolver: zodResolver(PostConferenceFormSchema),
        defaultValues: {
            nameUz: "",
            nameRu: "",
            nameEng: "",
            directions: [],
            startsAt: undefined,
            endsAt: undefined,
            registrationStartsAt: undefined,
            registrationEndsAt: undefined,
            paymentStartsAt: undefined,
            paymentEndsAt: undefined,
            publishDate: undefined,
            goal: "",
            cost: "0",
            address: "",
            organization: "",
            requirements: "",
            description: "",
            doiRequired: false,
            antiPlagiarismRequired: false
        }
    })

    async function handlePostConference(values: z.infer<typeof PostConferenceFormSchema>) {
        if (infFile && examFile) {
            const formDataLetter = new FormData();
            formDataLetter.append('file', infFile);
            const letter = await postAttachment(formDataLetter);

            const formDataExam = new FormData();
            formDataExam.set('file', examFile);
            const example = await postAttachment(formDataExam);
            if (letter && example) {
                const newValues = {
                    ...values,
                    cost: Number(values.cost),
                    letterId: letter[0].id,
                    exampleThesisId: example[0].id
                }
                const response = await postConference(newValues)
                // console.log("Form submitted", values);
                // form.reset();
            }
        }
    }

    // const handleInputKeyDown = (
    //     e: React.KeyboardEvent<HTMLInputElement>,
    //     field: { value: string[] }
    // ) => {
    //     if (e.key === "Enter") {
    //         e.preventDefault();
    //         const tagInput = e.currentTarget.value.trim();
    //
    //         if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
    //             form.setValue("directions", [...field.value, tagInput]);
    //             e.currentTarget.value = "";
    //             form.clearErrors("directions");
    //         } else if (tagInput.length > 15) {
    //             form.setError("directions", {
    //                 type: "manual",
    //                 message: "Tag should be less than 15 characters",
    //             });
    //         } else if (field.value.includes(tagInput)) {
    //             form.setError("directions", {
    //                 type: "manual",
    //                 message: "Tag already exists",
    //             });
    //         }
    //     }
    // };

    const handleAddDirection = (field: { value: string[] }) => {
        const inputElement = document.querySelector('input[placeholder="Yo\'nalishlar..."]') as HTMLInputElement;
        const tagInput = inputElement.value.trim();
        if (tagInput && !field.value.includes(tagInput)) {
            form.setValue("directions", [...field.value, tagInput]);
            inputElement.value = "";
            form.clearErrors("directions");
        } else if (field.value.includes(tagInput)) {
            form.setError("directions", {
                type: "manual",
                message: "Yo'nalish allaqachon mavjud",
            });
        }
    }

    const handleDirectionRemove = (direction: string, field: { value: string[] }) => {
        const newDirections = field.value.filter((d) => d !== direction);

        form.setValue("directions", newDirections);

        if (newDirections.length === 0) {
            form.setError("directions", {
                type: "manual",
                message: "Yo'nalishlar majburiy",
            });
        }
    };

    const {isSubmitting} = form.formState;

    return (
        <Form {...form}>
            <form
                className={"flex w-full flex-col gap-4"}
                onSubmit={form.handleSubmit(handlePostConference)}
            >
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name={"nameUz"}
                    label={"Konferensiya nomi (uzbekcha)"}
                    placeholder={"---------"}
                />
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name={"nameRu"}
                    label={"Konferensiya nomi (ruscha)"}
                    placeholder={"---------"}
                />
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name={"nameEng"}
                    label={"Konferensiya nomi (inglizcha)"}
                    placeholder={"---------"}
                />
                <FormField
                    control={form.control}
                    name="directions"
                    render={({field}) => (
                        <FormItem className={"flex w-full flex-col gap-3"}>
                            <FormLabel>
                                Yo&apos;nalishlar
                            </FormLabel>
                            <FormControl>
                                <>
                                    <div className="relative">
                                        <Input
                                            className="no-focus border pr-10"
                                            placeholder="Yo'nalishlar..."
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-primary-500 px-2 py-1 text-white"
                                            onClick={() => handleAddDirection(field)}
                                        >
                                            <PlusIcon size={16}/>
                                        </button>
                                    </div>
                                    {field.value.length > 0 && (
                                        <div className="mt-2.5 flex flex-wrap items-center justify-start gap-2.5">
                                            {field?.value?.map((direction: string) => (
                                                <DirectionCard
                                                    key={direction}
                                                    name={direction}
                                                    handleRemove={() => handleDirectionRemove(direction, field)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className={"grid grid-cols-4 items-center gap-x-20 gap-y-6"}>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"registrationStartsAt"}
                        label={"Ro'yhatdan o'tish vaqti(boshlanish)"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"registrationEndsAt"}
                        label={"Ro'yhatdan o'tish vaqti(tugash)"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"startsAt"}
                        label={"Konferensiya boshlanish vaqti"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"endsAt"}
                        label={"Konferensiya tugash vaqti"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"paymentStartsAt"}
                        label={"To'lov muddati(boshlanish)"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"paymentEndsAt"}
                        label={"To'lov muddati(tugash)"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name={"publishDate"}
                        label={"Maqola nashr qilish muddati"}
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name={"cost"}
                        type={"number"}
                        label={"Konferensiya narxi"}
                    />
                </div>
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.TEXTAREA}
                    name={"goal"}
                    label={"Maqsad"}
                    placeholder={"Konferensiyadan maqsad"}
                />
                <FormField
                    control={form.control}
                    name="requirements"
                    render={({field}) => (
                        <FormItem className={"flex w-full flex-col"}>
                            <FormLabel className={"text-[16px] font-semibold leading-[20.8px]"}>
                                Talablar
                            </FormLabel>
                            <FormControl>
                                <Editor
                                    value={field.value}
                                    editorRef={editorRef}
                                    fieldChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem className={"flex w-full flex-col"}>
                            <FormLabel className={"text-[16px] font-semibold leading-[20.8px]"}>
                                Ma&apos;lumot
                            </FormLabel>
                            <FormControl>
                                <Editor
                                    value={field.value}
                                    editorRef={editorRef}
                                    fieldChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className={"grid grid-cols-2 gap-x-20"}>
                    <div className={"flex flex-col gap-y-2"}>
                        <Label>
                            Axborot xati
                        </Label>
                        <ImageUploader
                            onChange={setInfFile}
                            className="w-full"
                        />
                    </div>
                    <div className={"flex flex-col gap-y-2"}>
                        <Label>
                            Namuna
                        </Label>
                        <ImageUploader
                            onChange={setExamFile}
                            className="w-full"
                        />
                    </div>
                </div>
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name={"organization"}
                    label={"Tashkilot nomi"}
                    placeholder={"---------"}
                />
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    name={"address"}
                    label={"Manzil"}
                    placeholder={"Toshkent shahri, Yunusobod tumani, Olmazor ko'chasi, 12-uy"}
                />
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="doiRequired"
                    label="DOI kerak bo'lsa belgilang"
                />
                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="antiPlagiarismRequired"
                    label="Anti plagiat kerak bo'lsa belgilang"
                />
                <div className={"my-4 flex justify-end"}>
                    <Button
                        disabled={isSubmitting}
                        type={"submit"}
                        className={`w-full text-white ${isSubmitting ? "cursor-not-allowed bg-primary-500/80" : "bg-primary-500"}`}
                    >
                        Yaratish
                    </Button>
                </div>
            </form>
        </Form>
    )
}
export default PostConferenceForm
