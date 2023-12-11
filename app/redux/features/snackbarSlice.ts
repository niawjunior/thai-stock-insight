import { SnackbarProps } from "@mui/material"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ISnackbarState {
  message: string
  options?: any
}

const initialState: ISnackbarState = {
  message: "",
  options: {},
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    resetSnackbar: () => initialState,
    setSnackbar: (
      state,
      action: PayloadAction<{ message: string; options?: SnackbarProps }>
    ) => {
      state.message = action.payload.message
      state.options = action.payload.options
    },
  },
})

export const { resetSnackbar, setSnackbar } = snackbarSlice.actions
export default snackbarSlice.reducer
