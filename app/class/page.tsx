/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PurchaseModal from "./_block/components/PurchaseModal";
import ContentCard from "./_block/components/ContentCard/ContentCard";
import { Content } from "./_block/types";

const SORT_OPTIONS = ["recent", "popular", "rate"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

const SORT_LABEL: Record<SortOption, string> = {
  recent: "최신등록 순",
  popular: "신청자 많은 순",
  rate: "신청률 높은 순",
};

function parseSort(sort: string | undefined): SortOption {
  if (!sort) return "recent";
  return SORT_OPTIONS.includes(sort as SortOption)
    ? (sort as SortOption)
    : "recent";
}

async function fetchClassList(sort: SortOption) {
  console.log("class list fetch sort:", sort);
  return [];
}

export default async function ClassPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort: sortParam } = await searchParams;
  const sort = parseSort(sortParam);
  const classList = await fetchClassList(sort);

  return (
    <div className="min-h-screen w-full flex flex-col items-start justify-start gap-6 py-6">
      <h2 className="text-2xl font-bold">강의 신청</h2>
      <div className="w-full flex flex-col items-start justify-start gap-6">
        <div className="w-full flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <h3 className="text-xl font-bold">강의 목록</h3>
            <Select defaultValue={sort}>
              <SelectTrigger className="max-w-48">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>정렬</SelectLabel>
                  <SelectItem value="recent">
                    <Link href="/class?sort=recent">{SORT_LABEL.recent}</Link>
                  </SelectItem>
                  <SelectItem value="popular">
                    <Link href="/class?sort=popular">{SORT_LABEL.popular}</Link>
                  </SelectItem>
                  <SelectItem value="rate">
                    <Link href="/class?sort=rate">{SORT_LABEL.rate}</Link>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-sm text-muted-foreground">선택된 강의 수: 0</p>
            <PurchaseModal />
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-6">
          {ContentList.map((content, index) => (
            <ContentCard key={index} content={content} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ContentList: Content[] = [
  {
    id: 1,
    title: "부동산 투자 기초",
    instructorName: "김투자",
    maxStudents: 30,
    currentStudents: 5,
    availableSeats: 25,
    isFull: false,
    price: 100000,
    createdAt: "2024-01-15T09:00:00",
  },
  {
    id: 2,
    title: "부동산 투자 기초",
    instructorName: "김투자",
    maxStudents: 30,
    currentStudents: 5,
    availableSeats: 25,
    isFull: false,
    price: 100000,
    createdAt: "2024-01-15T09:00:00",
  },
  {
    id: 3,
    title: "부동산 투자 기초",
    instructorName: "김투자",
    maxStudents: 30,
    currentStudents: 5,
    availableSeats: 25,
    isFull: true,
    price: 100000,
    createdAt: "2024-01-15T09:00:00",
  },
  {
    id: 4,
    title: "부동산 투자 기초",
    instructorName: "김투자",
    maxStudents: 30,
    currentStudents: 5,
    availableSeats: 25,
    isFull: false,
    price: 100000,
    createdAt: "2024-01-15T09:00:00",
  },
  {
    id: 5,
    title: "부동산 투자 기초",
    instructorName: "김투자",
    maxStudents: 30,
    currentStudents: 5,
    availableSeats: 25,
    isFull: false,
    price: 100000,
    createdAt: "2024-01-15T09:00:00",
  },
];
