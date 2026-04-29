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

export type MatchPlayer = {
  name: string
  profile: string
  kills: number
  deaths: number
}

export type MatchData = {
  matchTime: string
  scoreA: string
  scoreB: string
  teamA: MatchPlayer[]
  teamB: MatchPlayer[]
}

export type BalancedTeams = {
  teamA: Player[]
  teamB: Player[]
}

export type TabType = "Balanceador" | "Ranking" | "Partidas"
