"use client";

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
import { useState } from "react";

export default function PurchaseModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <SubmitButton setIsOpen={setIsOpen} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
