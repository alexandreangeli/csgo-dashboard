import type { MatchData, MatchPlayer, Row } from "@/app/types"
import { normalizeName } from "./playerStats"

export function groupMatches(rows: Row[]): MatchData[] {
  const map: Record<string, MatchData> = {}

  rows.forEach((r) => {
    if (!map[r.matchTime]) {
      map[r.matchTime] = {
        matchTime: r.matchTime,
        scoreA: r.scoreA,
        scoreB: r.scoreB,
        map: r.map || "Unknown",
        teamA: [],
        teamB: [],
      }
    }

    const entry: MatchPlayer = {
      name: r.name,
      profile: normalizeName(r.name),
      kills: Number(r.kills),
      deaths: Number(r.deaths),
      assists: Number(r.assists || 0),
    }

    if (r.team === "A") map[r.matchTime].teamA.push(entry)
    else map[r.matchTime].teamB.push(entry)
  })

  return Object.values(map).sort(
    (a, b) => new Date(b.matchTime).getTime() - new Date(a.matchTime).getTime(),
  )
}
