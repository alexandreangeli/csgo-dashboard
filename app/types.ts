export type Row = {
  matchTime: string
  profile: string
  name: string
  team: string
  win: string
  scoreA: string
  scoreB: string
  kills: string
  deaths: string
}

export type Player = {
  name: string
  profile: string
  wins: number
  losses: number
  totalKills: number
  totalDeaths: number
  matches: number
  winRate: number
  kd: number
  rating: number
}

export type TabType = "Balanceador" | "Ranking" | "Partidas"
