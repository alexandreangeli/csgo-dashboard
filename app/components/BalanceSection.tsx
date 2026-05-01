import { useMemo, useState } from "react"
import type { BalancedTeams, Player } from "@/app/types"
import { BalancedTeam } from "./BalancedTeam"

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
  const [copied, setCopied] = useState(false)

  const message = useMemo(() => {
    if (!balanced) return ""

    const formatTeam = (title: string, players: Player[]) => {
      const sorted = [...players].sort((a, b) => b.rating - a.rating)
      const total = sorted.reduce((s, p) => s + p.rating, 0)

      return [
        title,
        ...sorted.map(
          (p, i) => `${i + 1}. ${p.name} (${p.rating.toFixed(0)})`,
        ),
        `Total: ${total.toFixed(0)}`,
      ].join("\n")
    }

    const totalA = balanced.teamA.reduce((s, p) => s + p.rating, 0)
    const totalB = balanced.teamB.reduce((s, p) => s + p.rating, 0)
    const diff = Math.abs(totalA - totalB)

    return [
      "COMPOSIÇÃO DOS TIMES",
      "--------------------------------",
      "",
      formatTeam("Time A", balanced.teamA),
      "",
      formatTeam("Time B", balanced.teamB),
      "",
      "--------------------------------",
      `Diferença de força: ${diff.toFixed(0)}`,
    ].join("\n")
  }, [balanced])

  const handleCopy = async () => {
    if (!message) return

    await navigator.clipboard.writeText(message)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        Balancear Times (10 jogadores)
      </h2>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <p className="text-sm text-muted">
            Selecionados: {selected.length} / 10
          </p>
          <p className="text-sm font-medium">
            {Math.round((selected.length / 10) * 100)}%
          </p>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(selected.length / 10) * 100}%` }}
          />
        </div>
      </div>

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
                  : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              }`}
            >
              {p.name} ({p.rating.toFixed(0)})
            </button>
          )
        })}
      </div>

      {balanced && (
        <>
          <div className="mb-6">
            <button
              onClick={handleCopy}
              className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-md ${
                copied
                  ? "bg-emerald-500"
                  : "bg-slate-800 hover:bg-slate-900 active:scale-95"
              }`}
            >
              {copied ? "Copiado com sucesso" : "Copiar composição dos times"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <BalancedTeam
              title="Time A"
              players={balanced.teamA}
              otherTeamTotal={balanced.teamB.reduce((s, p) => s + p.rating, 0)}
            />
            <BalancedTeam
              title="Time B"
              players={balanced.teamB}
              otherTeamTotal={balanced.teamA.reduce((s, p) => s + p.rating, 0)}
            />
          </div>
        </>
      )}
    </section>
  )
}
