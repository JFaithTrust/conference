"use server"

import {ConferenceType} from "@/types";

const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;

export async  function getAllConferences(){
    try {
        const response = await fetch(`${URL}/conference/all`, {
            method: "GET"
        })

        const data: ConferenceType[] = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getConferenceById(id: number){
    try {
        const response = await fetch(`${URL}/conference/${id}`, {
            method: "GET"
        })

        const data: ConferenceType = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}