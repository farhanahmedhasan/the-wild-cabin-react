import { Navigate, RouteObject } from 'react-router'

import DashboardSettings from '@/pages/dashboards/settings/DashboardSettingsIndex'
import DashboardBookings from '@/pages/dashboards/bookings/DashboardBookingsIndex'
import DashboardCabins from '@/pages/dashboards/cabins/DashboardCabinIndex'
import DashboardUsers from '@/pages/dashboards/users/DashboardUsers'
import DashboardHome from '@/pages/dashboards/home/DashboardHome'
import DashboardLayout from '@/layout/dashboard/DashboardLayout'

const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="home" />
      },
      {
        path: 'home',
        element: <DashboardHome />
      },
      {
        path: 'bookings',
        element: <DashboardBookings />
      },
      {
        path: 'cabins',
        element: <DashboardCabins />
      },
      {
        path: 'users',
        element: <DashboardUsers />
      },
      {
        path: 'settings',
        element: <DashboardSettings />
      }
    ]
  }
]
export default dashboardRoutes
