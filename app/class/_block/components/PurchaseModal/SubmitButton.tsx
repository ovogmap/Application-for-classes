"use client";

import { Button } from "@/components/ui/button";
import useSelectedContent from "../../../../_block/store/selectedContent";

export default function SubmitButton() {
  const { getLength } = useSelectedContent();
  const contentLength = getLength();
  return (
    <Button type="submit" disabled={contentLength === 0}>
      신청하기
    </Button>
  );
}
