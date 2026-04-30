"use client"

import Link from "next/link"
import { useState } from "react"
import type { Player } from "@/app/types"

type LeaderboardProps = {
  players: Player[]
}

export function Leaderboard({ players }: LeaderboardProps) {
  const [hideNewPlayers, setHideNewPlayers] = useState(true)

  const byRating = [...players].sort((a, b) => b.rating - a.rating)

  const filteredPlayers = hideNewPlayers
    ? byRating.filter((p) => p.matches >= 5)
    : byRating

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Ranking</h2>

      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => setHideNewPlayers(!hideNewPlayers)}
          className="px-3 py-1 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-sm font-medium transition-colors"
        >
          {hideNewPlayers ? "Mostrar" : "Ocultar"} jogadores com menos de 5
          partidas
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/70">
              <th className="px-2 sm:px-4 py-2 text-left">Nome</th>
              <th className="px-2 sm:px-4 py-2 text-right">Rating</th>
              <th className="hidden sm:table-cell px-2 sm:px-4 py-2 text-right">
                Partidas
              </th>
              <th className="hidden sm:table-cell px-4 py-2 text-right">
                Win Rate
              </th>
              <th className="hidden sm:table-cell px-4 py-2 text-right">K/D</th>
            </tr>
          </thead>

          <tbody>
            {filteredPlayers.map((p) => (
              <tr
                key={p.profile}
                className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <td className="px-2 sm:px-4 py-3 truncate max-w-[140px] sm:max-w-none">
                  <Link
                    href={`/player/${p.profile}`}
                    className="text-blue-600 hover:underline font-medium dark:text-blue-400"
                  >
                    {p.name}
                  </Link>

                  <div className="sm:hidden text-xs text-muted mt-1">
                    {p.matches} partidas • {(p.winRate * 100).toFixed(0)}% • K/D{" "}
                    {p.kd.toFixed(2)}
                  </div>
                </td>

                <td className="px-2 sm:px-4 py-3 text-right">
                  {p.rating.toFixed(0)}
                </td>

                <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-right">
                  {p.matches}
                </td>

                <td className="hidden sm:table-cell px-4 py-3 text-right">
                  {(p.winRate * 100).toFixed(1)}%
                </td>

                <td className="hidden sm:table-cell px-4 py-3 text-right">
                  {p.kd.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
