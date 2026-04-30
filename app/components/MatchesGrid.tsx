import { Team } from "./Team"
import type { MatchData } from "@/app/types"

type MatchesGridProps = {
  matches: MatchData[]
  title?: string
}

export function MatchesGrid({ matches, title = "Partidas" }: MatchesGridProps) {
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

  if (matches.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Nenhuma partida encontrada
        </p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-4">
        {matches.map((match) => (
          <article
            key={match.matchTime}
            className="p-4 rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex justify-between mb-3 items-center">
              <div>
                <strong className="block">
                  {formatLocalTime(match.matchTime)}
                </strong>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {match.map}
                </span>
              </div>
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
