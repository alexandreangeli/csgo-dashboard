import Link from "next/link"
import { loadAllCSVs } from "@/lib/parseCsv"
import { buildPlayers } from "@/app/utils/playerStats"
import { calculateHeadToHeadStats } from "@/app/utils/playerHeadToHead"
import { BackButton } from "@/app/components/BackButton"

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

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Win Rate vs Adversários</h2>
        {headToHead.against.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            Nenhuma partida contra outros jogadores
          </p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/70">
                  <th className="px-4 py-3 text-left">Jogador</th>
                  <th className="px-4 py-3 text-right">Partidas</th>
                  <th className="px-4 py-3 text-right">Vitórias</th>
                  <th className="px-4 py-3 text-right">Derrotas</th>
                  <th className="px-4 py-3 text-right">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {headToHead.against.map((stat) => (
                  <tr
                    key={stat.opponentProfile}
                    className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/60"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/player/${stat.opponentProfile}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {stat.opponentName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {stat.matches}
                    </td>
                    <td className="px-4 py-3 text-right text-green-600 font-medium dark:text-green-400">
                      {stat.wins}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600 font-medium dark:text-red-400">
                      {stat.losses}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`px-3 py-1 rounded font-medium ${
                          stat.winRate >= 0.5
                            ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                        }`}
                      >
                        {(stat.winRate * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Win Rate com Companheiros</h2>
        {headToHead.with.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            Nenhuma partida com outros jogadores no mesmo time
          </p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/70">
                  <th className="px-4 py-3 text-left">Jogador</th>
                  <th className="px-4 py-3 text-right">Partidas</th>
                  <th className="px-4 py-3 text-right">Vitórias</th>
                  <th className="px-4 py-3 text-right">Derrotas</th>
                  <th className="px-4 py-3 text-right">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {headToHead.with.map((stat) => (
                  <tr
                    key={stat.opponentProfile}
                    className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/60"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/player/${stat.opponentProfile}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {stat.opponentName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {stat.matches}
                    </td>
                    <td className="px-4 py-3 text-right text-green-600 font-medium dark:text-green-400">
                      {stat.wins}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600 font-medium dark:text-red-400">
                      {stat.losses}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`px-3 py-1 rounded font-medium ${
                          stat.winRate >= 0.5
                            ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                        }`}
                      >
                        {(stat.winRate * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
