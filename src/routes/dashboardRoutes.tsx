import { Navigate, RouteObject } from 'react-router'

import DashboardBookings from '@/pages/dashboards/DashboardBookings'
import DashboardSettings from '@/pages/dashboards/DashboardSettings'
import DashboardAccount from '@/pages/dashboards/DashboardAccount'
import DashboardCabins from '@/pages/dashboards/cabins/DashboardCabins'
import DashboardLayout from '@/layout/dashboard/DashboardLayout'
import DashboardUsers from '@/pages/dashboards/DashboardUsers'
import DashboardHome from '@/pages/dashboards/DashboardHome'

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
      },
      {
        path: 'account',
        element: <DashboardAccount />
      }
    ]
  }
]
export default dashboardRoutes
