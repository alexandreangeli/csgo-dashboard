import type { Player } from "@/app/types"
import { BalancedTeam } from "./BalancedTeam"

type BalancedTeams = {
  teamA: Player[]
  teamB: Player[]
}

type BalanceSectionProps = {
  byRating: Player[]
  selected: string[]
  onTogglePlayer: (profile: string) => void
  balanced: BalancedTeams | null
}

export function BalanceSection({
  byRating,
  selected,
  onTogglePlayer,
  balanced,
}: BalanceSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        Balancear Times (10 jogadores)
      </h2>

      <p className="text-sm text-muted mb-4">
        Selecionados: {selected.length} / 10
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
        {byRating.map((p) => {
          const isSelected = selected.includes(p.profile)

          return (
            <button
              key={p.profile}
              onClick={() => onTogglePlayer(p.profile)}
              className={`p-2 border rounded text-left text-sm ${
                isSelected
                  ? "bg-orange-600 text-white dark:bg-orange-400 dark:text-black"
                  : ""
              }`}
            >
              {p.name} ({p.rating.toFixed(0)})
            </button>
          )
        })}
      </div>

      {balanced && (
        <div className="grid md:grid-cols-2 gap-6">
          <BalancedTeam title="Time A" players={balanced.teamA} />
          <BalancedTeam title="Time B" players={balanced.teamB} />
        </div>
      )}
    </section>
  )
}
