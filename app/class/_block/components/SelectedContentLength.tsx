"use client";

import useSelectedContent from "../../../_block/store/selectedContent";

export default function SelectedContentLength() {
  const { getLength } = useSelectedContent();
  return (
    <p className="text-sm text-muted-foreground">
      선택된 강의 수: {getLength()}
    </p>
  );
}
