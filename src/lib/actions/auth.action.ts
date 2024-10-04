"use server";

import {cookies} from "next/headers";

export async function setCookie(token: string, role: string) {
    cookies().set("token", token);
    cookies().set("role", role);
    return "ok";
}

export async function getCookieToken() {
    const token = cookies().get("token");

    if (token) {
        try {
            return token.value;
        } catch (error) {
            return error;
        }
    }
    return null;
}

export async function getCookieRole() {
    const role = cookies().get("role");

    if (role) {
        try {
            return role.value;
        } catch (error) {
            return error;
        }
    }
    return null;
}

export async function removeCookie() {
    cookies().delete("token");
    cookies().delete("role");
    return "ok";
}