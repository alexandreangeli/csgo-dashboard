"use client"

import { useMemo, useState } from "react"
import type { Row } from "@/app/types"
import { balanceTeams } from "@/app/utils/balancing"
import { buildPlayers } from "@/app/utils/playerStats"
import { BalanceSection } from "@/app/components/BalanceSection"

export function BalanceadorClient({ rows }: { rows: Row[] }) {
  const [selected, setSelected] = useState<string[]>([])

  const players = buildPlayers(rows)
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
    <BalanceSection
      byRating={byRating}
      selected={selected}
      onTogglePlayer={togglePlayer}
      balanced={balanced}
    />
  )
}
