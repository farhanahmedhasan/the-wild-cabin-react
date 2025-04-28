import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router'
import { useRoutes } from 'react-router'

import routes from '@/routes/routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Will be 0 later
      staleTime: 60 * 1000
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

function Routes() {
  return useRoutes(routes)
}

export default App
