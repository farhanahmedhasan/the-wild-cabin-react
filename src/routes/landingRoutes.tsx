import { Navigate, RouteObject } from 'react-router'

import AuthLogin from '@/pages/auth/AuthLogin'

const landingRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="/login" replace />
  },
  {
    path: '/login',
    element: <AuthLogin />
  }
]

export default landingRoutes
