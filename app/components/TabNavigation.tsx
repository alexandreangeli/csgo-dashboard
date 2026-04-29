import type { TabType } from "@/app/types"

type TabNavigationProps = {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: TabType[] = ["Balanceador", "Ranking", "Partidas"]

  return (
    <div className="flex gap-2 mb-6">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onTabChange(t)}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === t
              ? "bg-orange-600 text-white dark:bg-orange-400 dark:text-black"
              : "bg-transparent"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
