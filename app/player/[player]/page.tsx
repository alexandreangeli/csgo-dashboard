import Link from "next/link"
import { loadAllCSVs } from "@/lib/parseCsv"
import { buildPlayers } from "@/app/utils/playerStats"
import { calculateHeadToHeadStats } from "@/app/utils/playerHeadToHead"
import { groupMatches } from "@/app/utils/matches"
import { BackButton } from "@/app/components/BackButton"
import { WinRateSection } from "@/app/components/WinRateSection"
import { PlayerMatches } from "@/app/components/PlayerMatches"

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ player: string }>
}) {
  const { player: playerProfile } = await params
  const rows = loadAllCSVs("matches")
  const players = buildPlayers(rows, "kd")
  const player = players.find((p) => p.profile === playerProfile)

  const headToHead = calculateHeadToHeadStats(playerProfile, rows)
  const matches = groupMatches(rows)

  if (!player) {
    return (
      <main className="max-w-6xl mx-auto p-6 font-sans">
        <div className="mb-4">
          <BackButton />
        </div>
        <p className="text-center text-slate-500 dark:text-slate-400">
          Jogador não encontrado
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto p-6 font-sans">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6">{player.name}</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 dark:border-blue-900/70 dark:bg-blue-950/40">
            <div className="text-sm text-slate-600 mb-1 dark:text-slate-400">
              Rating
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {player.rating.toFixed(0)}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100 dark:border-green-900/70 dark:bg-green-950/40">
            <div className="text-sm text-slate-600 mb-1 dark:text-slate-400">
              Win Rate
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {(player.winRate * 100).toFixed(1)}%
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 dark:border-purple-900/70 dark:bg-purple-950/40">
            <div className="text-sm text-slate-600 mb-1 dark:text-slate-400">
              K/D
            </div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {player.kd.toFixed(2)}
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 dark:border-orange-900/70 dark:bg-orange-950/40">
            <div className="text-sm text-slate-600 mb-1 dark:text-slate-400">
              Partidas
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {player.matches}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-3 rounded border border-slate-200 dark:border-slate-700 dark:bg-slate-900">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Vitórias
            </div>
            <div className="text-xl font-bold">{player.wins}</div>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200 dark:border-slate-700 dark:bg-slate-900">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Derrotas
            </div>
            <div className="text-xl font-bold">{player.losses}</div>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200 dark:border-slate-700 dark:bg-slate-900">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Total de Kills
            </div>
            <div className="text-xl font-bold">{player.totalKills}</div>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200 dark:border-slate-700 dark:bg-slate-900">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Total de Deaths
            </div>
            <div className="text-xl font-bold">{player.totalDeaths}</div>
          </div>
        </div>
      </div>

      <WinRateSection
        title="Win Rate vs Adversários"
        stats={headToHead.against}
        emptyMessage="Nenhuma partida contra outros jogadores"
      />

      <WinRateSection
        title="Win Rate com Companheiros"
        stats={headToHead.with}
        emptyMessage="Nenhuma partida com outros jogadores no mesmo time"
      />

      <PlayerMatches matches={matches} playerProfile={playerProfile} />
    </main>
  )
}
