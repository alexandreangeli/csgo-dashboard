import type { Player } from "@/app/types"

type LeaderboardProps = {
  players: Player[]
}

export function Leaderboard({ players }: LeaderboardProps) {
  const byRating = [...players].sort((a, b) => b.rating - a.rating)

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Leaderboard</h2>
      <div className="overflow-hidden rounded-lg border">
        <table>
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-right">Rating</th>
              <th className="px-4 py-2 text-right">Matches</th>
              <th className="px-4 py-2 text-right">Win Rate</th>
              <th className="px-4 py-2 text-right">K/D</th>
            </tr>
          </thead>
          <tbody>
            {byRating.map((p) => (
              <tr key={p.profile}>
                <td className="px-4 py-3">{p.name}</td>
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
