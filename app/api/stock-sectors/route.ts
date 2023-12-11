import { NextResponse } from "next/server"
import puppeteer from "puppeteer"

export async function GET(request: Request) {
  const browser = await puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage()
  await page.goto("https://www.set.or.th/en/market/index/set/overview")

  await page.waitForSelector("table tbody tr")

  // Extract data from the selected query selector
  const tableRows = await page.evaluate(() => {
    const rows = document.querySelectorAll("table tbody tr")
    const rowData: {
      name: string
      detail: string
      type: string
      url: string
      parent: string
      cellData: any[]
    }[] = []

    // Loop through the rows

    rows.forEach((row) => {
      const type = row.hasAttribute("aria-labelledby") ? "child" : "parent"
      const cell = row.querySelector("td")

      const cells = row.querySelectorAll("td")

      // Loop through the cells

      let cellData: any[] = []

      const keys = [
        "symbol",
        "last",
        "change",
        "percentChange",
        "volume",
        "value",
      ]

      const splitCell = cell?.textContent
        ?.trim()
        .replace(/\n/g, "")!
        .split("-")!
      const name = splitCell[0].trim()
      const detail = splitCell[1].trim()

      cells.forEach((cell, index) => {
        cellData.push({
          key: keys[index],
          value: keys[index] === "symbol" ? name : cell?.textContent?.trim(),
        })
      })

      const url =
        type === "parent"
          ? row.querySelector("td > button > div a")?.getAttribute("href")!
          : row.querySelector("td > div a")?.getAttribute("href")!
      const splitUrl = url?.split("/")

      rowData.push({
        name: name,
        detail: detail,
        type: type,
        url: url,
        parent: splitUrl[splitUrl.length - 2]
          ? splitUrl[splitUrl.length - 2].toUpperCase()
          : "",
        cellData: cellData,
      })
    })
    return rowData
  })

  await browser.close()
  console.log(tableRows)
  const groupedData = groupByParent(tableRows)
  return NextResponse.json(groupedData)
}

function groupByParent(data: any) {
  const parentMap: any = {}

  // Group items by parent
  data.forEach((item: any) => {
    if (item.type === "parent") {
      parentMap[item.name] = { ...item, children: [] }
    } else if (item.type === "child" && parentMap[item.parent]) {
      parentMap[item.parent].children.push(item)
    }
  })

  // Filter only the parent items to return
  const groupedData = Object.values(parentMap).filter(
    (item: any) => item.type === "parent"
  )

  return groupedData
}
