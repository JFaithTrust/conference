import {E164Number} from "libphonenumber-js/core";
import Image from "next/image";
import React, {ReactNode} from "react";
import {Control, ControllerRenderProps, FieldValues} from "react-hook-form";

import {PhoneInput} from "@/components/custom/phone-input";
import {SmartDatetimeInput} from "@/components/custom/smart-date-input";
import {Checkbox} from "@/components/ui/checkbox";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";

import "react-datepicker/dist/react-datepicker.css";

export enum FormFieldType {
    // eslint-disable-next-line no-unused-vars
    INPUT = "input",
    // eslint-disable-next-line no-unused-vars
    TEXTAREA = "textarea",
    // eslint-disable-next-line no-unused-vars
    PHONE_INPUT = "phoneInput",
    // eslint-disable-next-line no-unused-vars
    SELECT = "select",
    // eslint-disable-next-line no-unused-vars
    CHECKBOX = "checkbox",
    // eslint-disable-next-line no-unused-vars
    DATE_PICKER = "datePicker",
}

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    type?: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: ReactNode,
    classNames?: string
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
                            className="border" // border-2 border border-primary-500 text-sm placeholder:font-medium focus-visible:border-primary-500/70
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
                        disabled={props.disabled}
                        className={"min-h-20"}
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
                        className="rounded-md border-2 border-primary-500 text-base font-normal focus-visible:border-primary-500/70 md:font-medium"
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
                <FormControl>
                    <FormItem>
                        <FormLabel
                            className="text-center text-xs"
                        >
                            {props.label}
                        </FormLabel>
                        <SmartDatetimeInput
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="e.g. Tomorrow morning 9am"
                        />
                    </FormItem>
                </FormControl>
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
    const {control, name, label, classNames} = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={`flex-1 ${classNames}`}>
                    {props.fieldType !== FormFieldType.CHECKBOX && props.fieldType !== FormFieldType.DATE_PICKER && label && (
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