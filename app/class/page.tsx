import PurchaseModal from "./_block/components/PurchaseModal/PurchaseModal";
import AddContentModal from "./_block/components/AddContentModal";
import { CourseSort } from "../_block/actions/api/get-courses/type";
import SelectFilter from "./_block/components/SelectFilter";
import ClientContentList from "./_block/components/ClientContentList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ContentListSkeleton from "./_block/components/ContentListSkeleton";

export default async function ClassPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const DEFAULT_SORT: CourseSort = "recent";
  const sort = ((await searchParams).sort as CourseSort) ?? DEFAULT_SORT;

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
            <PurchaseModal />
            <AddContentModal />
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-6">
          <ErrorBoundary
            fallback={
              <p className="text-sm text-red-400">
                강의 목록을 불러오지 못했습니다.
              </p>
            }
          >
            <Suspense fallback={<ContentListSkeleton />}>
              <ClientContentList sort={sort} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
