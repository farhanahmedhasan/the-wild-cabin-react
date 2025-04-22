import { RouteObject } from 'react-router'

import DashboardBookings from '@/pages/dashboards/DashboardBookings'
import DashboardSettings from '@/pages/dashboards/DashboardSettings'
import DashboardAccount from '@/pages/dashboards/DashboardAccount'
import DashboardCabins from '@/pages/dashboards/DashboardCabins'
import DashboardUsers from '@/pages/dashboards/DashboardUsers'
import DashboardHome from '@/pages/dashboards/DashboardHome'
import Error404 from '@/pages/landings/error/Error404'
import AuthLogin from '@/pages/auth/AuthLogin'

const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard/home',
    element: <DashboardHome />
  },
  {
    path: '/dashboard/bookings',
    element: <DashboardBookings />
  },
  {
    path: '/dashboard/cabins',
    element: <DashboardCabins />
  },
  {
    path: '/dashboard/users',
    element: <DashboardUsers />
  },
  {
    path: '/dashboard/settings',
    element: <DashboardSettings />
  },
  {
    path: '/dashboard/account',
    element: <DashboardAccount />
  },
  {
    path: '/login',
    element: <AuthLogin />
  },
  {
    path: '*',
    element: <Error404 />
  }
]

export default dashboardRoutes
