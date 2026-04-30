"use client"

import Link from "next/link"
import { useState } from "react"

type HeadToHeadStat = {
  opponentProfile: string
  opponentName: string
  matches: number
  wins: number
  losses: number
  winRate: number
}

type WinRateSectionProps = {
  title: string
  stats: HeadToHeadStat[]
  emptyMessage: string
}

export function WinRateSection({
  title,
  stats,
  emptyMessage,
}: WinRateSectionProps) {
  const [hideNewPlayers, setHideNewPlayers] = useState(true)

  const filteredStats = hideNewPlayers
    ? stats.filter((s) => s.matches >= 5)
    : stats

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {stats.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">{emptyMessage}</p>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={() => setHideNewPlayers(!hideNewPlayers)}
              className="px-3 py-1 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-sm font-medium transition-colors"
            >
              {hideNewPlayers ? "Mostrar" : "Ocultar"} jogadores com menos de 5
              partidas
            </button>
          </div>
          {filteredStats.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">
              Nenhum jogador com 5 ou mais partidas
            </p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800/70">
                  <tr>
                    <th className="px-4 py-3 text-left">Jogador</th>
                    <th className="px-4 py-3 text-right">Partidas</th>
                    <th className="px-4 py-3 text-right">Vitórias</th>
                    <th className="px-4 py-3 text-right">Derrotas</th>
                    <th className="px-4 py-3 text-right">Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStats
                    .sort((a, b) => b.winRate - a.winRate)
                    .map((stat) => (
                      <tr
                        key={stat.opponentProfile}
                        className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/60"
                      >
                        <td className="px-4 py-3">
                          <Link
                            href={`/player/${stat.opponentProfile}`}
                            className="text-blue-600 hover:underline dark:text-blue-400"
                          >
                            {stat.opponentName}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">
                          {stat.matches}
                        </td>
                        <td className="px-4 py-3 text-right text-green-600 font-medium dark:text-green-400">
                          {stat.wins}
                        </td>
                        <td className="px-4 py-3 text-right text-red-600 font-medium dark:text-red-400">
                          {stat.losses}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span
                            className={`px-3 py-1 rounded font-medium ${
                              stat.winRate >= 0.5
                                ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                            }`}
                          >
                            {(stat.winRate * 100).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}
