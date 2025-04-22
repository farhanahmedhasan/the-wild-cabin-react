import { Outlet } from 'react-router'

export default function AppLayout() {
  return (
    <>
      <div>AppLayout</div>
      <main>
        <Outlet />
      </main>
    </>
  )
}
