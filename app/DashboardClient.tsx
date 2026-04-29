"use client"

import { useMemo, useState } from "react"
import type { Row, Player, TabType } from "@/app/types"
import { buildPlayers } from "@/app/utils/playerStats"
import { groupMatches } from "@/app/utils/matches"
import { balanceTeams } from "@/app/utils/balancing"
import { Header } from "@/app/components/Header"
import { TabNavigation } from "@/app/components/TabNavigation"
import { Leaderboard } from "@/app/components/Leaderboard"
import { MatchesList } from "@/app/components/MatchesList"
import { BalanceSection } from "@/app/components/BalanceSection"

export default function DashboardClient({ rows }: { rows: Row[] }) {
  const [tab, setTab] = useState<TabType>("Balance")
  const [selected, setSelected] = useState<string[]>([])
  const [mode, setMode] = useState<"kd">("kd")

  const players = buildPlayers(rows, mode)
  const matches = groupMatches(rows)

  const byRating = [...players].sort((a, b) => b.rating - a.rating)
  const selectedPlayers = players.filter((p) => selected.includes(p.profile))

  const balanced = useMemo(() => {
    if (selectedPlayers.length !== 10) return null
    return balanceTeams(selectedPlayers)
  }, [selectedPlayers])

  function togglePlayer(profile: string) {
    setSelected((prev) => {
      if (prev.includes(profile)) return prev.filter((p) => p !== profile)
      if (prev.length >= 10) return prev
      return [...prev, profile]
    })
  }

  return (
    <main className="max-w-6xl mx-auto p-6 font-sans">
      <Header />
      <TabNavigation activeTab={tab} onTabChange={setTab} />

      {tab === "Balance" && (
        <BalanceSection
          byRating={byRating}
          selected={selected}
          onTogglePlayer={togglePlayer}
          balanced={balanced}
        />
      )}
      {tab === "Leaderboard" && <Leaderboard players={players} />}
      {tab === "Matches" && <MatchesList matches={matches} />}
    </main>
  )
}
