"use server";

import {revalidatePath} from "next/cache";

import $auth from "@/http/auth";
import { UserType } from "@/types";

export async function getUser() {
  try {
    const { data } = await $auth.get("/user");
    return data as UserType;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUsers() {
  const { data } = await $auth.get("/user/all?role=USER");
  return data;
}

export async function changeUserStatus(id: number, enable: boolean) {
  const { data } = await $auth.put(`/user/changeStatus/${id}?enable=${enable}`);

  revalidatePath("/dashboard/users")
  return data;
}

export async function getUserById(id: number) {
  const { data } = await $auth.get(`/user/${id}`);
  return data;
}
