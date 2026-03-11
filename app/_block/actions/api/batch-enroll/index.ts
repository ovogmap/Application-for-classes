"use server";

import { BatchEnrollParams, BatchEnrollResponse } from "./type";
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

  return `배치 수강 신청에 실패했습니다. (${response.status})`;
}

export async function batchEnroll(
  params: BatchEnrollParams
): Promise<BatchEnrollResponse> {
  const { accessToken, courseIds } = params;

  const response = await fetch(`${API_BASE_URL}/enrollments/batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ courseIds }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as BatchEnrollResponse;
}
