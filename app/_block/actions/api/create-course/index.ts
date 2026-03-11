"use server";

import { CreateCourseParams, CreateCourseResponse } from "./type";
import { API_BASE_URL } from "../constants";
import { cookies } from "next/headers";

async function parseErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as { message?: unknown };
    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message;
    }
  } catch {
    return `강의 등록 요청에 실패했습니다.`;
  }

  return `강의 등록 요청에 실패했습니다. (${response.status})`;
}

export async function createCourse(
  params: CreateCourseParams
): Promise<CreateCourseResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await fetch(`${API_BASE_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(params),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as CreateCourseResponse;
}
