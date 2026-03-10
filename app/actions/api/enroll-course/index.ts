"use server";

import { EnrollCourseParams, EnrollCourseResponse } from "./type";
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

  return `수강 신청에 실패했습니다. (${response.status})`;
}

export async function enrollCourse(
  params: EnrollCourseParams
): Promise<EnrollCourseResponse> {
  const response = await fetch(
    `${API_BASE_URL}/courses/${params.courseId}/enroll`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as EnrollCourseResponse;
}
