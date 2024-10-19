import {Control, ControllerRenderProps, FieldValues} from "react-hook-form";
import Image from "next/image";
import {E164Number} from "libphonenumber-js/core";
import {ReactNode} from "react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";
import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select";
import {PhoneInput} from "@/components/custom/phone-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    SELECT = "select",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
}

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string
    type?: string
    label?: string
    placeholder?: string
    iconSrc?: string
    iconAlt?: string
    disabled?: boolean
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: ReactNode,
}

function RenderInput({field, props}: { field: ControllerRenderProps<FieldValues, string>, props: CustomProps }) {
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || "icon"}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            type={props.type}
                            placeholder={props.placeholder}
                            {...field}
                            className="border-[2px] font-normal md:font-medium text-base border-primary-500 focus-visible:border-primary-500/70"
                            // className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={props.placeholder}
                        {...field}
                        // className="shad-textArea"
                        disabled={props.disabled}
                    />
                </FormControl>
            );
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry="UZ"
                        placeholder={props.placeholder}
                        international
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className="rounded-md font-normal md:font-medium text-base border-[2px] border-primary-500 focus-visible:border-primary-500/70"
                        // className="input-phone"
                    />
                </FormControl>
            );
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name}
                            // className="checkbox-label"
                        >
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            );
        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md bg-white">
                    {/*<Image*/}
                    {/*    src="/assets/icons/calendar.svg"*/}
                    {/*    height={24}*/}
                    {/*    width={24}*/}
                    {/*    alt="user"*/}
                    {/*    className="ml-2"*/}
                    {/*/>*/}
                    <FormControl>
                        <DatePicker
                            showTimeSelect={props.showTimeSelect ?? false}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger
                                // className="shad-select-trigger"
                            >
                                <SelectValue placeholder={props.placeholder}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent
                            // className="shad-select-content"
                        >
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );
        default:
            return null;
    }
}


const CustomFormField = (props: CustomProps) => {
    const {control, name, label} = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={"flex-1"}>
                    {props.fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel className={"font-medium"}>{label}</FormLabel>
                    )}
                    <RenderInput field={field} props={props}/>

                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}

export default CustomFormField;