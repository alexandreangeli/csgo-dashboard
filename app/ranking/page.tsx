import { loadAllCSVs } from "@/lib/parseCsv"
import { DashboardShell } from "@/app/components/DashboardShell"
import { Leaderboard } from "@/app/components/Leaderboard"
import { buildPlayers } from "@/app/utils/playerStats"

export default function RankingPage() {
  const rows = loadAllCSVs("matches")
  const players = buildPlayers(rows)

  return (
    <DashboardShell activeTab="Ranking">
      <Leaderboard players={players} />
    </DashboardShell>
  )
}
