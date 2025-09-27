import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { AppContextProvider } from './context/AppContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient} >
    <AppContextProvider>
      <App />
      <Toaster />
    </AppContextProvider>
  </QueryClientProvider>
)
