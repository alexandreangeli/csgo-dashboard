import fs from "fs"
import path from "path"
import Papa from "papaparse"

export type MatchRow = {
  matchTime: string
  profile: string
  name: string
  team: string
  win: string
  scoreA: string
  scoreB: string
  kills: string
  deaths: string
  score: string
}

export function loadAllCSVs(folderName: string): MatchRow[] {
  const folderPath = path.join(process.cwd(), "public", folderName)

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".csv"))

  const map = new Map<string, MatchRow>()

  files.forEach((fileName) => {
    const filePath = path.join(folderPath, fileName)
    const fileContent = fs.readFileSync(filePath, "utf8")

    const parsed = Papa.parse<MatchRow>(fileContent, {
      header: true,
      skipEmptyLines: true,
    })

    parsed.data.forEach((row) => {
      if (!row.matchTime || !row.profile) return

      const key = `${row.matchTime}__${row.profile}`

      if (!map.has(key)) {
        map.set(key, row)
      }
    })
  })

  return Array.from(map.values())
}
