import { useQuery } from "@tanstack/react-query";

export interface IUser {
  id: string
  nome: string
  email: string
  quantidade_reais: number
}

export function useUsers() {
  const { data, refetch, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ['users'],// serve para identificar a query e para invalidar o cache
    queryFn: async (): Promise<IUser[]> => { // função que será executada para buscar os dados
      const response = await fetch('http://localhost:3000/usuarios');
      return response.json();
    },
  });

  return {
    users: data ?? [],
    refetch, // função para refazer a query
    isLoading, // indica se a query está carregando os dados
    isFetching, // indica se a queryFn está sendo feita
    error,
    isError
  }
}
// const isLoading = isPending && isFetching -> isLoading = true