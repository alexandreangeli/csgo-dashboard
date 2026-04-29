import { loadAllCSVs } from "@/lib/parseCsv"
import { DashboardShell } from "@/app/components/DashboardShell"
import { MatchesList } from "@/app/components/MatchesList"
import { groupMatches } from "@/app/utils/matches"

export default function PartidasPage() {
  const rows = loadAllCSVs("matches")
  const matches = groupMatches(rows)

  return (
    <DashboardShell activeTab="Partidas">
      <MatchesList matches={matches} />
    </DashboardShell>
  )
}
