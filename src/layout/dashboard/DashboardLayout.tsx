import { Outlet } from 'react-router'

import DashboardSidebar from '@/layout/dashboard/DashboardSidebar'
import DashboardHeader from '@/layout/dashboard/DashboardHeader'

export default function DashboardLayout() {
  return (
    <div className="h-dvh grid grid-cols-[auto_1fr]">
      <aside className="max-w-60 py-8 px-6 bg-gray-0 border-r border-gray-100 overflow-y-auto">
        <DashboardSidebar />
      </aside>

      <div className="flex flex-col overflow-y-auto">
        <header className="py-5 px-20 bg-gray-0 border-b border-gray-100">
          <DashboardHeader />
        </header>
        <main className="flex-1 pt-16 px-20 pb-25 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
