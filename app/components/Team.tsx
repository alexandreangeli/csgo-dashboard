import Link from "next/link"
import type { MatchPlayer } from "@/app/types"

type TeamProps = {
  title: string
  players: MatchPlayer[]
}

export function Team({ title, players }: TeamProps) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">{title}</h4>

      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="text-left px-3 py-1">Jogador</th>
            <th className="text-left px-3 py-1">K</th>
            <th className="text-left px-3 py-1">D</th>
            <th className="text-left px-3 py-1">A</th>
            <th className="text-left px-3 py-1">K/D</th>
          </tr>
        </thead>

        <tbody>
          {players.map((p, i) => (
            <tr
              key={i}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              <td className="px-3 py-1">
                <Link
                  href={`/player/${p.profile}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {p.name}
                </Link>
              </td>
              <td className="px-3 py-1">{p.kills}</td>
              <td className="px-3 py-1">{p.deaths}</td>
              <td className="px-3 py-1">{p.assists}</td>
              <td className="px-3 py-1">
                {(p.kills / (p.deaths || 1)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
