"use client";

import { CourseSort } from "@/app/_block/actions/api/get-courses/type";
import { getCoursesPage } from "@/app/class/_block/actions/api/get-courses-page";
import { useInfiniteScrollTrigger } from "@/app/class/_block/hooks/useInfiniteScrollTrigger";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";
import ContentCard from "./ContentCard/ContentCard";

const INITIAL_PAGE = 0;

export default function ClientContentList({ sort }: { sort: CourseSort }) {
  const triggerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ["courses", sort],
    queryFn: ({ pageParam }) => getCoursesPage({ page: pageParam, sort }),
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  const allContentList = useMemo(
    () => data.pages.flatMap((coursesPage) => coursesPage.content),
    [data]
  );

  const handleIntersect = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useInfiniteScrollTrigger({
    targetRef: triggerRef,
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
    onIntersect: handleIntersect,
  });

  return (
    <>
      {allContentList.map((content, index) => (
        <ContentCard key={content.id} content={content} index={index} />
      ))}
      {hasNextPage && <div ref={triggerRef} className="h-8 w-full" />}
      {isFetchingNextPage && (
        <p className="text-sm text-muted-foreground">
          강의를 불러오는 중입니다.
        </p>
      )}
    </>
  );
}
