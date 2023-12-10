"use client"
import * as React from "react"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"

interface Props {
  onSubmit: (value: string) => void
}
export default function SearchInputComponent(props: Props) {
  const [search, setSearch] = React.useState("")
  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        props.onSubmit(search)
      }}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "48px",
      }}
    >
      <InputBase
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search stocks..."
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
