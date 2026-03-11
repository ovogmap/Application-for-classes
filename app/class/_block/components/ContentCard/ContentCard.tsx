/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContentCardWrapper from "./ContentCardWrapper";
import { CourseSummary } from "@/app/_block/actions/api/get-courses/type";
import ContentCardstudentsStatus from "./ContentCardstudentsStatus";

export default function ContentCard({
  content,
  index,
}: {
  content: CourseSummary;
  index: number;
}) {
  return (
    <ContentCardWrapper content={content}>
      <Card key={index} className="relative w-full pt-0">
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardHeader>
          <CardAction>
            <ContentCardstudentsStatus content={content} />
          </CardAction>
          <CardTitle>{content.title}</CardTitle>
          <CardDescription>{content.instructorName}</CardDescription>
          <CardDescription>{content.price.toLocaleString()}원</CardDescription>
        </CardHeader>
      </Card>
    </ContentCardWrapper>
  );
}
