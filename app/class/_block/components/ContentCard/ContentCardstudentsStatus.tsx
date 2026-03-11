import { CourseSummary } from "@/app/_block/actions/api/get-courses/type";
import { Badge } from "@/components/ui/badge";

export default function ContentCardstudentsStatus({
  content,
}: {
  content: CourseSummary;
}) {
  return (
    <>
      {content.isFull ? (
        <Badge variant="destructive">마감</Badge>
      ) : (
        <p className="text-sm text-muted-foreground">
          수강 인원: {content.currentStudents}/{content.maxStudents}
        </p>
      )}
    </>
  );
}
