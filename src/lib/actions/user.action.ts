"use server"

import $auth from "@/http/auth";
import {UserType} from "@/types";

export async function getUser(){
    try {
        const { data } = await $auth.get("/user");
        return data as UserType;
    }catch (error) {
        console.log(error);
    }
}