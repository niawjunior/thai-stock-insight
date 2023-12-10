"use client"
import SearchInput from "./Search"

export default function HomeComponent() {
  return (
    <SearchInput
      onSubmit={(value: string) => {
        console.log(value)
      }}
    />
  )
}
