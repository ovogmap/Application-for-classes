"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v3";
import { signup } from "../_block/actions/api/signup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const REQUIRED_MESSAGE = "필수 입력값입니다.";
const INVALID_EMAIL_MESSAGE = "올바른 이메일 형식이 아닙니다.";
const INVALID_PASSWORD_MESSAGE =
  "비밀번호는 6~10자이며, 영문과 숫자를 모두 포함해야 합니다.";
const REQUIRED_NAME_MESSAGE = "이름은 필수입니다.";
const REQUIRED_PHONE_MESSAGE = "휴대폰 번호는 필수입니다.";
const INVALID_PHONE_MESSAGE =
  "올바른 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678 or 01012345678)";
const REQUIRED_ROLE_MESSAGE = "회원 유형은 필수입니다.";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
const PHONE_REGEX = /^010(?:-\d{4}-\d{4}|\d{8})$/;

function normalizePhoneNumber(phone: string) {
  const digitsOnly = phone.replace(/\D/g, "");
  return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(
    3,
    7
  )}-${digitsOnly.slice(7, 11)}`;
}

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, REQUIRED_MESSAGE)
    .email(INVALID_EMAIL_MESSAGE),
  password: z
    .string()
    .min(1, REQUIRED_MESSAGE)
    .refine((value) => PASSWORD_REGEX.test(value), INVALID_PASSWORD_MESSAGE),
  name: z.string().trim().min(1, REQUIRED_NAME_MESSAGE),
  phone: z
    .string()
    .trim()
    .min(1, REQUIRED_PHONE_MESSAGE)
    .refine((value) => PHONE_REGEX.test(value), INVALID_PHONE_MESSAGE),
  role: z
    .string()
    .trim()
    .min(1, REQUIRED_ROLE_MESSAGE)
    .refine(
      (value) => value === "STUDENT" || value === "INSTRUCTOR",
      REQUIRED_ROLE_MESSAGE
    ),
});

export default function SignupPage() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<z.input<typeof formSchema>, unknown, z.output<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      mode: "onBlur",
      defaultValues: {
        email: "",
        password: "",
        name: "",
        phone: "",
        role: "",
      },
    }
  );

  const { mutateAsync: signupMutation } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.replace("/login");
    },
    onError: (error) => {
      window.alert(`${(error as Error).message}`);
    },
  });

  const onSubmit = handleSubmit((values) => {
    signupMutation({
      ...values,
      phone: normalizePhoneNumber(values.phone),
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="min-h-screen w-full flex flex-col items-center justify-center gap-6 py-6"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="flex flex-col gap-6">
            <Field className="grid gap-2" data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">이름</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              <FieldError errors={[errors.name]} />
            </Field>
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
            <Field className="grid gap-2" data-invalid={!!errors.phone}>
              <FieldLabel htmlFor="phone">전화번호</FieldLabel>
              <Input
                id="phone"
                type="tel"
                placeholder="010-1234-5678"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
              <FieldError errors={[errors.phone]} />
            </Field>
            <Field className="grid gap-2" data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">비밀번호</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="영문+숫자 6~10자"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              <FieldError errors={[errors.password]} />
            </Field>
            <Field className="grid gap-2" data-invalid={!!errors.role}>
              <FieldLabel htmlFor="role">회원유형</FieldLabel>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <RadioGroup
                    className="w-fit flex gap-6 items-center"
                    id="role"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      clearErrors("role");
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <RadioGroupItem value="STUDENT" id="role-student" />
                      <Label htmlFor="role-student">수강생</Label>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <RadioGroupItem value="INSTRUCTOR" id="role-instructor" />
                      <Label htmlFor="role-instructor">강사</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              <FieldError errors={[errors.role]} />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={!isValid}
          >
            생성
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
