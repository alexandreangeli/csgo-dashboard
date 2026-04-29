import type { Player } from "@/app/types"

export function balanceTeams(players: Player[]) {
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

export function combinations(arr: any[], k: number): any[][] {
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

export function sum(players: any[]) {
  return players.reduce((s, p) => s + p.rating, 0)
}
