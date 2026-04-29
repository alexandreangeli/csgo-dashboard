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
  const formatLocalTime = (utcString: string) => {
    const date = new Date(utcString)

    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date)
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Partidas</h2>
      <div className="grid gap-4">
        {matches.map((match) => (
          <article key={match.matchTime} className="p-4">
            <div className="flex justify-between mb-3">
              <strong>{formatLocalTime(match.matchTime)}</strong>
              <div>
                {match.scoreA}:{match.scoreB}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Team title="Time A" players={match.teamA} />
              <Team title="Time B" players={match.teamB} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
