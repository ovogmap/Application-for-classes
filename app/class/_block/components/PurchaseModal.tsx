import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Content } from "../types";

export default function PurchaseModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-primary text-primary-foreground hover:bg-primary/80"
        >
          신청하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>신청하기</DialogTitle>
        </DialogHeader>
        <p>선택된 강의 수: 0</p>
        <div className="flex flex-col gap-2">
          {ContentList.map((content) => (
            <Item key={content.id} variant="outline">
              <ItemContent>
                <ItemTitle>{content.title}</ItemTitle>
                <ItemDescription>{content.instructorName}</ItemDescription>
                <ItemDescription>
                  {content.price.toLocaleString()}원
                </ItemDescription>
              </ItemContent>
              <ItemActions className="flex flex-col items-end">
                <Button variant="outline">삭제</Button>
              </ItemActions>
            </Item>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button type="submit" disabled={ContentList.length === 0}>
            신청하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
];
