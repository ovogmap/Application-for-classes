"use server";

import { getCourses } from "@/app/_block/actions/api/get-courses";
import {
  CourseSort,
  CourseSummary,
} from "@/app/_block/actions/api/get-courses/type";

export type CoursesPage = {
  content: CourseSummary[];
  hasNext: boolean;
  page: number;
  nextPage: number | null;
};

type GetCoursesPageParams = {
  page: number;
  sort: CourseSort;
};

export async function getCoursesPage({
  page,
  sort,
}: GetCoursesPageParams): Promise<CoursesPage> {
  const result = await getCourses({ page: page.toString(), sort });

  return {
    content: result.content,
    hasNext: !result.last,
    page: result.pageable.pageNumber,
    nextPage: result.last ? null : result.pageable.pageNumber + 1,
  };
}
