import Link from "next/link"
import type { TabType } from "@/app/types"

type TabNavigationProps = {
  activeTab: TabType
}

export function TabNavigation({ activeTab }: TabNavigationProps) {
  const tabs: Array<{ name: TabType; href: string; icon: string }> = [
    { name: "Balanceador", href: "/balanceador" },
    { name: "Ranking", href: "/ranking" },
    { name: "Partidas", href: "/partidas" },
  ]

  return (
    <nav className="flex gap-2 mb-6" aria-label="Seções do dashboard">
      {tabs.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className={`px-4 py-2 rounded-md text-sm font-medium border transition-all ${
            activeTab === name
              ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-white shadow-md"
              : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          aria-current={activeTab === name ? "page" : undefined}
        >
          {name}
        </Link>
      ))}
    </nav>
  )
}
