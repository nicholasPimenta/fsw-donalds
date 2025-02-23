import { db } from "@/lib/prisma";
import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./components/cpfForm";
import OrderList from "./components/orderList";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;
  if (!cpf) {
    return <CpfForm />
  }
  if (!isValidCpf(cpf)) {
    return <CpfForm />
  }
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCpf: removeCpfPunctuation(cpf)
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        }
      },
      orderProducts: {
        include: {
          product: true,
        }
      }
    },
  })
  return ( 
    <div>
      <h1>Página de Ordem</h1>
      <OrderList orders={orders} />
    </div>
   );
}
 
export default OrdersPage;