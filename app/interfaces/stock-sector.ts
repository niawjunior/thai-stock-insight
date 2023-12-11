interface Child {
  name: string
  detail: string
  type: "child"
  url: string
  parent: string
  cellData: {
    key: string
    value: string
  }[]
}

export type IStockSector = {
  name: string
  detail: string
  type: "parent" | "child"
  url: string
  parent: string
  children: Child[]
  cellData: {
    key: string
    value: string
  }[]
}
