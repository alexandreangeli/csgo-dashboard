type BalancedTeamProps = {
  title: string
  players: any[]
}

export function BalancedTeam({ title, players }: BalancedTeamProps) {
  const sorted = [...players].sort((a: any, b: any) => b.rating - a.rating)

  const total = sorted.reduce((s: number, p: any) => s + p.rating, 0)

  return (
    <div className="p-4 rounded-lg border">
      <h3 className="font-semibold mb-2">
        {title} ({total.toFixed(0)})
      </h3>

      <ul className="text-sm space-y-1">
        {sorted.map((p: any) => (
          <li key={p.profile}>
            {p.name} ({p.rating.toFixed(0)})
          </li>
        ))}
      </ul>
    </div>
  )
}
