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
  assists: string
  map: string
}

export type Player = {
  name: string
  profile: string
  wins: number
  losses: number
  totalKills: number
  totalDeaths: number
  totalAssists: number
  matches: number
  winRate: number
  kd: number
  kda: number
  rating: number
}

export type MatchPlayer = {
  name: string
  profile: string
  kills: number
  deaths: number
  assists: number
}

export type MatchData = {
  matchTime: string
  scoreA: string
  scoreB: string
  map: string
  teamA: MatchPlayer[]
  teamB: MatchPlayer[]
}

export type BalancedTeams = {
  teamA: Player[]
  teamB: Player[]
}

export type TabType = "Balanceador" | "Ranking" | "Partidas"
