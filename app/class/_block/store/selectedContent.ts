import { CourseSummary } from "@/app/actions/api/get-courses/type";
import { create } from "zustand";

type CourseId = CourseSummary["id"];

type SelectedContentStore = {
  selectedContent: Map<CourseId, CourseSummary>;
  addSelectedContent: (content: CourseSummary) => void;
  removeSelectedContent: (id: CourseId) => void;
  isSelectedContent: (id: CourseId) => boolean;
  clearSelectedContent: () => void;
  getLength: () => number;
  getSelectedContent: () => CourseSummary[];
};

const useSelectedContent = create<SelectedContentStore>((set, get) => ({
  selectedContent: new Map<CourseId, CourseSummary>(),
  addSelectedContent: (content) =>
    set((state) => {
      const next = new Map(state.selectedContent);
      next.set(content.id, content);
      return { selectedContent: next };
    }),
  removeSelectedContent: (id) =>
    set((state) => {
      const next = new Map(state.selectedContent);
      next.delete(id);
      return { selectedContent: next };
    }),
  isSelectedContent: (id) => get().selectedContent.has(id),
  clearSelectedContent: () =>
    set({ selectedContent: new Map<CourseId, CourseSummary>() }),
  getLength: () => get().selectedContent.size,
  getSelectedContent: () => Array.from(get().selectedContent.values()),
}));

export default useSelectedContent;
