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
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">
            Exportar Partida Privada da Steam
          </h1>

          <p className="text-zinc-400">
            Siga o tutorial abaixo para exportar a partida privada em CSV.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-xl font-semibold">Tutorial</h2>

          <ol className="space-y-4 text-zinc-300">
            <li>
              <span className="font-semibold text-white">1.</span> Entre em:
              <a
                href="https://steamcommunity.com/my/gcpd/730/?tab=matchhistoryscrimmage"
                className="mt-2 ml-2 rounded bg-black p-3 text-sm break-all text-green-400"
              >
                https://steamcommunity.com/my/gcpd/730/?tab=matchhistoryscrimmage
              </a>
            </li>

            <li>
              <span className="font-semibold text-white">2.</span> O histórico
              de partidas privadas vai aparecer na tela.
            </li>

            <li>
              <span className="font-semibold text-white">3.</span> Deixe aberta
              na tela a partida que deseja exportar.
            </li>

            <li>
              <span className="font-semibold text-white">4.</span> Copie o
              código abaixo clicando no botão{" "}
              <span className="font-semibold text-white">"Copiar Script"</span>.
            </li>

            <li>
              <span className="font-semibold text-white">5.</span> Abra o
              console do navegador apertando{" "}
              <span className="rounded bg-black px-2 py-1 text-sm text-green-400">
                F12
              </span>
              .
            </li>

            <li>
              <span className="font-semibold text-white">6.</span> Cole o script
              no console do navegador e pressione Enter.
            </li>

            <li>
              <span className="font-semibold text-white">7.</span> O arquivo CSV
              será baixado automaticamente.
            </li>

            <li>
              <span className="font-semibold text-white">8.</span> Envie o
              arquivo CSV para o desenvolvedor do site.
            </li>
          </ol>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Script</h2>

          <button
            onClick={copyScript}
            className="rounded bg-white px-4 py-2 text-black transition-opacity hover:opacity-80 disabled:opacity-50"
            disabled={!scriptCode}
          >
            {copied ? "Copiado" : "Copiar Script"}
          </button>
        </div>

        <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm leading-6 whitespace-pre-wrap border border-zinc-800">
          <code>{scriptCode}</code>
        </pre>
      </div>
    </main>
  )
}
