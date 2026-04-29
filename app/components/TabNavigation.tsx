import Link from "next/link"
import type { TabType } from "@/app/types"

type TabNavigationProps = {
  activeTab: TabType
}

export function TabNavigation({ activeTab }: TabNavigationProps) {
  const tabs: Array<{ name: TabType; href: string; icon: string }> = [
    { name: "Balanceador", href: "/balanceador", icon: "⚖️" },
    { name: "Ranking", href: "/ranking", icon: "🏆" },
    { name: "Partidas", href: "/partidas", icon: "📋" },
  ]

  return (
    <nav className="flex gap-2 mb-6" aria-label="Seções do dashboard">
      {tabs.map(({ name, href, icon }) => (
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
          <span
            className={`mr-1 text-lg ${
              activeTab === name ? "drop-shadow-lg" : ""
            }`}
            aria-hidden="true"
          >
            {icon}
          </span>
          {name}
        </Link>
      ))}
    </nav>
  )
}
