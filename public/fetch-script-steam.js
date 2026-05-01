(() => {
  const matches = document.querySelectorAll(".csgo_scoreboard_inner_right")

  const playerStats = {}
  const rowsForCSV = []

  const OVERRIDE_RULES = [
    {
      matchTimes: new Set([
        "2026-04-26 23:45:47 GMT",
        "2026-04-26 22:50:59 GMT",
      ]),
      from: "https://steamcommunity.com/profiles/76561198054136932",
      to: "https://steamcommunity.com/id/Monkey033",
    },
  ]

  function resolveProfile(matchTime, rawProfile) {
    for (const rule of OVERRIDE_RULES) {
      if (rule.matchTimes.has(matchTime) && rawProfile === rule.from) {
        return rule.to
      }
    }
    return rawProfile
  }

  matches.forEach((match) => {
    const rows = Array.from(match.querySelectorAll("tr"))
    const outerRow = match.closest("tr")

    let matchTime = null
    const timeCell = outerRow?.querySelector(
      ".csgo_scoreboard_inner_left tr:nth-child(2) td",
    )
    if (timeCell) {
      matchTime = timeCell.innerText.trim()
    }

    let mapName = null
    const mapCell = outerRow?.querySelector(
      ".csgo_scoreboard_inner_left tr:nth-child(1) td",
    )

    if (mapCell) {
      const raw = mapCell.innerText.trim()
      mapName = raw.replace(/^Competitive\s+/i, "")
    }

    const scoreIndex = rows.findIndex((r) =>
      r.querySelector(".csgo_scoreboard_score"),
    )
    if (scoreIndex === -1) return

    const scoreText = rows[scoreIndex].innerText.trim()
    const [scoreA, scoreB] = scoreText
      .split(":")
      .map((s) => parseInt(s.trim(), 10))

    const teamAWin = scoreA > scoreB

    const playerRows = rows.filter((r) => r.querySelector(".playerNickname"))

    const teamA = playerRows.slice(0, 5)
    const teamB = playerRows.slice(5, 10)

    function processTeam(teamRows, didWin, teamLabel) {
      teamRows.forEach((row) => {
        const linkEl = row.querySelector(".playerNickname a")
        const profileEl = row.querySelector(".playerAvatar a")

        if (!linkEl || !profileEl) return

        const nickname = linkEl.textContent.trim() || "(empty)"

        const rawProfile = profileEl.href.trim()
        const profileUrl = resolveProfile(matchTime, rawProfile)

        const kills = parseInt(row.children[2]?.innerText.trim(), 10) || 0
        const assists = parseInt(row.children[3]?.innerText.trim(), 10) || 0
        const deaths = parseInt(row.children[4]?.innerText.trim(), 10) || 0

        if (!playerStats[profileUrl]) {
          playerStats[profileUrl] = {
            name: nickname,
            profile: profileUrl,
            wins: 0,
            losses: 0,
            totalKills: 0,
            totalAssists: 0,
            totalDeaths: 0,
            matches: 0,
          }
        }

        const player = playerStats[profileUrl]

        if (didWin) player.wins++
        else player.losses++

        player.totalKills += kills
        player.totalAssists += assists
        player.totalDeaths += deaths
        player.matches++

        if (nickname !== "(empty)") {
          player.name = nickname
        }

        rowsForCSV.push({
          matchTime,
          map: mapName,
          profile: profileUrl,
          name: nickname,
          team: teamLabel,
          win: didWin ? 1 : 0,
          scoreA,
          scoreB,
          kills,
          assists,
          deaths,
        })
      })
    }

    processTeam(teamA, teamAWin, "A")
    processTeam(teamB, !teamAWin, "B")
  })

  function toCSV(rows) {
    if (!rows.length) return ""

    const headers = Object.keys(rows[0])

    const escape = (val) => {
      if (val == null) return ""
      const str = String(val)
      if (str.includes('"') || str.includes(",") || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }

    const lines = [
      headers.join(","),
      ...rows.map((row) => headers.map((h) => escape(row[h])).join(",")),
    ]

    return lines.join("\n")
  }

  const csv = toCSV(rowsForCSV)

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "steam_matches.csv"
  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  console.log(`Exported ${rowsForCSV.length} rows to CSV`)
})()