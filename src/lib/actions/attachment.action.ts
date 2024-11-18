"use server"

import {getCookieToken} from "@/lib/actions/auth.action";

const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;

export async function attachmentUpload(
    formData: FormData,
) {
    const token = await getCookieToken();
    try {
        const response = await fetch(`${URL}/attachment/upload`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        console.log(await response.json())
    } catch (error) {
        console.log("Error", error);
    }
}