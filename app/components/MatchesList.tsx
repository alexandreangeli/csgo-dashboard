import { Team } from "./Team"
import type { MatchData } from "@/app/types"

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
              <div className="flex gap-2 items-center">
                {(() => {
                  const scoreANum = parseInt(match.scoreA)
                  const scoreBNum = parseInt(match.scoreB)
                  const isAWinner = scoreANum > scoreBNum
                  const isBWinner = scoreBNum > scoreANum
                  return (
                    <div className="flex gap-1 font-bold text-lg">
                      <span
                        className={`${
                          isAWinner
                            ? "text-green-600 dark:text-green-400"
                            : isBWinner
                              ? "text-red-600 dark:text-red-400"
                              : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {match.scoreA}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">
                        :
                      </span>
                      <span
                        className={`${
                          isBWinner
                            ? "text-green-600 dark:text-green-400"
                            : isAWinner
                              ? "text-red-600 dark:text-red-400"
                              : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {match.scoreB}
                      </span>
                    </div>
                  )
                })()}
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
