import { Kanit } from "next/font/google"
import { createTheme } from "@mui/material/styles"

const kanit = Kanit({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai"],
  display: "swap",
})

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: kanit.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
})

export default theme
