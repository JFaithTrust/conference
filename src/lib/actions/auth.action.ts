"use server";

import $auth from "@/http/auth";
import { cookies } from "next/headers";

export async function setCookie(token: string) {
  cookies().set("token", token);
  return "ok";
}

export async function getCookie() {
  const token = cookies().get("token");

  if (token) {
    try {
      return token.value;
    } catch (error) {
      return null;
    }
  }
  return null;
}
