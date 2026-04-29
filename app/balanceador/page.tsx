import { loadAllCSVs } from "@/lib/parseCsv"
import { DashboardShell } from "@/app/components/DashboardShell"
import { BalanceadorClient } from "./BalanceadorClient"

export default function BalanceadorPage() {
  const rows = loadAllCSVs("matches")

  return (
    <DashboardShell activeTab="Balanceador">
      <BalanceadorClient rows={rows} />
    </DashboardShell>
  )
}
