"use server";

import {revalidatePath} from "next/cache";

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

export async function getDirectionById(id: string) {
    const token = await getCookieToken();

    try {
        const response = await fetch(`${URL}/direction/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        const data: IDirection = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getDirectionByConferenceId(id: string) {
    const token = await getCookieToken();

    try {
        const response = await fetch(`${URL}/direction/byConference/${id}`, {
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

interface DirectionProps {
    name: string;
    reviewers: string[];
}

export async function postDirection(values: DirectionProps,) {
    const token = await getCookieToken();

    try {
        await fetch(`${URL}/direction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values)
        })

        revalidatePath("/dashboard/conferences/fields");
        return "ok";
    } catch (error) {
        console.log(error);
    }
}


export async function putDirection(id: number, values: DirectionProps) {
    const token = await getCookieToken();

    try {
        await fetch(`${URL}/direction/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values)
        })

        revalidatePath("/dashboard/conferences/fields");
        return "ok";
    } catch (error) {
        console.log(error);
    }
}

// export async function AddReviewerToDirection(id: number, reviewersId: UserType[]) {
//     const token = await getCookieToken();
//
//     try {
//         await fetch(`${URL}/direction/addReviewer/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(reviewersId)
//         })
//
//         revalidatePath("/dashboard/conferences/fields/create");
//         return "ok";
//     } catch (error) {
//         console.log(error);
//     }
// }

export async function deleteDirectionById(id: number) {
    const token = await getCookieToken();

    try {
        await fetch(`${URL}/direction/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })


        revalidatePath("/dashboard/conferences/fields");
        return "ok";
    } catch (error) {
        console.log(error);
    }
}
