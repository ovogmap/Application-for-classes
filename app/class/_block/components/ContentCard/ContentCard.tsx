/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContentCardFooterButton from "./ContentCardFooterButton";
import { Content } from "../../types";
import { Badge } from "@/components/ui/badge";

export default function ContentCard({
  content,
  index,
}: {
  content: Content;
  index: number;
}) {
  return (
    <Card key={index} className="relative w-full pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          {content.isFull ? (
            <Badge variant="destructive">마감</Badge>
          ) : (
            <p className="text-sm text-muted-foreground">
              수강신청 현황: {content.currentStudents}/{content.maxStudents}
            </p>
          )}
        </CardAction>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.instructorName}</CardDescription>
        <CardDescription>{content.price.toLocaleString()}원</CardDescription>
      </CardHeader>
      <CardFooter>
        <ContentCardFooterButton content={content} />
      </CardFooter>
    </Card>
  );
}
