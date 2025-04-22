import { Outlet } from 'react-router'

export default function DashboardLayout() {
  return (
    <>
      <div>Sidebar</div>
      <main>
        <Outlet />
      </main>
    </>
  )
}
