// "use client"
// import { zodResolver } from "@hookform/resolvers/zod"
// import {Check, ChevronsUpDown} from "lucide-react";
// import {useState} from "react";
// import {Form, useForm} from "react-hook-form"
// import { z } from "zod"
//
// import CustomFormField, {FormFieldType} from "@/components/custom/form-field";
// import {Button} from "@/components/ui/button";
// import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
// } from "@/components/ui/command";
// import {Input} from "@/components/ui/input";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import {Textarea} from "@/components/ui/textarea";
// import {cn} from "@/lib/utils";
// import {Props} from "@/types";
//
//
// const formSchema = z.object({
//     username: z.string().min(2, {
//         message: "Username must be at least 2 characters.",
//     }),
// })
//
//
// export default function PostArticleForm({name, id, direction}: Props) {
//     const [open, setOpen] = useState<boolean>(false);
//     const [value, setValue] = useState<string>("");
//
//
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             username: "",
//         },
//     })
//
//     function onSubmit(values: z.infer<typeof formSchema>) {
//         // Do something with the form values.
//         // ✅ This will be type-safe and validated.
//         console.log(values)
//     }
//
//
//     return (
//         <div className="my-8">
//             <Card>
//                 <CardHeader>
//                     <CardTitle className="text-xl font-semibold">Maqolani jo&apos;natish</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                             <CustomFormField
//                                 control={form.control}
//                                 fieldType={FormFieldType.INPUT}
//                                 name="articleName"
//                                 label="Tanlangan Konferensiya"
//                                 placeholder="Enter article name"
//                             />
//
//
//
//                             <div>
//                                 <label className="text-sm font-medium text-gray-700">Tanlangan Konferensiya</label>
//                                 <Input placeholder="Tanlangan konferensiya" disabled readOnly value={name}/>
//                             </div>
//
//                             <Popover open={open} onOpenChange={setOpen}>
//                                 <PopoverTrigger asChild>
//                                     <Button
//                                         variant="outline"
//                                         role="combobox"
//                                         aria-expanded={open}
//                                         className="w-full justify-between border border-solid border-violet-200 px-3 py-2"
//                                     >
//                                         {value
//                                             ? direction.find((d) => d.id.toString() === value)?.name
//                                             : "Yo'nalish tanlang..."}
//                                         <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50"/>
//                                     </Button>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-[1500px] p-0">
//                                     <Command>
//                                         <CommandInput placeholder="Yo'nalish tanlang..."/>
//                                         <CommandEmpty>Yo&apos;nalish topilmadi.</CommandEmpty>
//                                         <CommandGroup>
//                                             {direction.map((d) => (
//                                                 <CommandItem
//                                                     key={d.id}
//                                                     value={d.id.toString()}
//                                                     onSelect={(currentValue) => {
//                                                         setValue(currentValue === value ? "" : currentValue);
//                                                         setOpen(false);
//                                                     }}
//                                                 >
//                                                     <Check
//                                                         className={cn(
//                                                             "mr-2 h-4 w-4",
//                                                             value === d.id.toString()
//                                                                 ? "opacity-100"
//                                                                 : "opacity-0"
//                                                         )}
//                                                     />
//                                                     {d.name}
//                                                 </CommandItem>
//                                             ))}
//                                         </CommandGroup>
//                                     </Command>
//                                 </PopoverContent>
//                             </Popover>
//
//                             <div>
//                                 <label className="text-sm font-medium text-gray-700">Maqola nomi</label>
//                                 <Input placeholder="Maqola nomi"/>
//                             </div>
//
//                             <div>
//                                 <label className="text-sm font-medium text-gray-700">Mualliflar</label>
//                                 <Input placeholder="Mualliflar"/>
//                             </div>
//
//                             <div>
//                                 <label className="text-sm font-medium text-gray-700">Tavsif</label>
//                                 <Textarea placeholder="Qisqacha tavsif yozing"/>
//                             </div>
//
//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium text-gray-700">Fayl yuklash</label>
//                                 <Button variant="outline" className="w-full">Yuklash</Button>
//                             </div>
//
//                             <Button type="submit" variant="primary" className="w-full bg-green-500 hover:bg-green-600">
//                                 Submit
//                             </Button>
//                         </form>
//                     </Form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }