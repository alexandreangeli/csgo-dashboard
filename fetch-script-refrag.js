(() => {
  const playerStats = {}
  const rowsForCSV = []

  // --- match meta ---
  const matchTimeEl = document.querySelector(
    ".text-text-secondary.text-xs.lg\\:text-sm",
  )
  const matchTime = matchTimeEl?.innerText.trim() || null

  const scoreEls = document.querySelectorAll(
    ".text-4xl h1",
  )

  let scoreA = 0
  let scoreB = 0

  if (scoreEls.length >= 2) {
    scoreA = parseInt(scoreEls[0].innerText.trim(), 10)
    scoreB = parseInt(scoreEls[1].innerText.trim(), 10)
  }

  // --- tables ---
  const tables = document.querySelectorAll("table")

  function parseKDA(text) {
    const [k, d, a] = text.split("/").map((v) => parseInt(v.trim(), 10) || 0)
    return { k, d, a }
  }

  function processTable(table, didWin, teamLabel) {
    const rows = table.querySelectorAll("tbody tr")

    rows.forEach((row) => {
      const nameEl = row.querySelector("td:first-child span")
      if (!nameEl) return

      const nickname = nameEl.childNodes[0].textContent.trim()

      const profileEl = row.querySelector("td:first-child a")
      const profileUrl = profileEl
        ? profileEl.href
        : null

      const cells = row.querySelectorAll("td")

      const kdaText = cells[2]?.innerText.trim() || "0/0/0"
      const adrText = cells[6]?.innerText.trim() || "0"

      const { k: kills, d: deaths } = parseKDA(kdaText)

      const score = parseFloat(adrText) || 0

      if (!playerStats[profileUrl || nickname]) {
        playerStats[profileUrl || nickname] = {
          name: nickname,
          profile: profileUrl,
          wins: 0,
          losses: 0,
          totalKills: 0,
          totalDeaths: 0,
          totalScore: 0,
          matches: 0,
        }
      }

      const player = playerStats[profileUrl || nickname]

      if (didWin) player.wins++
      else player.losses++

      player.totalKills += kills
      player.totalDeaths += deaths
      player.totalScore += score
      player.matches++

      rowsForCSV.push({
        matchTime,
        profile: profileUrl,
        name: nickname,
        team: teamLabel,
        win: didWin ? 1 : 0,
        scoreA,
        scoreB,
        kills,
        deaths,
        score,
      })
    })
  }

  // first table = winning, second = losing
  processTable(tables[0], true, "A")
  processTable(tables[1], false, "B")

  // --- CSV ---
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
  a.download = "refrag_matches.csv"
  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  console.log(`Exported ${rowsForCSV.length} rows`)
})()