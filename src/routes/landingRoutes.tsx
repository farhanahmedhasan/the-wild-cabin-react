import { RouteObject } from 'react-router'

import AuthLogin from '@/pages/auth/AuthLogin'

const landingRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <AuthLogin />
  }
]

export default landingRoutes
