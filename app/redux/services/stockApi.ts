import { IStockSector } from "@/app/interfaces/stock-sector"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const stockApi = createApi({
  reducerPath: "stockApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getStockSectors: builder.query<IStockSector[], void>({
      query: () => {
        return {
          url: "stock-sectors",
        }
      },
    }),
  }),
})

export const { useGetStockSectorsQuery } = stockApi
