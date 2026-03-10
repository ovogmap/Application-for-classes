export type CourseSort = "recent" | "popular" | "rate";

export type GetCoursesParams = {
  page?: number;
  size?: number;
  sort?: CourseSort;
};

export type CourseSummary = {
  id: number;
  title: string;
  instructorName: string;
  maxStudents: number;
  currentStudents: number;
  availableSeats: number;
  isFull: boolean;
  price: number;
  createdAt: string;
};

export type CoursesPageable = {
  pageNumber: number;
  pageSize: number;
};

export type GetCoursesResponse = {
  content: CourseSummary[];
  pageable: CoursesPageable;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};
