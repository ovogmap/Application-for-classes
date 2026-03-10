export type EnrollCourseParams = {
  accessToken: string;
  courseId: number;
};

export type EnrollCourseResponse = {
  enrollmentId: number;
  courseId: number;
  courseTitle: string;
  instructorName: string;
  userId: number;
  userName: string;
  enrolledAt: string;
  message: string;
};
