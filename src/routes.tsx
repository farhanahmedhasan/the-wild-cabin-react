import { RouteObject } from 'react-router'

import HomePage from '@/pages/home/HomePage'

const dashboardRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  }
]

export default dashboardRoutes
