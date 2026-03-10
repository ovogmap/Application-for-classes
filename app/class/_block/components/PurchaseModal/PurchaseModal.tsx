import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SelectedContentLength from "../SelectedContentLength";
import SelectedContentList from "./SelectedContentList";
import TriggerButton from "./TriggerButton";
import SubmitButton from "./SubmitButton";

export default function PurchaseModal() {
  return (
    <Dialog>
      <TriggerButton />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>신청하기</DialogTitle>
        </DialogHeader>
        <SelectedContentLength />
        <SelectedContentList />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <SubmitButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
