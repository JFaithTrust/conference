"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {AiOutlineSearch} from "react-icons/ai";
import {toast} from "sonner";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useReviewerAdd} from "@/hook";
import {putUserMakeReviewer} from "@/lib/actions/user.action";
import {UserType} from "@/types";


interface ModalProps {
    data: UserType[]
    label: string
}

const highlightSearchTerm = (text: string, term: string) => {
    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, index) => (
        <span
            key={index}
            className={
                part.toLowerCase() === term.toLowerCase() ? "bg-orange-500" : ""
            }
        >
        {part}
      </span>
    ));
};

const ReviewerModal = ({data, label}: ModalProps) => {
    const reviewerAdd = useReviewerAdd()
    const [searchTerm, setSearchTerm] = useState("")

    const FormSchema = z.object({
        users: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "Iltimos, kamida bir foydalanuvchini tanlang yoki bekor qilish tugmasini bosing",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            users: [],
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const usersIdList: any = [];
        data.users.forEach((id) => {
            usersIdList.push({
                id,
            });
        });
        const res = await putUserMakeReviewer(usersIdList)
        if(res === "ok"){
            toast.success("Foydalanuvchilar muvaffaqiyatli o'zgartirildi")
            reviewerAdd.onClose()
        }else{
            toast.error("Xatolik yuz berdi")
        }
    }

    return (
        <Dialog open={reviewerAdd.isOpen} onOpenChange={reviewerAdd.onClose}>
            <DialogContent
                aria-describedby={undefined}
                className="w-full max-w-[450px] !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center p-8 md:p-10 lg:p-8"
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-medium text-primary-500 md:text-3xl">
                        {label}
                    </DialogTitle>
                </DialogHeader>
                <div className="relative flex w-full items-center">
                    <span
                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        <AiOutlineSearch className=" size-5"/>
                      </span>
                    <Input
                        type="text"
                        placeholder="search"
                        className="h-9 pl-10 shadow"
                        value={searchTerm}
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }}
                    />
                </div>
                <div className={"grid py-4"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            {data?.filter((user) =>
                                user.fullName
                                    ?.toLowerCase()
                                    // .includes(searchTerm.toLowerCase())
                                    .replace(/\s+/g, "")
                                    .includes(searchTerm.toLowerCase().replace(/\s+/g, ""))
                            ).map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="users"
                                    render={({field}) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-center justify-between space-y-0 rounded-md bg-white p-2 shadow"
                                            >
                                                <FormLabel className={"w-full cursor-pointer"}>
                                                    <p>
                                                    {highlightSearchTerm(item.fullName, searchTerm)}
                                                    </p>
                                                </FormLabel>
                                                <FormControl className={"flex items-center"}>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id.toLocaleString())}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.id.toLocaleString()])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.id.toLocaleString()
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                            <FormMessage/>
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <div className={"flex w-full justify-between"}>
                        <Button onClick={reviewerAdd.onClose} className="h-9 bg-red-500 text-white shadow">
                            Bekor qilish
                        </Button>
                        <Button onClick={form.handleSubmit(onSubmit)} type="submit"
                                className="h-9 bg-indigo-500 text-white	shadow">
                            Saqlash
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default ReviewerModal