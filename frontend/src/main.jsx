import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
 import { QueryClient,  QueryClientProvider }    from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "@/components/ui/sonner"

 const Queryclient =  new QueryClient ({
  defaultOptions: {
    queries: {
      statleTime: 60 * 1000
    }
  }
 })
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={Queryclient}>
      <BrowserRouter>
     <Toaster
  toastOptions={{
    classNames: {
      success: "bg-green-600 text-white",
      error: "bg-red-600 text-white",
      warning: "bg-yellow-500 text-black",
      info: "bg-blue-600 text-white",
    },
  }}
/>

        < App />
       </BrowserRouter>
       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
   
  </StrictMode>,
)
