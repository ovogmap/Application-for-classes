"use client";

import { Button } from "@/components/ui/button";
import useSelectedContent from "../../../../_block/store/selectedContent";
import { DialogTrigger } from "@/components/ui/dialog";

export default function TriggerButton() {
  const { getLength } = useSelectedContent();
  const contentLength = getLength();

  return (
    <DialogTrigger asChild>
      <Button
        variant="default"
        className="bg-blue-500 text-white hover:bg-blue-600 "
        disabled={contentLength === 0}
      >
        {contentLength > 0
          ? `${contentLength}개 수강 신청하기`
          : "선택된 강의가 없습니다."}
      </Button>
    </DialogTrigger>
  );
}
