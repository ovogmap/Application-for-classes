"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseSort } from "@/app/_block/actions/api/get-courses/type";
import { useRouter, useSearchParams } from "next/navigation";

const SORT_LABEL: Record<CourseSort, string> = {
  recent: "최신등록 순",
  popular: "신청자 많은 순",
  rate: "신청률 높은 순",
};

export default function SelectFilter({ sort }: { sort: CourseSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSortChange = (nextSort: CourseSort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", nextSort);
    router.push(`/class?${params.toString()}`, { scroll: false });
  };
  return (
    <Select defaultValue={sort} onValueChange={handleSortChange}>
      <SelectTrigger className="max-w-48">
        <SelectValue placeholder="정렬" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>정렬</SelectLabel>
          <SelectItem value="recent">{SORT_LABEL.recent}</SelectItem>
          <SelectItem value="popular">{SORT_LABEL.popular}</SelectItem>
          <SelectItem value="rate">{SORT_LABEL.rate}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
