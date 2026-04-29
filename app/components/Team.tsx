type TeamProps = {
  title: string
  players: any[]
}

export function Team({ title, players }: TeamProps) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">{title}</h4>

      <table className="border-collapse">
        <thead>
          <tr>
            <th className="text-left px-3 py-1">Jogador</th>
            <th className="text-left px-3 py-1">K</th>
            <th className="text-left px-3 py-1">D</th>
            <th className="text-left px-3 py-1">K/D</th>
          </tr>
        </thead>

        <tbody>
          {players.map((p: any, i: number) => (
            <tr key={i}>
              <td className="px-3 py-1">{p.name}</td>
              <td className="px-3 py-1">{p.kills}</td>
              <td className="px-3 py-1">{p.deaths}</td>
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
