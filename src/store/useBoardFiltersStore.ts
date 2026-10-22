import { create } from 'zustand'

interface BoardFiltersState {
  hideDone: boolean
  toggleHideDone: () => void
}

export const useBoardFiltersStore = create<BoardFiltersState>((set) => ({
  hideDone: false,
  toggleHideDone: () => set((state) => ({ hideDone: !state.hideDone })),
}))
