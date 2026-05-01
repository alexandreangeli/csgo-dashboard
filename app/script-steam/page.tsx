// app/script/page.tsx
"use client"

import { useEffect, useState } from "react"

export default function ScriptPage() {
  const [scriptCode, setScriptCode] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadScript() {
      const res = await fetch("/fetch-script-steam.js")
      const text = await res.text()

      setScriptCode(text)
    }

    loadScript()
  }, [])

  async function copyScript() {
    await navigator.clipboard.writeText(scriptCode)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Steam Match Export Script</h1>

          <button
            onClick={copyScript}
            className="rounded bg-white px-4 py-2 text-black"
            disabled={!scriptCode}
          >
            {copied ? "Copied" : "Copy Script"}
          </button>
        </div>

        <pre className="overflow-x-auto rounded bg-zinc-900 p-4 text-sm leading-6 whitespace-pre-wrap">
          <code>{scriptCode}</code>
        </pre>
      </div>
    </main>
  )
}
