export type GetCourseDetailParams = {
  courseId: number;
};

export type GetCourseDetailResponse = {
  id: number;
  title: string;
  description: string;
  instructorName: string;
  maxStudents: number;
  currentStudents: number;
  availableSeats: number;
  isFull: boolean;
  price: number;
  createdAt: string;
};
