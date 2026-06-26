import { CheckCircle2, FileText, ShoppingBag, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebarapp";
import {useNavigate} from "react-router-dom";

const itens = [
  { produto: "Camisa Brasil", quantidade: 1, precoUnit: 100.0 },
  { produto: "PS6", quantidade: 1, precoUnit: 1000.0 },
];

const subtotal = itens.reduce((acc, i) => acc + i.quantidade * i.precoUnit, 0);
const frete = 0;
const total = subtotal + frete;

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function CompraConfirmada() {

  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">
            Compra Confirmada
          </span>
        </header>

        <main className="flex flex-1 flex-col items-center p-7">
          <div className="flex flex-col gap-5 w-full max-w-3xl">
          {/* Banner de sucesso */}
          <div className="flex items-center gap-5 rounded-xl border border-green-500/25 bg-green-500/10 px-7 py-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-green-500/40 bg-green-500/15">
              <CheckCircle2 size={28} className="text-green-500" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-green-500">
                Compra realizada com sucesso!
              </h2>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Seu pedido foi confirmado e está sendo processado. Você receberá
                atualizações por e-mail.
              </p>
            </div>
          </div>

          {/* Informações do pedido */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <FileText size={14} className="text-muted-foreground" />
                Informações do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-3">
              <div className="grid grid-cols-3 divide-x divide-border">
                <div className="px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    Número do Pedido
                  </p>
                  <p className="text-sm font-semibold">#EM-20240625-0847</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    Data
                  </p>
                  <p className="text-sm font-semibold">25 de jun. de 2024 · 14:32</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    Status
                  </p>
                  <Badge
                    variant="outline"
                    className="border-green-500/30 bg-green-500/10 text-green-500 gap-1.5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Confirmado
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Itens do pedido */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <ShoppingBag size={14} className="text-muted-foreground" />
                Itens do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-3">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["Produto", "Qtd.", "Preço Unit.", "Total"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itens.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-3.5 text-sm font-medium">{item.produto}</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{item.quantidade}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold">{fmt(item.precoUnit)}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold">{fmt(item.quantidade * item.precoUnit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Separator />

              <div className="flex flex-col">
                <div className="flex justify-between px-5 py-3.5 text-sm border-b border-border">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between px-5 py-3.5 text-sm border-b border-border">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="font-medium">{fmt(frete)}</span>
                </div>
                <div className="flex justify-between px-5 py-4 bg-white/[0.02]">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-lg font-bold text-green-500">{fmt(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endereço de entrega */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Truck size={14} className="text-muted-foreground" />
                Endereço de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-3">
              <div className="grid grid-cols-2 divide-y divide-border">
                {[
                  { label: "CEP", value: "06220-090" },
                  { label: "Cidade / Estado", value: "Osasco, SP" },
                  { label: "Rua", value: "Av. dos Autonomistas" },
                  { label: "Número", value: "1500" },
                  { label: "Complemento", value: "Apto 42, Bloco B" },
                  { label: "Bairro", value: "Centro" },
                ].map(({ label, value }, i) => (
                  <div
                    key={i}
                    className={`px-5 py-3.5 ${i % 2 === 0 ? "border-r border-border" : ""}`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex gap-2.5 pt-1">
            <Button className="gap-2" onClick={() => navigate('/carrinho')}>
              <ShoppingBag size={14} />
              Ver Minhas Compras
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => navigate('/home')}>
              Continuar Comprando
            </Button>
          </div>
        </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}