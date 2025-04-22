import { RouteObject } from 'react-router'

import dashboardRoutes from '@/routes/dashboardRoutes'
import appRoutes from '@/routes/appRoutes'

const routes: RouteObject[] = [...dashboardRoutes, ...appRoutes]

export default routes
