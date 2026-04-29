import { loadCSV } from "@/lib/parseCsv"
import DashboardClient from "./DashboardClient"

export default function Page() {
  const rows = loadCSV("steam_matches.csv")

  return <DashboardClient rows={rows} />
}
