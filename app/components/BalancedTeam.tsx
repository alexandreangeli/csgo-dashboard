import type { Player } from "@/app/types"

type BalancedTeamProps = {
  title: string
  players: Player[]
  otherTeamTotal?: number
}

export function BalancedTeam({
  title,
  players,
  otherTeamTotal,
}: BalancedTeamProps) {
  const sorted = [...players].sort((a, b) => b.rating - a.rating)

  const total = sorted.reduce((s, p) => s + p.rating, 0)
  const diff = otherTeamTotal ? total - otherTeamTotal : 0
  const diffText = diff > 0 ? `+${diff.toFixed(0)}` : `${diff.toFixed(0)}`
  const diffColor =
    diff > 0
      ? "text-green-600 dark:text-green-400"
      : diff < 0
        ? "text-red-600 dark:text-red-400"
        : "text-slate-500 dark:text-slate-400"

  return (
    <div className={`p-4 rounded-lg border`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-semibold`}>
          {title} ({total.toFixed(0)})
        </h3>
        {otherTeamTotal !== undefined && (
          <span className={`text-xs font-medium ${diffColor}`}>{diffText}</span>
        )}
      </div>

      <ul className="text-sm space-y-1">
        {sorted.map((p) => (
          <li key={p.profile} className="text-sm">
            {p.name} ({p.rating.toFixed(0)})
          </li>
        ))}
      </ul>
    </div>
  )
}
