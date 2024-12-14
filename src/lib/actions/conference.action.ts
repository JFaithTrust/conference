"use server"

import {revalidatePath} from "next/cache";

import {getCookieToken} from "@/lib/actions/auth.action";
import {IConference} from "@/types";

const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;

export async function getAllConferences(){
    try {
        const response = await fetch(`${URL}/conference/all`, {
            method: "GET",
            next: {
                tags: ["conference"]
            }
        })

        const data: IConference[] = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getConferenceById(id: string) {
    try {
        const response = await fetch(`${URL}/conference/${id}`, {
            method: "GET",
            cache: "no-store"
        })

        const data: IConference = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

interface PostConferenceProps {
    name: string;
    startsAt: Date;
    endsAt: Date;
    deadlineForThesis: Date;
    cost: string;
    description: string;
    requirements: string;
    address: string;
    directions: number[];
}

export async function postConference(data: PostConferenceProps) {
    const token = await getCookieToken();

    try {
        const res = await fetch(`${URL}/conference`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        })

        console.log(await res.json())
        revalidatePath("/dashboard/conferences/all")
        return "ok";
    } catch (error) {
        console.log(error);
    }
}

export async function putConference(id: number, values: PostConferenceProps) {
    const token = await getCookieToken();

    try {
        await fetch(`${URL}/conference/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values)
        })

        revalidatePath("/dashboard/conferences/all")
        return "ok";
    } catch (error) {
        console.log(error);
    }
}