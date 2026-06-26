import { useState } from "react";
import { Star, Truck, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebarapp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const produto = {
  nome: "Camisa do Brasil",
  preco: 100.0,
  descricao:
    "Camisa oficial da seleção brasileira com tecnologia de absorção de suor e tecido de alta performance.",
  empresa: {
    nome: "Easy Market Enterprise",
    iniciais: "EM",
    verificada: true,
  },
  avaliacao: 4.5,
  totalAvaliacoes: 128,
  tamanhos: ["P", "M", "G", "GG"],
  avaliacoes: [
    {
      nome: "João Carlos",
      iniciais: "JC",
      nota: 5,
      comentario: "Produto excelente, chegou rápido e a qualidade é muito boa!",
    },
    {
      nome: "Maria Santos",
      iniciais: "MS",
      nota: 4,
      comentario:
        "Ótima camisa, tecido confortável e o tamanho bate certo com a tabela.",
    },
  ],
};

function StarRating({ nota, size = 16 }: { nota: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.floor(nota)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground"
          }
        />
      ))}
    </div>
  );
}

export function Produto_detalhes() {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("M");

  const parcelamento = (produto.preco / 3).toFixed(2);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">
            {produto.nome}
          </span>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagem do produto */}
            <div className="flex flex-col gap-3">
              <div className="aspect-square rounded-xl border bg-muted flex items-center justify-center overflow-hidden">
                <img
                  src="/placeholder-produto.jpg"
                  alt={produto.nome}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-lg border bg-muted cursor-pointer hover:border-primary transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* Informações do produto */}
            <div className="flex flex-col gap-4">
              {/* Empresa */}
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7 text-xs">
                  <AvatarFallback>{produto.empresa.iniciais}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-primary">
                  {produto.empresa.nome}
                </span>
                {produto.empresa.verificada && (
                  <Badge variant="secondary" className="text-xs">
                    Verificado
                  </Badge>
                )}
              </div>

              {/* Nome e avaliação */}
              <div>
                <h1 className="text-2xl font-semibold">{produto.nome}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating nota={produto.avaliacao} />
                  <span className="text-sm text-muted-foreground">
                    {produto.avaliacao} ({produto.totalAvaliacoes} avaliações)
                  </span>
                </div>
              </div>

              <Separator />

              {/* Preço */}
              <div>
                <p className="text-3xl font-semibold">
                  R$ {produto.preco.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  em até 3x de R$ {parcelamento.replace(".", ",")} sem juros
                </p>
              </div>

              {/* Tamanho */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Tamanho</p>
                <div className="flex gap-2">
                  {produto.tamanhos.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTamanhoSelecionado(t)}
                      className={`w-10 h-10 rounded-md border text-sm font-medium transition-colors ${
                        tamanhoSelecionado === t
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-3 mt-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <ShoppingCart size={16} />
                  Adicionar ao carrinho
                </Button>
                <Button className="flex-1">Comprar agora</Button>
              </div>

              {/* Frete */}
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Truck size={14} />
                Frete grátis para compras acima de R$ 150
              </p>
            </div>
          </div>

          {/* Descrição */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Descrição do produto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {produto.descricao}
              </p>
            </CardContent>
          </Card>

          {/* Avaliações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Avaliações ({produto.totalAvaliacoes})
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {produto.avaliacoes.map((av, i) => (
                <div key={i} className="flex flex-col gap-2">
                  {i > 0 && <Separator />}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7 text-xs">
                        <AvatarFallback>{av.iniciais}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{av.nome}</span>
                    </div>
                    <StarRating nota={av.nota} size={13} />
                  </div>
                  <p className="text-sm text-muted-foreground pl-9">
                    {av.comentario}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}