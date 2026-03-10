"use client";

import { Button } from "@/components/ui/button";
import { Content } from "../../types";
import useSelectedContent from "../../store/selectedContent";

export default function ContentCardFooterButton({
  content,
}: {
  content: Content;
}) {
  const { addSelectedContent, removeSelectedContent, isSelectedContent } =
    useSelectedContent();
  const isSelected = isSelectedContent(content.id);
  const handleClick = () => {
    if (isSelected) {
      removeSelectedContent(content.id);
    } else {
      addSelectedContent(content);
    }
  };
  return (
    <Button
      className="w-full cursor-pointer"
      disabled={!!content.isFull}
      onClick={handleClick}
    >
      {isSelected ? "취소" : "신청하기"}
    </Button>
  );
}
