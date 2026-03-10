import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 py-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup className="flex flex-col gap-6">
              <Field className="grid gap-2">
                <FieldLabel htmlFor="name">이름</FieldLabel>
                <Input id="name" type="name" placeholder="John Doe" required />
              </Field>
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
                <FieldLabel htmlFor="password">전화번호</FieldLabel>
                <Input
                  id="phone"
                  type="phone"
                  required
                  placeholder="010-1234-5678"
                />
              </Field>
              <Field className="grid gap-2">
                <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                <Input id="password" type="password" required />
              </Field>
              <Field className="grid gap-2">
                <FieldLabel htmlFor="gender">회원유형</FieldLabel>
                <RadioGroup
                  defaultValue="comfortable"
                  className="w-fit flex gap-6 items-center"
                  id="gender"
                >
                  <div className="flex items-center justify-center gap-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">수강생</Label>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3">강사</Label>
                  </div>
                </RadioGroup>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer">
            생성
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
