import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()
render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>

, document.getElementById('app')!)
