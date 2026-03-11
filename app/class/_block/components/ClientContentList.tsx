"use client";

import { CourseSummary } from "@/app/_block/actions/api/get-courses/type";
import { useEffect, useState } from "react";
import ContentCard from "./ContentCard/ContentCard";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientContentList({
  listData,
  hasNext,
  page,
}: {
  listData: CourseSummary[];
  hasNext: boolean;
  page: string;
}) {
  const [contentList, setContentList] = useState<CourseSummary[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleMore = () => {
    if (!hasNext) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (Number(page) + 1).toString());
    router.push(`/class?${params.toString()}`);
  };

  useEffect(() => {
    setContentList(listData);
  }, [listData]);
  return (
    <>
      {contentList.map((content, index) => (
        <ContentCard key={index} content={content} index={index} />
      ))}
      <Button onClick={handleMore}>더보기</Button>
    </>
  );
}
