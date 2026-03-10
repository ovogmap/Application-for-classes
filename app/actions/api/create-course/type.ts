export type CreateCourseParams = {
  title: string;
  description?: string;
  instructorName: string;
  maxStudents: number;
  price: number;
};

export type CreateCourseResponse = {
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
