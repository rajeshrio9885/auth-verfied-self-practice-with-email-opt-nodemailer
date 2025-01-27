import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
const queryCleint = new QueryClient()
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryCleint}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>


)
