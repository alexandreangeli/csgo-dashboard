import type { TabType } from "@/app/types"

type TabNavigationProps = {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: Array<{ name: TabType; icon: string }> = [
    { name: "Balanceador", icon: "⚖️" },
    { name: "Ranking", icon: "🏆" },
    { name: "Partidas", icon: "📋" },
  ]

  return (
    <div className="flex gap-2 mb-6">
      {tabs.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => onTabChange(name)}
          className={`px-4 py-2 rounded-md text-sm font-medium border transition-all ${
            activeTab === name
              ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-white shadow-md"
              : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <span
            className={`mr-1 text-lg ${
              activeTab === name ? "drop-shadow-lg" : ""
            }`}
          >
            {icon}
          </span>
          {name}
        </button>
      ))}
    </div>
  )
}
