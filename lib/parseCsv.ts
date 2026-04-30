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
  assists: string
  map: string
  score: string
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "") // remove non-alphanumeric
}

function displayName(name: string): string {
  const trimmed = name.trim()
  return normalizeName(trimmed) ? trimmed : "Lorenzo"
}

const playerAccountMap: Record<string, string> = {
  Lorenzo: "fait",
  fait: "fait",
}

function getCanonicalName(name: string): string {
  return playerAccountMap[name] || name
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
      if (!row.matchTime || !row.name) return

      const normalizedName = displayName(row.name)
      const canonicalName = getCanonicalName(normalizedName)
      const normalized = normalizeName(canonicalName)

      const key = `${row.matchTime}__${normalized}`

      if (!map.has(key)) {
        row.name = canonicalName
        map.set(key, row)
      }
    })
  })

  return Array.from(map.values())
}
