"use client";

import { login } from "@/app/_block/actions/api/login";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v3";
import {
  setLocalStorage,
  USER_INFO_STORAGE_KEY,
} from "../_block/utils/localStorage";
import { useMutation } from "@tanstack/react-query";

const REQUIRED_MESSAGE = "필수 입력값입니다.";
const INVALID_EMAIL_MESSAGE = "올바른 이메일 형식이 아닙니다.";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, REQUIRED_MESSAGE)
    .email(INVALID_EMAIL_MESSAGE),
  password: z.string().min(1, REQUIRED_MESSAGE),
});

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.input<typeof formSchema>, unknown, z.output<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      mode: "onBlur",
      defaultValues: {
        email: "",
        password: "",
      },
    }
  );

  const { mutate: loginMutation } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      router.replace("/");
      setLocalStorage(USER_INFO_STORAGE_KEY, data.user);
    },
    onError: (error) => {
      window.alert(`${(error as Error).message}`);
    },
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation(values);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="min-h-screen w-full flex flex-col items-center justify-center gap-6 py-6"
    >
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
          <FieldGroup className="flex flex-col gap-6">
            <Field className="grid gap-2" data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">이메일</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              <FieldError errors={[errors.email]} />
            </Field>
            <Field className="grid gap-2" data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">비밀번호</FieldLabel>
              <Input
                id="password"
                type="password"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              <FieldError errors={[errors.password]} />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={!isValid}
          >
            로그인
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
