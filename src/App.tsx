import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router'
import { useRoutes } from 'react-router'

import { TooltipProvider } from '@/components/ui/Tooltip'
import routes from '@/routes/routes'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

function Routes() {
  return useRoutes(routes)
}

export default App
