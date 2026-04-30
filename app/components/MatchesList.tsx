import { MatchesGrid } from "./MatchesGrid"
import type { MatchData } from "@/app/types"

type MatchesListProps = {
  matches: MatchData[]
}

export function MatchesList({ matches }: MatchesListProps) {
  return <MatchesGrid matches={matches} title="Partidas" />
}
