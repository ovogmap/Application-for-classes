"use server";

import { GetCoursesParams, GetCoursesResponse } from "./type";
import { API_BASE_URL } from "../constants";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;
const DEFAULT_SORT = "recent";

async function parseErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as { message?: unknown };
    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message;
    }
  } catch {
    // no-op
  }

  return `강의 목록 조회에 실패했습니다. (${response.status})`;
}

export async function getCourses(
  params: GetCoursesParams = {}
): Promise<GetCoursesResponse> {
  const page = params.page ?? DEFAULT_PAGE;
  const size = params.size ?? DEFAULT_SIZE;
  const sort = params.sort ?? DEFAULT_SORT;

  const searchParams = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort,
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
