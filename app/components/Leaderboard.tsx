import Link from "next/link"
import type { Player } from "@/app/types"

type LeaderboardProps = {
  players: Player[]
}

export function Leaderboard({ players }: LeaderboardProps) {
  const byRating = [...players].sort((a, b) => b.rating - a.rating)

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Ranking</h2>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/70">
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-right">Rating</th>
              <th className="px-4 py-2 text-right">Partidas</th>
              <th className="px-4 py-2 text-right">Win Rate</th>
              <th className="px-4 py-2 text-right">K/D</th>
            </tr>
          </thead>
          <tbody>
            {byRating.map((p) => (
              <tr
                key={p.profile}
                className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/player/${p.profile}`}
                    className="text-blue-600 hover:underline font-medium dark:text-blue-400"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right">{p.rating.toFixed(0)}</td>
                <td className="px-4 py-3 text-right">{p.matches}</td>
                <td className="px-4 py-3 text-right">
                  {(p.winRate * 100).toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right">{p.kd.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
