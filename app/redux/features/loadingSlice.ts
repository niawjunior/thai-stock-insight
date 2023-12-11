import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
}

export const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    reset: () => initialState,
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return { state, isLoading: action.payload }
    },
  },
})

export const { setIsLoading, reset } = loading.actions
export default loading.reducer
