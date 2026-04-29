import type { Row } from "@/app/types"
import { normalizeName } from "./playerStats"

export type HeadToHeadStats = {
  opponentName: string
  opponentProfile: string
  wins: number
  losses: number
  totalKills: number
  totalDeaths: number
  winRate: number
  kd: number
  matches: number
}

export type HeadToHeadResult = {
  against: HeadToHeadStats[]
  with: HeadToHeadStats[]
}

export function calculateHeadToHeadStats(
  playerProfile: string,
  rows: Row[],
): HeadToHeadResult {
  const againstStats: Record<string, HeadToHeadStats> = {}
  const withStats: Record<string, HeadToHeadStats> = {}

  // Agrupar todas as rows por matchTime
  const matchesMap: Record<string, Row[]> = {}
  rows.forEach((row) => {
    if (!matchesMap[row.matchTime]) {
      matchesMap[row.matchTime] = []
    }
    matchesMap[row.matchTime].push(row)
  })

  const countedAgainst: Set<string> = new Set()
  const countedWith: Set<string> = new Set()

  // Para cada partida, verificar quem o player enfrentou e com quem jogou
  Object.values(matchesMap).forEach((matchRows) => {
    const playerRow = matchRows.find(
      (r) => normalizeName(r.name) === playerProfile,
    )

    if (!playerRow) return

    const playerTeam = playerRow.team
    const matchKey = playerRow.matchTime

    // Para cada outro jogador na partida
    matchRows.forEach((otherRow) => {
      if (normalizeName(otherRow.name) === playerProfile) return

      const otherProfile = normalizeName(otherRow.name)
      const isAgainst = otherRow.team !== playerTeam

      if (isAgainst) {
        // Adversário
        const uniqueKey = `${matchKey}:${otherProfile}`
        if (countedAgainst.has(uniqueKey)) return
        countedAgainst.add(uniqueKey)

        if (!againstStats[otherProfile]) {
          againstStats[otherProfile] = {
            opponentName: otherRow.name,
            opponentProfile: otherProfile,
            wins: 0,
            losses: 0,
            totalKills: 0,
            totalDeaths: 0,
            winRate: 0,
            kd: 0,
            matches: 0,
          }
        }

        if (Number(playerRow.win)) {
          againstStats[otherProfile].wins++
        } else {
          againstStats[otherProfile].losses++
        }

        againstStats[otherProfile].totalKills += Number(playerRow.kills)
        againstStats[otherProfile].totalDeaths += Number(playerRow.deaths)
        againstStats[otherProfile].matches++
      } else {
        // Companheiro de time
        const uniqueKey = `${matchKey}:${otherProfile}`
        if (countedWith.has(uniqueKey)) return
        countedWith.add(uniqueKey)

        if (!withStats[otherProfile]) {
          withStats[otherProfile] = {
            opponentName: otherRow.name,
            opponentProfile: otherProfile,
            wins: 0,
            losses: 0,
            totalKills: 0,
            totalDeaths: 0,
            winRate: 0,
            kd: 0,
            matches: 0,
          }
        }

        if (Number(playerRow.win)) {
          withStats[otherProfile].wins++
        } else {
          withStats[otherProfile].losses++
        }

        withStats[otherProfile].totalKills += Number(playerRow.kills)
        withStats[otherProfile].totalDeaths += Number(playerRow.deaths)
        withStats[otherProfile].matches++
      }
    })
  })

  // Calcular win rate e K/D para ambas as listas
  const calculateStats = (stats: Record<string, HeadToHeadStats>) => {
    Object.values(stats).forEach((stat) => {
      stat.winRate = stat.matches > 0 ? stat.wins / stat.matches : 0
      stat.kd =
        stat.totalDeaths > 0
          ? stat.totalKills / stat.totalDeaths
          : stat.totalKills
    })
  }

  calculateStats(againstStats)
  calculateStats(withStats)

  return {
    against: Object.values(againstStats).sort((a, b) => b.matches - a.matches),
    with: Object.values(withStats).sort((a, b) => b.matches - a.matches),
  }
}
