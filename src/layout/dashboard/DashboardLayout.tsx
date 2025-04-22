import { Outlet } from 'react-router'

import DashboardSidebar from '@/layout/dashboard/DashboardSidebar'
import DashboardHeader from '@/layout/dashboard/DashboardHeader'

export default function DashboardLayout() {
  return (
    <>
      <DashboardHeader />
      <DashboardSidebar />
      <main>
        <Outlet />
      </main>
    </>
  )
}
