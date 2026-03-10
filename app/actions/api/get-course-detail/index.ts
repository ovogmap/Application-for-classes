"use server";

import { GetCourseDetailParams, GetCourseDetailResponse } from "./type";
import { API_BASE_URL } from "../constants";

async function parseErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as { message?: unknown };
    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message;
    }
  } catch {
    // no-op
  }

  return `강의 상세 조회에 실패했습니다. (${response.status})`;
}

export async function getCourseDetail(
  params: GetCourseDetailParams
): Promise<GetCourseDetailResponse> {
  const response = await fetch(`${API_BASE_URL}/courses/${params.courseId}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as GetCourseDetailResponse;
}
