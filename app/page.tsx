import { loadAllCSVs } from "@/lib/parseCsv"
import DashboardClient from "./DashboardClient"

export default function Page() {
  const rows = loadAllCSVs("matches")

  return <DashboardClient rows={rows} />
}
