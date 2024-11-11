"use server";

import {revalidatePath} from "next/cache";

import {getCookieToken} from "@/lib/actions/auth.action";
import {UserType} from "@/types";

const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;

export const getUser = async () => {
    const token = await getCookieToken();

    try {
        const response = await fetch(`${URL}/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data: UserType = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllUsers() {
    const token = await getCookieToken();

    try {
        const response = await fetch(`${URL}/user/all?role=USER`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data: UserType[] = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllReviewers() {
    const token = await getCookieToken();

    try {
        const response = await fetch(`${URL}/user/all?role=REVIEWER`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data: UserType[] = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function changeUserStatus(id: number, enable: boolean) {
    const token = await getCookieToken();

    console.log("change")

    try {
        await fetch(`${URL}/user/changeStatus/${id}?enable=${enable}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        revalidatePath("/dashboard/users")
        return "ok";
    } catch (error) {
        console.log(error);
    }
}

export async function getUserById(id: string) {
    const token = await getCookieToken();

    try {
        const response = await fetch(`${URL}/user/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data: UserType = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}
