import type { BalancedTeams, Player } from "@/app/types"

export function balanceTeams(players: Player[]): BalancedTeams | null {
  const combos = combinations(players, 5)

  let best: BalancedTeams | null = null
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

export function combinations<T>(arr: T[], k: number): T[][] {
  const result: T[][] = []

  function backtrack(start: number, path: T[]) {
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

export function sum(players: Player[]) {
  return players.reduce((s, p) => s + p.rating, 0)
}
