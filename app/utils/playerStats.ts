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
  const KD_BAYESIAN_PRIOR = 1.0
  const KD_BAYESIAN_WEIGHT = 5

  const WR_BAYESIAN_PRIOR = 0.5
  const WR_BAYESIAN_WEIGHT = 5

  const KD_WEIGHT_RATING = 0.7
  const WR_WEIGHT = 0.3

  let players = Object.values(map).map((p: any) => {
    const winRate = p.matches > 0 ? p.wins / p.matches : 0

    const kd =
      (p.totalKills + KD_BAYESIAN_PRIOR * KD_BAYESIAN_WEIGHT) /
      (p.totalDeaths + KD_BAYESIAN_WEIGHT)

    return { ...p, winRate, kd }
  })

  const maxKD = Math.max(...players.map((p) => p.kd), 1)
  const kdCap = maxKD

  players.forEach((p: any) => {
    const smoothedWR =
      (p.wins + WR_BAYESIAN_PRIOR * WR_BAYESIAN_WEIGHT) /
      (p.matches + WR_BAYESIAN_WEIGHT)

    let perf = 0

    if (mode === "kd") {
      const cappedKD = Math.min(p.kd, kdCap)
      perf = cappedKD / kdCap
    }

    const rawRating = KD_WEIGHT_RATING * perf + WR_WEIGHT * smoothedWR
    p.rating = Math.max(0, Math.min(1000, rawRating * 1000))
  })

  return players
}
