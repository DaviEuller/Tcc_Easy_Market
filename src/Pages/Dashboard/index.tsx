
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebarapp";


import { columns, type Sale } from "./tables/columns_Clients";
import { DataTable } from "./tables/dataTable_Clients";

import { columns_produtos, type Sale_produtos } from "./tables/columns_Produtos";
import { DataTable_Produtos } from "./tables/dataTable_Produtos";

import { DialogCadastroProduto } from "../../components/Dialog_app";
 
const data: Sale[] = [
  { id: "1", name: "Ana Souza",      email: "ana.souza@email.com",      phone: "+5511999990001", status: "success",    amount: 1250.00 },
  { id: "2", name: "Carlos Lima",    email: "carlos.lima@gmail.com",    phone: "+5511999990002", status: "processing", amount: 430.50  },
  { id: "3", name: "Fernanda Rocha", email: "fernanda.r@outlook.com",   phone: "+5511999990003", status: "success",    amount: 3200.00 },
  { id: "4", name: "Bruno Martins",  email: "b.martins@empresa.com",    phone: "+5511999990004", status: "failed",     amount: 875.90  },
  { id: "5", name: "Juliana Costa",  email: "juli.costa@email.com",     phone: "+5511999990005", status: "pending",    amount: 590.00  },
]

const data_produtos: Sale_produtos[] = [
  { id: "1",  product: "Notebook Pro", quantity: 2, sector: "TI",       amount: 1250.00 },
  { id: "2",  product: "Mouse Gamer", quantity: 5, sector: "Vendas",   amount: 430.50  },
  { id: "3",  product: "Monitor 4K", quantity: 1, sector: "Design",   amount: 3200.00 },
  { id: "4",  product: "Teclado Mecânico",  quantity: 3, sector: "TI",      amount: 875.90  },
  { id: "5",  product: "Webcam HD", quantity: 4, sector: "RH",       amount: 590.00  },
]

export function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">
            Dashboard
          </span>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
 
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Bem-vindo ao Easy Market! Aqui você pode acompanhar suas vendas,
                gerenciar produtos e muito mais.
              </CardDescription>
            </CardHeader>
          </Card>
 
          <Card>
            <CardHeader>
              <CardTitle>Suas Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={data} />
            </CardContent>
          </Card>
 
          <Card>
            <CardHeader>
              <CardTitle>Seus Produtos</CardTitle>
              <CardDescription>
                Use os botões de Editar e Excluir em cada linha da tabela.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <DialogCadastroProduto />
              </div>
              <DataTable_Produtos columns={columns_produtos} data={data_produtos} />
            </CardContent>
          </Card>
 
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
} 