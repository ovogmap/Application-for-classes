import PurchaseModal from "./_block/components/PurchaseModal/PurchaseModal";
import ContentCard from "./_block/components/ContentCard/ContentCard";
import AddContentModal from "./_block/components/AddContentModal";
import { CourseSort } from "../actions/api/get-courses/type";
import { getCourses } from "../actions/api/get-courses";
import SelectFilter from "./_block/components/SelectFilter";
import SelectedContentLength from "./_block/components/SelectedContentLength";

export default async function ClassPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const sort = (await searchParams).sort as CourseSort;
  const page = (await searchParams).page as string;

  const contentListData = await getCourses({ page, sort });
  const contentList = contentListData.content;

  console.log("contentListData:", contentListData);
  return (
    <div className="min-h-screen w-full flex flex-col items-start justify-start gap-6 py-6">
      <h2 className="text-2xl font-bold">강의 신청</h2>
      <div className="w-full flex flex-col items-start justify-start gap-6">
        <div className="w-full flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <h3 className="text-xl font-bold">강의 목록</h3>
            <SelectFilter sort={sort} />
          </div>
          <div className="flex items-center gap-2">
            <SelectedContentLength />
            <PurchaseModal />
            <AddContentModal />
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-6">
          {contentList.length > 0 ? (
            <>
              {contentList.map((content, index) => (
                <ContentCard key={index} content={content} index={index} />
              ))}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">강의가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
