import { Box } from "@mui/material"
import SearchInput from "./components/Search"
import HomeComponent from "./components/Home"

export default function HomePage() {
  return (
    <Box sx={{ height: "60vh", display: "flex", justifyContent: "center" }}>
      <HomeComponent />
    </Box>
  )
}
