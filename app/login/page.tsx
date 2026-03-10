import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 py-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            이메일과 비밀번호를 입력하여 로그인해주세요.
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href="/signup">회원가입</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup className="flex flex-col gap-6">
              <Field className="grid gap-2">
                <FieldLabel htmlFor="email">이메일</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  required
                />
              </Field>
              <Field className="grid gap-2">
                <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                <Input id="password" type="password" required />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            로그인
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
