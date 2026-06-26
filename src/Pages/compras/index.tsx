import { Link } from "react-router-dom"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebarapp"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

import { columns_Compras, type Sale_compras } from "./table_compras/dataTable_Compras"
import { DataTable_Compras } from "./table_compras/columns_Compras"
import { Dialogadd_carrinho } from "@/components/Dialog_app"

const data: Sale_compras[] = [
  {
    id: "1",
    image: "./src/assets/ps6.jpg",
    product: "PS6",
    quantity: 1,
    Target: 6767676767,
    amount: 1000.00,
    status: "enviado",
  },
    {
    id: "1",
    image: "./src/assets/ps6.jpg",
    product: "PS6",
    quantity: 1,
    Target: 6767676767,
    amount: 1000.00,
    status: "enviado",
  },
]

export function Compras() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">
            Minhas Compras
          </span>
          <Field orientation="horizontal">
            <Input type="search" placeholder="Pesquisar..." />
            <Button>Pesquisar</Button>
          </Field>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Minhas Compras</CardTitle>
                <Separator className="mt-4" />
                
            </CardHeader>
            <CardContent>
                

                <DataTable_Compras columns={columns_Compras} data={data} />    
            </CardContent>
            
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}