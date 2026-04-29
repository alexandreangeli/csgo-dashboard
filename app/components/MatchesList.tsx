import { Team } from "./Team"

type MatchData = {
  matchTime: string
  scoreA: string
  scoreB: string
  teamA: any[]
  teamB: any[]
}

type MatchesListProps = {
  matches: MatchData[]
}

export function MatchesList({ matches }: MatchesListProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Matches</h2>
      <div className="grid gap-4">
        {matches.map((match) => (
          <article key={match.matchTime} className="p-4">
            <div className="flex justify-between mb-3">
              <strong>{match.matchTime}</strong>
              <div>
                {match.scoreA}:{match.scoreB}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Team title="Team A" players={match.teamA} />
              <Team title="Team B" players={match.teamB} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
