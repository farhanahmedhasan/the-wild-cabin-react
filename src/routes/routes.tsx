import { RouteObject } from 'react-router'

import Error404 from '@/pages/landings/error/Error404'
import dashboardRoutes from './DashboardRoutes'
import landingRoutes from './landingRoutes'

const routes: RouteObject[] = [
  ...dashboardRoutes,
  ...landingRoutes,
  {
    path: '*',
    element: <Error404 />
  }
]

export default routes
