"use server";

import { getCourses } from "@/app/_block/actions/api/get-courses";
import { CourseSort } from "@/app/_block/actions/api/get-courses/type";
import ContentCard from "../components/ContentCard/ContentCard";

export default async function loadMoreContentCard(
  page: string,
  sort: CourseSort
) {
  const contentListData = await getCourses({ page, sort });
  const contentList = contentListData.content;
  const isLastPage = contentListData.last;

  const contentListElements =
    contentList.map((content, index) => (
      <ContentCard key={content.id} content={content} index={index} />
    )) ?? [];

  return [contentListElements, isLastPage] as const;
}
