"use client";

import { Button } from "@/components/ui/button";
import useSelectedContent from "../../../../_block/store/selectedContent";
import { batchEnroll } from "@/app/_block/actions/api/batch-enroll";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { CourseSort } from "@/app/_block/actions/api/get-courses/type";

export default function SubmitButton({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const sort = (searchParams.get("sort") as CourseSort) ?? "recent";

  const queryClient = useQueryClient();
  const { mutateAsync: batchEnrollMutation } = useMutation({
    mutationFn: batchEnroll,
    onSuccess: (data) => {
      if (data.failed.length > 0) {
        const failedCourseIds = data.failed
          .map((course) => course.courseId)
          .join(", ");

        window.alert(
          `이미 수강 신청한 강의가 포함되어 있습니다. ID:${failedCourseIds}`
        );
      }
      queryClient.invalidateQueries({
        queryKey: ["courses", sort],
      });
      reset();
      setIsOpen(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { getLength, getSelectedContentIds, reset } = useSelectedContent();
  const contentLength = getLength();
  const onSubmit = () => {
    batchEnrollMutation({
      courseIds: getSelectedContentIds(),
    });
  };
  return (
    <Button type="submit" disabled={contentLength === 0} onClick={onSubmit}>
      신청하기
    </Button>
  );
}
