import { Button } from "@/components/ui/button";
import { Content } from "../../types";

export default function ContentCardFooterButton({
  content,
}: {
  content: Content;
}) {
  const check = false;
  return (
    <Button className="w-full cursor-pointer" disabled={!!content.isFull}>
      {check ? "취소" : "신청하기"}
    </Button>
  );
}
