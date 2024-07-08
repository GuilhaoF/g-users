import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import Users from "./Users";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        refetchInterval:90000, // 1 minuto e meio -> tempo que a query será atualizada
        staleTime: 5000, // 5 segundos -> tempo que a query pode ficar sem ser atualizada
        refetchOnWindowFocus: false,
        retry: false,
        gcTime: 10 * 60 * 1000,// 10 minutos -> tempo que a query pode ficar sem ser usada
      },
      mutations:{}
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
        </Routes>
        <ReactQueryDevtools />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
