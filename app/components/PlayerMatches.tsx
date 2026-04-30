import type { MatchData } from "@/app/types"
import { MatchesGrid } from "./MatchesGrid"

type PlayerMatchesProps = {
  matches: MatchData[]
  playerProfile: string
}

export function PlayerMatches({ matches, playerProfile }: PlayerMatchesProps) {
  const playerMatches = matches.filter(
    (match) =>
      match.teamA.some((p) => p.profile === playerProfile) ||
      match.teamB.some((p) => p.profile === playerProfile),
  )

  return <MatchesGrid matches={playerMatches} title="Partidas" />
}
