"use server";

import { SignupParams, SignupResponse } from "./type";
import { API_BASE_URL } from "../constants";

async function parseErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as { message?: unknown };
    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message;
    }
  } catch {
    return "회원가입 요청에 실패했습니다.";
  }

  return `회원가입 요청에 실패했습니다. (${response.status})`;
}

export async function signup(params: SignupParams): Promise<SignupResponse> {
  const response = await fetch(`${API_BASE_URL}/users/signup`, {
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

  return (await response.json()) as SignupResponse;
}
