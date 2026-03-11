import { create } from "zustand";
import { UserInfo } from "../actions/api/login/type";

interface UserInfoStore {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const useUserInfo = create<UserInfoStore>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
}));
