"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";
import { isValidCpf } from "../helpers/cpf";
import { Input } from "@/components/ui/input";
import { createOrder } from "../actions/createOrder";
import { useParams, useSearchParams } from "next/navigation";
import { OrderConsumptionMethod } from "@prisma/client";
import { useContext, useTransition } from "react";
import { CartContext } from "../contexts/cart";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
 
const formSchema = z.object({
  name: z.string().trim().min(3, {
    message: "Nome obrigatório"
  }),
  cpf: z.string().trim().min(1, {
    message: "CPF Obrigatório"
  }).refine((value) => isValidCpf(value), {
    message: "CPF Inválido"
  })
})

type FormSchema = z.infer<typeof formSchema>

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void; 
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

const onSubmit = async (data: FormSchema) => {
  try {
    const orderConsumptionMethod = searchParams.get("orderConsumptionMethod") as OrderConsumptionMethod;
    startTransition(async () => {
      await createOrder({
        orderConsumptionMethod,
        customerCpf: data.cpf,
        customerName: data.name,
        products,
        slug,
      });
      onOpenChange(false)
      toast.success("Pedido finalizado com sucesso!");
    });
    
  } catch (error) {
    console.error(error)
  }
}
  return ( 
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações a seguir para terminarmos o seu pedido
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu CPF</FormLabel>
                  <FormControl>
                    <PatternFormat 
                    placeholder="Digite seu CPF"
                    format="###.###.###-##" 
                    customInput={Input} 
                    {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}
            />
            <DrawerFooter>
              <Button 
                type="submit" 
                variant="destructive" 
                className="rounded-full" 
                disabled={isPending}
              >{isPending && <Loader2Icon className="animate-spin" /> }  Confirmar</Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full rounded-full">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
            </form>           
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
 
export default FinishOrderDialog;