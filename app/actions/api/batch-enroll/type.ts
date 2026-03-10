export type BatchEnrollParams = {
  accessToken: string;
  courseIds: number[];
};

export type BatchEnrollSuccessItem = {
  enrollmentId: number;
  courseId: number;
  courseTitle: string;
};

export type BatchEnrollFailedItem = {
  courseId: number;
  reason: string;
};

export type BatchEnrollResponse = {
  success: BatchEnrollSuccessItem[];
  failed: BatchEnrollFailedItem[];
};
