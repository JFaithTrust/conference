"use server";

import { cookies } from "next/headers";

const URL = process.env.NEXT_PUBLIC_GLOBAL_API_URL;

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

export async function removeCookie() {
  cookies().delete("token");
  cookies().delete("role");
  return "ok";
}

// Login action
interface LoginProps {
  phoneNumber: string;
  password: string;
}

export const login = async (values: LoginProps) => {
  try {
    const response = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const { token, message, success } = await response.json();
    const encodedData = token.split(".")[1];
    const { role } = JSON.parse(atob(encodedData || ""));
    await setCookie(token, role);

    return { message, success };
  } catch (error) {
    console.log(error instanceof Error ? error.message : "An unexpected error occurred");
  }
};

// Register action
interface RegisterProps {
  fullName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export const register = async (values: RegisterProps) => {
  try {
    await fetch(`${URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    return "ok";
  } catch (error) {
    return error instanceof Error ? error.message : "An unexpected error occurred";
  }
};

// Activate action
interface ActivateProps {
  phoneNumber: string;
  smsCode: string;
}

export const activate = async (values: ActivateProps) => {
  try {
    await fetch(`${URL}/auth/activate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    return "ok";
  } catch (error) {
    return error instanceof Error ? error.message : "An unexpected error occurred";
  }
};

interface forgotPassworddProps {
  phoneNumber: string;
}

export const forgotPassword = async (values: forgotPassworddProps) => {
  try {
    const res = await fetch(`${URL}/auth/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    return "ok";
  } catch (error) {
    return error
  }
};


interface ResetPasswordProps {
  phoneNumber: string;
  newPassword: string;
  confirmPassword: string;
}

export const resetPassword = async (values: ResetPasswordProps) => {
  try {
    await fetch(`${URL}/auth/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    return "ok";
  } catch (error) {
    return error instanceof Error ? error.message : "An unexpected error occurred";
  }
};

