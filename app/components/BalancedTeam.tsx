type BalancedTeamProps = {
  title: string
  players: any[]
  otherTeamTotal?: number
}

export function BalancedTeam({
  title,
  players,
  otherTeamTotal,
}: BalancedTeamProps) {
  const sorted = [...players].sort((a: any, b: any) => b.rating - a.rating)

  const total = sorted.reduce((s: number, p: any) => s + p.rating, 0)
  const isTeamA = title === "Time A"
  const bgColor = isTeamA
    ? "bg-blue-50 dark:bg-blue-950"
    : "bg-red-50 dark:bg-red-950"
  const borderColor = isTeamA
    ? "border-blue-200 dark:border-blue-800"
    : "border-red-200 dark:border-red-800"
  const textColor = isTeamA
    ? "text-blue-700 dark:text-blue-300"
    : "text-red-700 dark:text-red-300"
  const diff = otherTeamTotal ? total - otherTeamTotal : 0
  const diffText = diff > 0 ? `+${diff.toFixed(0)}` : `${diff.toFixed(0)}`
  const diffColor =
    diff > 0 ? "text-green-600" : diff < 0 ? "text-red-600" : "text-gray-500"

  return (
    <div className={`p-4 rounded-lg border ${bgColor} ${borderColor}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-semibold ${textColor}`}>
          {title} ({total.toFixed(0)})
        </h3>
        {otherTeamTotal !== undefined && (
          <span className={`text-xs font-medium ${diffColor}`}>{diffText}</span>
        )}
      </div>

      <ul className="text-sm space-y-1">
        {sorted.map((p: any) => (
          <li key={p.profile} className="text-sm">
            {p.name} ({p.rating.toFixed(0)})
          </li>
        ))}
      </ul>
    </div>
  )
}
