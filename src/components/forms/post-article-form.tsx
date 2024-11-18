"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {Check, ChevronsUpDown} from "lucide-react";
import React, {SyntheticEvent, useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {toast} from "@/components/ui/use-toast";
import useLoginModal from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";
import {attachmentUpload} from "@/lib/actions/attachment.action";
import {cn} from "@/lib/utils";
import {createPostSchema} from "@/lib/validation";
import {DirectionType} from "@/types";

import {
    Form,
    FormField,
    FormControl,
    FormLabel,
    FormItem,
    FormMessage,
} from "../ui/form";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {Textarea} from "../ui/textarea";
import {ToastAction} from "../ui/toast";


interface Props {
    name: string;
    id: number;
    direction: DirectionType[];
}

const ArticleForm = ({name, id, direction}: Props) => {
    const [imageId, setImageId] = useState<string | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(true);

    const [selectedFile, setSelectedFile] = useState("");


    const handleFileChange = async (e: React.SyntheticEvent) => {
        console.log("changed")
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];

        // Validate file type and size
        const allowedTypes = ["application/pdf"]; // Add allowed file types
        const maxSize = 10 * 1024 * 1024; // 10MB maximum file size

        if (!allowedTypes.includes(file.type)) {
            toast({
                title: "Fayl turi noto'g'ri! Iltimos pdf formatda yuklang.",
                variant: "destructive",
            });
            return;
        }

        if (file.size > maxSize) {
            toast({
                title: "Fayl hajmi 10MB dan oshmasligi kerak!",
                variant: "destructive",
            });
            return;
        }

        setSelectedFile(file.name);
        const formData = new FormData();
        formData.append("file", file);

        await attachmentUpload(formData);
    };

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);

    const form = useForm<z.infer<typeof createPostSchema>>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            name: "",
            authors: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof createPostSchema>) {
        // if (imageId) {
        //     const application = {
        //         name: values.name,
        //         authors: values.authors,
        //         description: values.description,
        //         thesisFile: {id: imageId},
        //         direction: {id: value},
        //         conference: {id},
        //     };
        //
        //     fetch("/api/application", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${accessToken}`,
        //         },
        //         body: JSON.stringify(application),
        //     })
        //         .then((res) => {
        //             if (res.ok) {
        //                 return res.json();
        //             }
        //             throw new Error("Request failed");
        //         })
        //         .then((data) => {
        //             // Successful response
        //             toast({
        //                 title: "Maqola muvaffaqiyatli yuborildi",
        //                 variant: "default",
        //             });
        //         })
        //         .catch((err) => {
        //             toast({
        //                 title: err?.message || "Xatolik yuz berdi",
        //                 variant: "destructive",
        //                 action: (
        //                     <ToastAction altText="Try again">Qayta urinish</ToastAction>
        //                 ),
        //             });
        //         });
        //
        //     form.reset();
        //     setSelectedFile("");
        //     setValue("");
        // } else {
        //     toast({
        //         title: "Fayl tanlanmadi",
        //         variant: "destructive",
        //     });
        // }
    }


    const {isSubmitting} = form.formState;

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-[30px]"
                >
                    <div className="flex flex-col gap-y-3">
                        <Label>Tanlangan Konferensiya</Label>
                        <Input
                            type="text"
                            className="border border-solid border-violet-200"
                            value={name}
                            readOnly
                            disabled
                        />
                    </div>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between border border-solid border-violet-200 px-3 py-2"
                            >
                                {value
                                    ? direction.find((d) => d.id.toString() === value)?.name
                                    : "Yo'nalish tanlang..."}
                                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[1500px] p-0">
                            <Command>
                                <CommandInput placeholder="Yo'nalish tanlang..."/>
                                <CommandEmpty>Yo&apos;nalish topilmadi.</CommandEmpty>
                                <CommandGroup>
                                    {direction.map((d) => (
                                        <CommandItem
                                            key={d.id}
                                            value={d.id.toString()}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue);
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === d.id.toString()
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {d.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Maqola nomi</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Maqola nomi"
                                        className="border border-solid border-violet-200"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="authors"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Mualliflar</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Mualliflar"
                                        className="border border-solid border-violet-200"
                                        {...field}
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
                            <FormItem>
                                <FormLabel>Tavsif</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Qisqacha tavsif yozing"
                                        className="resize-none border border-solid border-violet-200"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-between">
                        <div
                            className="flex flex-col gap-6 rounded-xl border border-solid border-violet-200 bg-mainwhite p-[18px]">
                            <h3 className="font-main-text text-center text-sm font-normal leading-[100%]">
                                {selectedFile ? `Tanlangan fayl` : "Fayl yuklash"}
                            </h3>
                            <label
                                className="bg-typeyellow font-main-text cursor-pointer rounded-xl px-[48px] py-[12px] text-lg font-normal leading-[100%] text-mainwhite">
                                {!selectedFile ? (
                                    "Yuklash"
                                ) : loading ? (
                                    "Yuklanyapti..."
                                ) : (
                                    `${selectedFile}`
                                )}
                                <Input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        {/* <CustomButton */}
                        {/*    disabled={isSubmitting} */}
                        {/*    label={"Submit"} */}
                        {/*    success */}
                        {/*    classNames="px-[48px] py-[12px] rounded-[19px]" */}
                        {/* /> */}
                    </div>
                </form>
            </Form>
        </>
    );
};

export default ArticleForm;

