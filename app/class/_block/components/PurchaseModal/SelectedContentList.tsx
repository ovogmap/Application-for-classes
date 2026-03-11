"use client";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import useSelectedContent from "../../../../_block/store/selectedContent";
import { TrashIcon } from "lucide-react";

export default function SelectedContentList() {
  const { getLength, getSelectedContent, removeSelectedContent } =
    useSelectedContent();
  const selectedContent = getSelectedContent();
  const contentLength = getLength();

  if (contentLength === 0) {
    return (
      <p className="text-sm text-muted-foreground">선택된 강의가 없습니다.</p>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {selectedContent.map((content) => (
        <Item key={content.id} variant="outline">
          <ItemContent>
            <ItemTitle>{content.title}</ItemTitle>
            <ItemDescription>{content.instructorName}</ItemDescription>
            <ItemDescription>
              {content.price.toLocaleString()}원
            </ItemDescription>
          </ItemContent>
          <ItemActions className="flex flex-col items-end">
            <Button
              variant="outline"
              onClick={() => removeSelectedContent(content.id)}
            >
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">삭제</span>
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}
