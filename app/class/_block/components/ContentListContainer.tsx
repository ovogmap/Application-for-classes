import { getCourses } from "@/app/_block/actions/api/get-courses";
import { CourseSort } from "@/app/_block/actions/api/get-courses/type";
import ClientContentList from "./ClientContentList";

export default async function ContentListContainer({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const sort = (await searchParams).sort as CourseSort;
  const page = (await searchParams).page as string;

  const contentListData = await getCourses({ page, sort });
  const contentList = contentListData.content;
  const hasNext = !contentListData.last;
  return (
    <>
      {contentList.length > 0 ? (
        <ClientContentList
          listData={contentList}
          hasNext={hasNext}
          page={page}
        />
      ) : (
        <p className="text-sm text-muted-foreground">강의가 없습니다.</p>
      )}
    </>
  );
}
