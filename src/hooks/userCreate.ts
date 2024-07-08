import { useMutation } from "@tanstack/react-query";
import { IUser } from "./useUsers";

/*
 mutation => no react query serve para fazer uma requisição que altera o estado do servidor
 mutationAsync => função que executa a mutation e retorna uma promise com o resultado da mutation
*/

export function useCreateUser() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (user: { nome: string, email: string, quantidade_reais: number }): Promise<IUser> => {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      return response.json();
    }
  });
  return {
    createUser: mutateAsync, // função para criar um usuário
    isLoading: isPending // indica se a mutation está sendo feita
  }
}