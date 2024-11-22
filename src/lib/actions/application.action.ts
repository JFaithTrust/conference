"use server"

import {getCookieToken} from "@/lib/actions/auth.action";
import {IApplication} from "@/types";

const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;

export async function getApplicationByConferenceId(conferenceId: string){
    try {
        const response = await fetch(`${URL}/application/byConference/${conferenceId}`, {
            method: "GET"
        })

        const data: IApplication[] = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getApplicationByCurrentUser(){
    try {
        const token = await getCookieToken();
        
        const response = await fetch(`${URL}/application`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        const data: IApplication[] = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}