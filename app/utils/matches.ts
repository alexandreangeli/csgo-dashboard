import type { Row } from "@/app/types"

export function groupMatches(rows: Row[]) {
  const map: Record<string, any> = {}

  rows.forEach((r) => {
    if (!map[r.matchTime]) {
      map[r.matchTime] = {
        matchTime: r.matchTime,
        scoreA: r.scoreA,
        scoreB: r.scoreB,
        teamA: [],
        teamB: [],
      }
    }

    const entry = {
      name: r.name,
      kills: Number(r.kills),
      deaths: Number(r.deaths),
    }

    if (r.team === "A") map[r.matchTime].teamA.push(entry)
    else map[r.matchTime].teamB.push(entry)
  })

  return Object.values(map).sort(
    (a: any, b: any) =>
      new Date(b.matchTime).getTime() - new Date(a.matchTime).getTime(),
  )
}
