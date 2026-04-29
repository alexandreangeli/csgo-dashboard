"use client"

import { useRouter } from "next/navigation"

type BackButtonProps = {
  fallbackHref?: string
}

export function BackButton({ fallbackHref = "/balanceador" }: BackButtonProps) {
  const router = useRouter()

  function goBack() {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push(fallbackHref)
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="text-blue-600 hover:underline dark:text-blue-400"
    >
      ← Voltar
    </button>
  )
}
