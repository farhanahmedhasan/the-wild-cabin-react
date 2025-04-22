import { Navigate, RouteObject } from 'react-router'

import Error404 from '@/pages/landings/error/Error404'
import AuthLogin from '@/pages/auth/AuthLogin'
import AppLayout from '@/layout/app/AppLayout'

const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="login" replace />
      },
      {
        path: 'login',
        element: <AuthLogin />
      },
      {
        path: '*',
        element: <Error404 />
      }
    ]
  }
]

export default appRoutes
