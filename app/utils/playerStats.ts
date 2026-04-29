import type { Row, Player } from "@/app/types"

export function normalizeName(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
}

export function buildPlayers(rows: Row[], mode: "kd") {
  const map: Record<string, any> = {}

  rows.forEach((r) => {
    const playerId = normalizeName(r.name)

    if (!map[playerId]) {
      map[playerId] = {
        name: r.name,
        profile: playerId,
        wins: 0,
        losses: 0,
        totalKills: 0,
        totalDeaths: 0,
        matches: 0,
      }
    }

    const p = map[playerId]

    if (Number(r.win)) p.wins++
    else p.losses++

    p.totalKills += Number(r.kills)
    p.totalDeaths += Number(r.deaths)
    p.matches++
  })

  let players = Object.values(map).map((p: any) => {
    const winRate = p.matches > 0 ? p.wins / p.matches : 0
    const kd = p.totalDeaths > 0 ? p.totalKills / p.totalDeaths : p.totalKills

    return { ...p, winRate, kd }
  })

  const maxKD = Math.max(...players.map((p) => p.kd), 1)
  const kdCap = 0.9 * maxKD

  const PRIOR_WR = 0.5
  const PRIOR_WEIGHT = 10
  const KD_WEIGHT = 0.7
  const WIN_WEIGHT = 0.3

  players.forEach((p: any) => {
    const smoothedWR =
      (p.wins + PRIOR_WR * PRIOR_WEIGHT) / (p.matches + PRIOR_WEIGHT)

    let perf = 0

    if (mode === "kd") {
      const cappedKD = Math.min(p.kd, kdCap)
      perf = cappedKD / kdCap
    }

    const rawRating = KD_WEIGHT * perf + WIN_WEIGHT * smoothedWR
    p.rating = Math.max(0, Math.min(1000, rawRating * 1000))
  })

  return players
}
