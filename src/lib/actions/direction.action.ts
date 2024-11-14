"use server";

import {getCookieToken} from "@/lib/actions/auth.action";
import {IDirection} from "@/types";

const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;

export async function getAllDirections() {
    const token = await getCookieToken();

    try {
        const response = await fetch(`${URL}/direction/all`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        const data: IDirection[] = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteDirectionById(id: number) {
    const token = await getCookieToken();

    try {
        const response = await fetch(`${URL}/direction/${id}`, {
            method: "DELATE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        const data: IDirection[] = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
