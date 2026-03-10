"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ClientCardListWrapper({
  nodes,
  isLastPage,
  handleLoadMore,
}: {
  nodes: ReactNode[];
  isLastPage: boolean;
  handleLoadMore: (page: string) => Promise<readonly [ReactNode[], boolean]>;
}) {
  const [page, setPage] = useState(0);
  const [currentLastPage, setCurrentLastPage] = useState(isLastPage);
  const [trigger, setTrigger] = useState(false);
  const [currentNodes, setCurrentNodes] = useState([...nodes]);

  useEffect(() => {
    async function loadMore() {
      if (!currentLastPage) {
        const [contentListElements, isLastPage] = await handleLoadMore(
          page.toString()
        );
        console.log("page:", page);
        console.log("isLastPage:", isLastPage, currentLastPage);
        setPage(page + 1);
        setCurrentNodes(currentNodes.concat(contentListElements));
        setCurrentLastPage(isLastPage);
      }
    }
    loadMore();
  }, [currentLastPage, currentNodes, handleLoadMore, page, trigger]);

  if (currentNodes.length === 0) {
    return <p className="text-sm text-muted-foreground">강의가 없습니다.</p>;
  }

  return (
    <div className="w-full grid grid-cols-3 gap-6">
      {currentNodes.map((node) => node)}
      <button
        onClick={() => {
          setTrigger(true);
        }}
      >
        Load More
      </button>
    </div>
  );
}
