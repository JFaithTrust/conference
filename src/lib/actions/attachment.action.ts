"use server"

import {getCookieToken} from "@/lib/actions/auth.action";
import {IAttachmentResponse} from "@/types";

const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;

export async function postAttachment(file: FormData) {
    const token = await getCookieToken();
    
    try {
        const response = await fetch(`${URL}/attachment/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: file,
        })
        const data: IAttachmentResponse[] = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}