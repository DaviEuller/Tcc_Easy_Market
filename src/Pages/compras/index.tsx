import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Navbar } from "@/components/sidebarapp"
import { Separator } from "@/components/ui/separator"


import { columns_Compras, type Sale_compras } from "./table_compras/dataTable_Compras"
import { DataTable_Compras } from "./table_compras/columns_Compras"

const data: Sale_compras[] = [
  {
    id: "1",
    image: "./src/assets/ps6.jpg",
    product: "PS6",
    quantity: 1,
    tracking_code: 6767676767,
    amount: 1000.00,
    status: "enviado",
  },
    {
    id: "1",
    image: "./src/assets/ps6.jpg",
    product: "PS6",
    quantity: 1,
    tracking_code: 6767676767,
    amount: 1000.00,
    status: "enviado",
  },
]

export function Compras() {
  return (
    <>
      <Navbar />

        <header className="flex h-12 items-center gap-2 border-b px-4">

          <Field orientation="horizontal">
            <Input type="search" className="my-4"placeholder="Pesquisar..." />
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
    </>
  )
}