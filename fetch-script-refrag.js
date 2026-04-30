(() => {
  const rowsForCSV = []

  function parseRefragDate(str) {
    if (!str) return null

    const cleaned = str.replace(/(\d+)(st|nd|rd|th)/, "$1")
    const date = new Date(cleaned)
    if (isNaN(date)) return str

    const pad = (n) => String(n).padStart(2, "0")

    return (
      date.getUTCFullYear() +
      "-" +
      pad(date.getUTCMonth() + 1) +
      "-" +
      pad(date.getUTCDate()) +
      " " +
      pad(date.getUTCHours()) +
      ":" +
      pad(date.getUTCMinutes()) +
      ":" +
      pad(date.getUTCSeconds()) +
      " GMT"
    )
  }

  function normalizeName(name) {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  function resolveProfile(profileUrl, nickname) {
    if (profileUrl) return profileUrl
    return `refrag://player/${normalizeName(nickname)}`
  }

  function extractMapName() {
    const mapIcon = document.querySelector('img[src*="/maps/map_icon_"]')
    if (!mapIcon) return null

    const src = mapIcon.getAttribute("src") || ""

    const match = src.match(/map_icon_(.+)\.svg/)
    if (!match) return null

    const raw = match[1]

    const name = raw.replace(/^[a-z]+_/, "")

    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  const mapName = extractMapName()

  const rawMatchTime = (() => {
    const containers = document.querySelectorAll(
      ".flex.flex-col.gap-3.items-center, .flex.flex-col.gap-3.items-center.justify-center",
    )

    for (const el of containers) {
      const texts = el.querySelectorAll(".text-text-secondary")
      if (texts.length) {
        return texts[texts.length - 1].innerText.trim()
      }
    }

    return null
  })()

  const matchTime = parseRefragDate(rawMatchTime)

  const scoreEls = document.querySelectorAll(
    ".text-4xl h1, .text-\\[48px\\] h1",
  )
  const scoreA = parseInt(scoreEls[0]?.innerText || 0, 10)
  const scoreB = parseInt(scoreEls[1]?.innerText || 0, 10)

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
      const rawProfile = profileEl ? profileEl.href : null
      const profile = resolveProfile(rawProfile, nickname)

      const cells = row.querySelectorAll("td")

      const kdaText = cells[2]?.innerText.trim() || "0/0/0"
      const { k: kills, d: deaths, a: assists } = parseKDA(kdaText)

      rowsForCSV.push({
        matchTime,
        map: mapName,
        profile,
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

  processTable(tables[0], true, "A")
  processTable(tables[1], false, "B")

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

    return [
      headers.join(","),
      ...rows.map((row) => headers.map((h) => escape(row[h])).join(",")),
    ].join("\n")
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