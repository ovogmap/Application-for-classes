"use server";

import { GetCoursesParams, GetCoursesResponse } from "./type";
import { API_BASE_URL } from "../constants";

const DEFAULT_SIZE = "10";

async function parseErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as { message?: unknown };
    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message;
    }
  } catch {
    return `강의 목록 조회에 실패했습니다.`;
  }

  return `강의 목록 조회에 실패했습니다. (${response.status})`;
}

export async function getCourses(
  params: GetCoursesParams
): Promise<GetCoursesResponse> {
  const page = params.page;
  const sort = params.sort;

  const searchParams = new URLSearchParams({
    page,
    sort,
    size: DEFAULT_SIZE,
  });

  const response = await fetch(`${API_BASE_URL}/courses?${searchParams}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as GetCoursesResponse;
}
