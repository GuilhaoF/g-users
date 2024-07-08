import { useEffect } from "react";
import { useUsers } from "./hooks/useUsers";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { RefreshCcwIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { ModalUserForm } from "./components/modal-user-form";

export default function Users() {
  const {
    users,
    refetch,
    isLoading: isUsersLoading,
    isFetching,
    error: usersError,
    isError,
  } = useUsers();

  useEffect(() => {
    if (isError) {
      console.error("erro na query");
    }
  }, [isError]);

  return (
    <div>
      <div className="flex items-center justify-between my-4 p-2">
        <h1 className="text-lg font-extrabold">Usuários</h1>
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <RefreshCcwIcon className="mr-4" onClick={() => refetch()} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh Lista Usuarios</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ModalUserForm />
        </div>
      </div>

      {isUsersLoading && <h1>Carregando...</h1>}
      {!isUsersLoading && isFetching && <small>Fetching...</small>}
      {usersError && <h1 className="text-red-400">{usersError.toString()}</h1>}

      <Table className="">
        <TableHeader className=" border-2 bg-gray-500 ">
          <TableRow>
            <TableHead className=" text-white">Nome</TableHead>
            <TableHead className=" text-white">Email</TableHead>
            <TableHead className=" text-white">Quantia (R$)</TableHead>
          </TableRow>
        </TableHeader>
        {users.map((user) => (
          <TableBody className=" border-2 ">
            <TableRow>
              <TableCell className="font-medium">{user.nome}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                R$ {user.quantidade_reais ?? 0}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
}
