"use client";

import { logout } from "@/app/_block/actions/api/logout";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="submit"
      className="cursor-pointer underline"
      onClick={async () => {
        await logout();
        router.push("/");
      }}
    >
      로그아웃
    </button>
  );
}
