import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./_block/components/LogoutButton";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const isLoggedIn = Boolean(accessToken);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        월급쟁이부자들 Front-end 과제
      </h1>
      <div className="max-w-md text-lg leading-8 flex items-center gap-3">
        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <Button variant="default" asChild>
            <Link href="/login">로그인</Link>
          </Button>
        )}
        <Button
          asChild
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Link href="/class?sort=recent">수강신청</Link>
        </Button>
      </div>
    </div>
  );
}
