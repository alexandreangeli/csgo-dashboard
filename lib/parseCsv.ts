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

export function loadCSV(fileName: string): MatchRow[] {
  const filePath = path.join(process.cwd(), "public", fileName)
  const file = fs.readFileSync(filePath, "utf8")

  const parsed = Papa.parse<MatchRow>(file, {
    header: true,
    skipEmptyLines: true,
  })

  return parsed.data
}
