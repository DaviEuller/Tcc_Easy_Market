import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Minus, Plus, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/sidebarapp";
import { Dialogadd_carrinho } from "@/components/Dialog_app";
import { produtosApi, urlImagemProduto } from "@/services/api";
import type { Produto } from "@/types/produto";

export function Produto_detalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // --- estado da compra ---
  const [quantidade, setQuantidade] = useState(1);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [comprando, setComprando] = useState(false);
  const [compraConcluida, setCompraConcluida] = useState(false);
  const [erroCompra, setErroCompra] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    produtosApi
      .buscarPorId(id)
      .then(setProduto)
      .catch((e) => setErro(e instanceof Error ? e.message : "Produto não encontrado"))
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-10 text-muted-foreground">Carregando produto...</p>
      </>
    );
  }

  if (erro || !produto) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-10 space-y-4">
          <p className="text-destructive">{erro ?? "Produto não encontrado"}</p>
          <Button variant="outline" onClick={() => navigate(-1)}>Voltar</Button>
        </div>
      </>
    );
  }

  const estoqueDisponivel = produto.quantidade;
  const total = produto.valor * quantidade;

  function aumentarQuantidade() {
    setQuantidade((q) => Math.min(q + 1, estoqueDisponivel));
  }

  function diminuirQuantidade() {
    setQuantidade((q) => Math.max(q - 1, 1));
  }

  function abrirDialogCompra() {
    setErroCompra(null);
    setCompraConcluida(false);
    setDialogAberto(true);
  }

  async function confirmarCompra() {
    if (!produto) return;
    setComprando(true);
    setErroCompra(null);

    try {
      // Ajuste este método conforme o endpoint real da sua API de pedidos.
      // Exemplo esperado: produtosApi.comprar(id, quantidade)
      await produtosApi.comprar(produto._id, quantidade);

      setCompraConcluida(true);
      // Atualiza o estoque exibido localmente
      setProduto((p) =>
        p ? { ...p, quantidade: p.quantidade - quantidade } : p
      );
    } catch (e) {
      setErroCompra(
        e instanceof Error ? e.message : "Não foi possível concluir a compra."
      );
    } finally {
      setComprando(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <img
                src={
                  produto.imagens.length > 0
                    ? urlImagemProduto(produto._id, 0)
                    : "./src/assets/placeholder.jpg"
                }
                alt={produto.nome}
                className="w-full h-96 rounded-lg object-cover"
              />
              <CardTitle className="text-2xl mt-4">{produto.nome}</CardTitle>
              <CardDescription>{produto.setor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-3xl font-bold">
                {produto.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-muted-foreground">
                Quantidade disponível: {produto.quantidade}
              </p>

              {/* Seletor de quantidade */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantidade:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={diminuirQuantidade}
                    disabled={quantidade <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-medium">{quantidade}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={aumentarQuantidade}
                    disabled={quantidade >= estoqueDisponivel}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-lg">
                Total:{" "}
                <span className="font-bold">
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Botão de comprar agora */}
                <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
                  <DialogTrigger asChild>
                    <Button
                      className="flex-1"
                      disabled={estoqueDisponivel === 0}
                      onClick={abrirDialogCompra}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {estoqueDisponivel === 0 ? "Sem estoque" : "Comprar agora"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {!compraConcluida ? (
                      <>
                        <DialogHeader>
                          <DialogTitle>Confirmar compra</DialogTitle>
                          <DialogDescription>
                            Revise os detalhes antes de finalizar.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-2 py-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Produto</span>
                            <span className="font-medium">{produto.nome}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Quantidade</span>
                            <span className="font-medium">{quantidade}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Valor unitário</span>
                            <span className="font-medium">
                              {produto.valor.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between text-base pt-2 border-t">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold">
                              {total.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </div>
                        </div>

                        {erroCompra && (
                          <p className="text-sm text-destructive">{erroCompra}</p>
                        )}

                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setDialogAberto(false)}
                            disabled={comprando}
                          >
                            Cancelar
                          </Button>
                          <Button onClick={confirmarCompra} disabled={comprando}>
                            {comprando ? "Processando..." : "Confirmar compra"}
                          </Button>
                        </DialogFooter>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-center gap-3 py-4">
                        <CheckCircle2 className="h-12 w-12 text-green-600" />
                        <DialogTitle>Compra concluída!</DialogTitle>
                        <DialogDescription>
                          Seu pedido de {quantidade}x {produto.nome} foi realizado
                          com sucesso.
                        </DialogDescription>
                        <Button onClick={() => setDialogAberto(false)} className="mt-2">
                          Fechar
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                {/* Botão para adicionar ao carrinho, mantido como já existia */}
                <Dialogadd_carrinho
                  produto={{
                    id: produto._id,
                    product: produto.nome,
                    quantity: quantidade,
                    sector: produto.setor,
                    amount: produto.valor,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}