/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCreateUser } from "@/hooks/userCreate";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function ModalUserForm() {
  const { createUser, isLoading } = useCreateUser();

async function handleSubmit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();

  const elements = event.currentTarget.elements as typeof event.currentTarget.elements & {
    nome: HTMLInputElement;
    email: HTMLInputElement;
    quantidade_reais: HTMLInputElement
  }
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id } = await createUser({
      nome: elements.nome.value,
      email: elements.email.value,
      quantidade_reais: parseFloat(elements.quantidade_reais.value)
    });
    alert('Usuario criado com sucesso')
  } catch (error) {
    console.log((error as any).toString())
  } finally {
    console.log('terminou de rodar')
  }
}


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className=" bg-slate-600 text-white hover:bg-slate-700 hover:text-white"
          variant="outline"
        >
          Adicionar Usuario
        </Button>
      </SheetTrigger>


      <SheetContent>
        <SheetHeader>
          <SheetTitle>Preencha os Dados</SheetTitle>
        </SheetHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
            <Input id="nome" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantidade_reais" className="text-right">
              Quantia em (R$)
            </Label>
            <Input id="quantidade_reais" className="col-span-3" />
          </div>
          <SheetClose asChild>
            <Button
              disabled={isLoading}
              type="submit"
              className=" bg-green-600 text-white hover:bg-green-700"
            >
              Cadastrar
            </Button>
          </SheetClose>
        </form>
      </SheetContent>
    </Sheet>
  );
}
