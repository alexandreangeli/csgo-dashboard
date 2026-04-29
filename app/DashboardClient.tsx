"use client"

import { useMemo, useState } from "react"

type Row = {
  matchTime: string
  profile: string
  name: string
  team: string
  win: string
  scoreA: string
  scoreB: string
  kills: string
  deaths: string
}

type Player = {
  name: string
  profile: string
  wins: number
  losses: number
  totalKills: number
  totalDeaths: number
  matches: number
  winRate: number
  kd: number
  rating: number
}

export default function DashboardClient({ rows }: { rows: Row[] }) {
  const [tab, setTab] = useState<"Leaderboard" | "Matches" | "Balance">(
    "Balance",
  )
  const [selected, setSelected] = useState<string[]>([])

  // DEFAULT = KD
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
      <header className="mb-6">
        <h1 className="text-3xl font-bold">CSGO Dashboard</h1>
        <p className="text-sm text-muted">
          Player leaderboard and match history
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["Balance", "Leaderboard", "Matches"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              tab === t
                ? "bg-orange-600 text-white dark:bg-orange-400 dark:text-black"
                : "bg-transparent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      {tab === "Leaderboard" && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Leaderboard</h2>
          <div className="overflow-hidden rounded-lg border">
            <table>
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-right">Rating</th>
                  <th className="px-4 py-2 text-right">Matches</th>
                  <th className="px-4 py-2 text-right">Win Rate</th>
                  <th className="px-4 py-2 text-right">K/D</th>
                </tr>
              </thead>
              <tbody>
                {byRating.map((p) => (
                  <tr key={p.profile}>
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3 text-right">
                      {p.rating.toFixed(0)}
                    </td>
                    <td className="px-4 py-3 text-right">{p.matches}</td>
                    <td className="px-4 py-3 text-right">
                      {(p.winRate * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right">{p.kd.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Matches */}
      {tab === "Matches" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Matches</h2>
          <div className="grid gap-4">
            {matches.map((match) => (
              <article key={match.matchTime} className="p-4">
                <div className="flex justify-between mb-3">
                  <strong>{match.matchTime}</strong>
                  <div>
                    {match.scoreA}:{match.scoreB}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Team title="Team A" players={match.teamA} />
                  <Team title="Team B" players={match.teamB} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Balance unchanged */}
      {tab === "Balance" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Balance Teams (10 players)
          </h2>

          <p className="text-sm text-muted mb-4">
            Selected: {selected.length} / 10
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            {byRating.map((p) => {
              const isSelected = selected.includes(p.profile)

              return (
                <button
                  key={p.profile}
                  onClick={() => togglePlayer(p.profile)}
                  className={`p-2 border rounded text-left text-sm ${
                    isSelected
                      ? "bg-orange-600 text-white dark:bg-orange-400 dark:text-black"
                      : ""
                  }`}
                >
                  {p.name} ({p.rating.toFixed(0)})
                </button>
              )
            })}
          </div>

          {balanced && (
            <div className="grid md:grid-cols-2 gap-6">
              <BalancedTeam title="Team A" players={balanced.teamA} />
              <BalancedTeam title="Team B" players={balanced.teamB} />
            </div>
          )}
        </section>
      )}
    </main>
  )
}

function Team({ title, players }: any) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">{title}</h4>

      <table className="border-collapse">
        <thead>
          <tr>
            <th className="text-left px-3 py-1">Player</th>
            <th className="text-left px-3 py-1">K</th>
            <th className="text-left px-3 py-1">D</th>
            <th className="text-left px-3 py-1">K/D</th>
          </tr>
        </thead>

        <tbody>
          {players.map((p: any, i: number) => (
            <tr key={i}>
              <td className="px-3 py-1">{p.name}</td>
              <td className="px-3 py-1">{p.kills}</td>
              <td className="px-3 py-1">{p.deaths}</td>
              <td className="px-3 py-1">
                {(p.kills / (p.deaths || 1)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function groupMatches(rows: Row[]) {
  const map: Record<string, any> = {}

  rows.forEach((r) => {
    if (!map[r.matchTime]) {
      map[r.matchTime] = {
        matchTime: r.matchTime,
        scoreA: r.scoreA,
        scoreB: r.scoreB,
        teamA: [],
        teamB: [],
      }
    }

    const entry = {
      name: r.name,
      kills: Number(r.kills),
      deaths: Number(r.deaths),
    }

    if (r.team === "A") map[r.matchTime].teamA.push(entry)
    else map[r.matchTime].teamB.push(entry)
  })

  return Object.values(map).sort(
    (a: any, b: any) =>
      new Date(b.matchTime).getTime() - new Date(a.matchTime).getTime(),
  )
}

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
}

function buildPlayers(rows: Row[], mode: "kd") {
  const map: Record<string, any> = {}

  rows.forEach((r) => {
    const playerId = normalizeName(r.name)

    if (!map[playerId]) {
      map[playerId] = {
        name: r.name,
        profile: playerId, // IMPORTANT: unified ID
        wins: 0,
        losses: 0,
        totalKills: 0,
        totalDeaths: 0,
        matches: 0,
      }
    }

    const p = map[playerId]

    if (Number(r.win)) p.wins++
    else p.losses++

    p.totalKills += Number(r.kills)
    p.totalDeaths += Number(r.deaths)
    p.matches++
  })

  let players = Object.values(map).map((p: any) => {
    const winRate = p.matches > 0 ? p.wins / p.matches : 0
    const kd = p.totalDeaths > 0 ? p.totalKills / p.totalDeaths : p.totalKills

    return { ...p, winRate, kd }
  })

  const maxKD = Math.max(...players.map((p) => p.kd), 1)

  const kdCap = 0.9 * maxKD

  const PRIOR_WR = 0.5
  const PRIOR_WEIGHT = 10

  const KD_WEIGHT = 0.65
  const WIN_WEIGHT = 0.35

  players.forEach((p: any) => {
    const smoothedWR =
      (p.wins + PRIOR_WR * PRIOR_WEIGHT) / (p.matches + PRIOR_WEIGHT)

    let perf = 0

    if (mode === "kd") {
      const cappedKD = Math.min(p.kd, kdCap)
      perf = cappedKD / kdCap
    }

    const rawRating = KD_WEIGHT * perf + WIN_WEIGHT * smoothedWR
    p.rating = Math.max(0, Math.min(1000, rawRating * 1000))
  })

  return players
}

function balanceTeams(players: Player[]) {
  const combos = combinations(players, 5)

  let best: any = null
  let bestDiff = Infinity

  combos.forEach((teamA) => {
    const teamB = players.filter((p) => !teamA.includes(p))

    const sumA = sum(teamA)
    const sumB = sum(teamB)

    const diff = Math.abs(sumA - sumB)

    if (diff < bestDiff) {
      bestDiff = diff
      best = { teamA, teamB }
    }
  })

  return best
}

function combinations(arr: any[], k: number): any[][] {
  const result: any[][] = []

  function backtrack(start: number, path: any[]) {
    if (path.length === k) {
      result.push([...path])
      return
    }

    for (let i = start; i < arr.length; i++) {
      path.push(arr[i])
      backtrack(i + 1, path)
      path.pop()
    }
  }

  backtrack(0, [])
  return result
}

function sum(players: any[]) {
  return players.reduce((s, p) => s + p.rating, 0)
}

function BalancedTeam({ title, players }: any) {
  const sorted = [...players].sort((a: any, b: any) => b.rating - a.rating)

  const total = sorted.reduce((s: number, p: any) => s + p.rating, 0)

  return (
    <div className="p-4 rounded-lg border">
      <h3 className="font-semibold mb-2">
        {title} ({total.toFixed(0)})
      </h3>

      <ul className="text-sm space-y-1">
        {sorted.map((p: any) => (
          <li key={p.profile}>
            {p.name} ({p.rating.toFixed(0)})
          </li>
        ))}
      </ul>
    </div>
  )
}
