"use client";

import { createCourse } from "@/app/actions/api/create-course";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v3";

const REQUIRED_MESSAGE = "필수 입력값입니다.";
const NUMBER_ONLY_MESSAGE = "숫자만 입력 가능합니다.";
const DIGITS_ONLY_REGEX = /^\d+$/;

const formSchema = z.object({
  title: z.string().trim().min(1, REQUIRED_MESSAGE),
  description: z.string().optional(),
  instructorName: z.string().trim().min(1, REQUIRED_MESSAGE),
  maxStudents: z
    .string()
    .trim()
    .min(1, REQUIRED_MESSAGE)
    .refine((value) => DIGITS_ONLY_REGEX.test(value), NUMBER_ONLY_MESSAGE)
    .transform((value) => Number(value))
    .refine((value) => value >= 1, REQUIRED_MESSAGE),
  price: z
    .string()
    .trim()
    .min(1, REQUIRED_MESSAGE)
    .refine((value) => DIGITS_ONLY_REGEX.test(value), NUMBER_ONLY_MESSAGE)
    .transform((value) => Number(value))
    .refine((value) => value >= 1, REQUIRED_MESSAGE),
});

export default function AddContentModal() {
  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<z.input<typeof formSchema>, unknown, z.output<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: {
        title: "",
        description: "",
        instructorName: "",
        maxStudents: "",
        price: "",
      },
    }
  );

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createCourse(values);
      reset();
    } catch (error) {
      window.alert(`${(error as Error).message}`);
    }
  });
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">강의 개설</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>강의 개설</DialogTitle>
        </DialogHeader>
        <form>
          <FieldGroup className="flex flex-col gap-2">
            <Field className="grid gap-2" data-invalid={!!errors.title}>
              <FieldLabel htmlFor="title">
                강의 제목<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="title"
                type="text"
                placeholder="React 기초 마스터"
                {...register("title")}
                aria-invalid={!!errors.title}
              />
              <FieldError errors={[errors.title]} />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="title">강의 설명</FieldLabel>
              <Input
                id="title"
                type="text"
                placeholder="React의 기본 개념부터 Hooks까지 배웁니다."
                {...register("description")}
              />
            </Field>
            <Field
              className="grid gap-2"
              data-invalid={!!errors.instructorName}
            >
              <FieldLabel htmlFor="instructorName">
                강사명<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="instructorName"
                type="text"
                placeholder="김강사"
                {...register("instructorName")}
                aria-invalid={!!errors.instructorName}
              />
              <FieldError errors={[errors.instructorName]} />
            </Field>
            <Field className="grid gap-2" data-invalid={!!errors.maxStudents}>
              <FieldLabel htmlFor="instructorName">
                최대 수강 인원<span className="text-destructive">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="input-group-url"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="30"
                  {...register("maxStudents")}
                  aria-invalid={!!errors.maxStudents}
                />
                <InputGroupAddon align="inline-end">
                  <p>명</p>
                </InputGroupAddon>
              </InputGroup>
              <FieldError errors={[errors.maxStudents]} />
            </Field>
            <Field className="grid gap-2" data-invalid={!!errors.price}>
              <FieldLabel htmlFor="price">
                강의 가격<span className="text-destructive">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="input-group-url"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="129000"
                  {...register("price")}
                  aria-invalid={!!errors.price}
                />
                <InputGroupAddon align="inline-end">
                  <p>원</p>
                </InputGroupAddon>
              </InputGroup>
              <FieldError errors={[errors.price]} />
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button type="submit" disabled={!isValid} onClick={onSubmit}>
            강의 개설
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
