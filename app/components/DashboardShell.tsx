import type { ReactNode } from "react"
import type { TabType } from "@/app/types"
import { Header } from "@/app/components/Header"
import { TabNavigation } from "@/app/components/TabNavigation"

type DashboardShellProps = {
  activeTab: TabType
  children: ReactNode
}

export function DashboardShell({ activeTab, children }: DashboardShellProps) {
  return (
    <main className="max-w-6xl mx-auto p-6 font-sans">
      <Header />
      <TabNavigation activeTab={activeTab} />
      {children}
    </main>
  )
}
