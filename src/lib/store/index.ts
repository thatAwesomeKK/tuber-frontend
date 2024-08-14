import { create } from "zustand";
import { User } from "../../../typings";

type UserStore = {
  user: User | null;
  // loading: Boolean;
  setUser: (user: User) => void;
  // setLoading: (loadState: Boolean) => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
