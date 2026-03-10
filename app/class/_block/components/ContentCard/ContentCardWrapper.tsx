"use client";

import { CourseSummary } from "@/app/actions/api/get-courses/type";
import useSelectedContent from "../../store/selectedContent";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

export default function ContentCardWrapper({
  content,
  children,
}: {
  content: CourseSummary;
  children: React.ReactNode;
}) {
  const { addSelectedContent, removeSelectedContent, isSelectedContent } =
    useSelectedContent();
  const isSelected = isSelectedContent(content.id);

  const handleClick = () => {
    if (content.isFull) return;

    if (isSelectedContent(content.id)) {
      removeSelectedContent(content.id);
    } else {
      addSelectedContent(content);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full pt-0 rounded-xl",
        !content.isFull && "hover:ring-2 hover:ring-blue-500  cursor-pointer"
      )}
      onClick={handleClick}
    >
      {children}
      <div
        className={cn(
          "absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-gray-500/35 transition-opacity",
          isSelected ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <CheckIcon className="size-6 text-white" />
      </div>
    </div>
  );
}
