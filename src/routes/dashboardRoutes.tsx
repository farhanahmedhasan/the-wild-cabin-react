import { Navigate, RouteObject } from 'react-router'

import DashboardSettings from '@/pages/dashboards/settings/DashboardSettingsIndex'
import DashboardCabins from '@/pages/dashboards/cabins/DashboardCabinIndex'
import DashboardBookings from '@/pages/dashboards/bookings/DashboardBookings'

import DashboardLayout from '@/layout/dashboard/DashboardLayout'
import DashboardUsers from '@/pages/dashboards/users/DashboardUsers'
import DashboardHome from '@/pages/dashboards/home/DashboardHome'

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
