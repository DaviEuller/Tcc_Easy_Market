  
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
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react"

import { columns_Carrinho, type Sale_carrinho } from "./table_carrinho/columns_carrinho"
import { DataTable_Carrinho } from "./table_carrinho/dataTable_carrinho"

import { QrCode } from "lucide-react"


const initialData: Sale_carrinho[] = [
  { id: "1", product: "Camisa Brasil", quantity: 1, amount: 100.00 },
  { id: "2", product: "ps6", quantity: 1, amount: 1000.00 },
]

export function CardCarrinho() {
  const [pagamento, setPagamento] = useState<"pix" | "debito" | "credito">("pix")
const [parcelas, setParcelas] = useState(1)

  const [items, setItems] = useState<Sale_carrinho[]>(initialData)

  // Atualiza a quantidade e recalcula o amount do item
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity, amount: item.amount / item.quantity * quantity }
          : item
      )
    )
  }

  // Total geral do carrinho
  const totalCarrinho = items.reduce((acc, item) => acc + item.amount, 0)
  const navigate = useNavigate();
  // Passa o onUpdate para as colunas
  const columns = columns_Carrinho(handleUpdateQuantity)

  return (
    
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">
            Carrinho
          </span>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>Meu Carrinho</CardTitle>
              <Separator />
            </CardHeader>
            <CardContent>

              <DataTable_Carrinho columns={columns} data={items} />
              <Separator className="my-4" />

              <Card>
                <CardHeader>
                  <CardTitle>Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                <Field className="my-4" orientation="horizontal">
                  <label className="w-40 text-sm font-medium">CEP</label>
                  <Input
                    type="text"
                    placeholder="00000-000"
                    maxLength={9}
                    
                  />
                </Field>

                <Field className="my-4" orientation="horizontal">
                  <label className="w-40 text-sm font-medium">Rua</label>
                  <Input
                    type="text"
                    placeholder="Rua..."
                    
                  />
                </Field>

                <Field className="my-4" orientation="horizontal">
                  <label className="w-40 text-sm font-medium">Número</label>
                  <Input
                    type="text"
                    placeholder="Número da casa..."
                    
                  />
                </Field>

                <Field className="my-4" orientation="horizontal">
                  <label className="w-40 text-sm font-medium">Complemento</label>
                  <Input
                    type="text"
                    placeholder="Apto, bloco..."
                    
                  />
                </Field>

                <Field className="my-4" orientation="horizontal">
                  <label className="w-40 text-sm font-medium">Bairro</label>
                  <Input
                    type="text"
                    placeholder="Bairro..."
                    
                  />
                </Field>

                <Field className="my-4" orientation="horizontal">
                  <label className="w-40 text-sm font-medium">Cidade</label>
                  <Input
                    type="text"
                    placeholder="Cidade..."
                    
                  />
                </Field>

                <Field className="my-4" orientation="horizontal">
                  <label className="w-40 text-sm font-medium">Estado</label>
                  <Input
                    type="text"
                    placeholder="UF..."
                    maxLength={2}
                    
                  />
                </Field>

                <Field className="my-4" orientation="horizontal">
                  <label className="w-40 text-sm font-medium">Ponto de Referência</label>
                  <Input
                    type="text"
                    placeholder="Ex: próximo ao mercado..."
                    
                  />
                </Field>

                </CardContent>
              </Card>

              <Separator className="my-4" />

              <Card>
                <CardHeader>
                  <CardTitle>Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">

                  {/* Seleção da forma de pagamento */}
                  <div className="flex gap-2">
                    <Button
                      variant={pagamento === "pix" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setPagamento("pix")}
                    >
                      Pix
                    </Button>
                    <Button
                      variant={pagamento === "debito" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setPagamento("debito")}
                    >
                      Débito
                    </Button>
                    <Button
                      variant={pagamento === "credito" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setPagamento("credito")}
                    >
                      Crédito
                    </Button>
                  </div>

                  {/* PIX */}
                  {pagamento === "pix" && (
                    <div className="flex flex-col items-center gap-2 py-4">
                      <QrCode className="w-32 h-32 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Escaneie o QR Code para pagar</p>
                      <Input readOnly value="00020126330014br.gov.bcb.pix0111123456789025204000053039865802BR" />
                      <Button variant="outline" className="w-full">
                        Copiar chave Pix
                      </Button>
                    </div>
                  )}

                  {/* DÉBITO */}
                  {pagamento === "debito" && (
                    <div className="flex flex-col gap-3">
                      <Field orientation="horizontal">
                        <label className="w-40 text-sm font-medium">Número do Cartão</label>
                        <Input type="text" placeholder="0000 0000 0000 0000" maxLength={19} />
                      </Field>
                      <Field orientation="horizontal">
                        <label className="w-40 text-sm font-medium">Nome no Cartão</label>
                        <Input type="text" placeholder="Como está no cartão..." />
                      </Field>
                      <Field orientation="horizontal">
                        <label className="w-40 text-sm font-medium">Validade</label>
                        <Input type="text" placeholder="MM/AA" maxLength={5} />
                      </Field>
                      <Field orientation="horizontal">
                        <label className="w-40 text-sm font-medium">CVV</label>
                        <Input type="text" placeholder="000" maxLength={3} />
                      </Field>
                    </div>
                  )}

                  {/* CRÉDITO */}
                  {pagamento === "credito" && (
                    <div className="flex flex-col gap-3">
                      <Field orientation="horizontal">
                        <label className="w-40 text-sm font-medium">Número do Cartão</label>
                        <Input type="text" placeholder="0000 0000 0000 0000" maxLength={19} />
                      </Field>
                      <Field orientation="horizontal">
                        <label className="w-40 text-sm font-medium">Nome no Cartão</label>
                        <Input type="text" placeholder="Como está no cartão..." />
                      </Field>
                      <Field orientation="horizontal">
                        <label className="w-40 text-sm font-medium">Validade</label>
                        <Input type="text" placeholder="MM/AA" maxLength={5} />
                      </Field>
                      <Field orientation="horizontal">
                        <label className="w-40 text-sm font-medium">CVV</label>
                        <Input type="text" placeholder="000" maxLength={3} />
                      </Field>
                      <Field orientation="horizontal">
                        <label className="w-40 text-sm font-medium">Parcelas</label>
                        <select
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                          value={parcelas}
                          onChange={(e) => setParcelas(Number(e.target.value))}
                        >
                          {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
                            <option key={n} value={n}>
                              {n}x de {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalCarrinho / n)}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  )}

                </CardContent>
              </Card>

              <Separator className="my-4" />

              {/* Total geral */}
              <div className="flex justify-between items-center px-1 mb-4">
                <span className="text-lg font-semibold">Total do Carrinho</span>
                <span className="text-lg font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalCarrinho)}
                </span>
              </div>



              <Button className="w-full" onClick={() => navigate(`/cc`)}>
                Comprar
              </Button>

            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}