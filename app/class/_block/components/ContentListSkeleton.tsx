/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContentListSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </>
  );
}

const CardSkeleton = () => {
  return (
    <Card className="relative w-full pt-0">
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Skeleton className="h-4 w-8" />
        </CardAction>
        <CardTitle>
          <Skeleton className="h-4 w-20" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-16 " />
        </CardDescription>
        <CardDescription>
          <Skeleton className="h-4 w-28" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
