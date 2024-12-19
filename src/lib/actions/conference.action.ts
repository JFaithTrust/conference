"use server";

import {revalidatePath, revalidateTag} from "next/cache";

import {getCookieToken} from "@/lib/actions/auth.action";
import {IConference, IPostConference} from "@/types";

const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;

export async function getLandingConference(){
    try {
        const response = await fetch(`${URL}/conference/landing`, {
            method: "GET",
            next: {
                tags: ["conference"]
            }
        })

        const data: IConference[] = await response.json();
        return data;
    } catch (error) {
        return error instanceof Error ? error.message : "An unexpected error occurred";
    }

}

export async function getConferenceById(id: string) {
  try {
    const response = await fetch(`${URL}/conference/${id}`, {
      method: "GET",
      cache: "no-store",
    });
        const data: IConference = await response.json();
        return data;
    } catch (error) {
        return error instanceof Error ? error.message : "An unexpected error occurred";
    }
}

export async function postConference(data: Partial<IPostConference>) {
    const token = await getCookieToken();
    console.log(data)

    try {
        const response = await fetch(`${URL}/conference`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        })

        console.log(await response.json())
        revalidateTag("conference")
        return "ok";
    } catch (error) {
        return error instanceof Error ? error.message : "An unexpected error occurred";
    }
}

export async function putConference(id: number, values: IConference) {
    const token = await getCookieToken();

  try {
    await fetch(`${URL}/conference/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

        revalidatePath("/dashboard/conferences/all")
        return "ok";
    } catch (error) {
        return error instanceof Error ? error.message : "An unexpected error occurred";
    }
}