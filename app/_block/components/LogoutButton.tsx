"use client";

import { logout } from "@/app/_block/actions/api/logout";
import { useRouter } from "next/navigation";
import {
  removeLocalStorage,
  USER_INFO_STORAGE_KEY,
} from "../utils/localStorage";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="submit"
      className="cursor-pointer underline"
      onClick={async () => {
        await logout();
        removeLocalStorage(USER_INFO_STORAGE_KEY);
        router.replace("/");
      }}
    >
      로그아웃
    </button>
  );
}
