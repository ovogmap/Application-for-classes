"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
}
