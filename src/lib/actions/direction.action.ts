"use server";

import { DirectionType } from "@/types";

const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;

export async function getDirectionByConferenceId(id: number): Promise<DirectionType[]> {
    try {
        const response = await fetch(`${URL}/direction/byConference/${id}`);
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}
