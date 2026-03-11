import { CourseSummary } from "@/app/_block/actions/api/get-courses/type";
import { create } from "zustand";

type CourseId = CourseSummary["id"];

type SelectedContentStore = {
  selectedContent: Map<CourseId, CourseSummary>;
  reset: () => void;
  addSelectedContent: (content: CourseSummary) => void;
  removeSelectedContent: (id: CourseId) => void;
  isSelectedContent: (id: CourseId) => boolean;
  getLength: () => number;
  getSelectedContent: () => CourseSummary[];
  getSelectedContentIds: () => CourseId[];
};

const useSelectedContent = create<SelectedContentStore>((set, get) => ({
  selectedContent: new Map<CourseId, CourseSummary>(),
  reset: () => set({ selectedContent: new Map<CourseId, CourseSummary>() }),
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
  getLength: () => get().selectedContent.size,
  getSelectedContent: () => Array.from(get().selectedContent.values()),
  getSelectedContentIds: () => Array.from(get().selectedContent.keys()),
}));

export default useSelectedContent;
