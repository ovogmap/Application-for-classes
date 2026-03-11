"use server";

import { cookies } from "next/headers";
import { LoginParams, LoginResponse } from "./type";
import { API_BASE_URL } from "../constants";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const ACCESS_TOKEN_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24;

async function parseErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as { message?: unknown };
    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message;
    }
  } catch {
    return `로그인 요청에 실패했습니다.`;
  }

  return `로그인 요청에 실패했습니다. (${response.status})`;
}

export async function login(params: LoginParams): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const data = (await response.json()) as LoginResponse;

  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE_SECONDS,
  });

  return data;
}
