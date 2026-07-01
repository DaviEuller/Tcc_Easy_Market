import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/sidebarapp";
import { Button } from "@/components/ui/button";
import { Dialogadd_carrinho } from "@/components/Dialog_app";
import { produtosApi, urlImagemProduto } from "@/services/api";
import type { Produto } from "@/types/produto";

export function HomePage() {
  const navigate = useNavigate();

  // setor -> lista de produtos daquele setor
  const [produtosPorSetor, setProdutosPorSetor] = useState<Record<string, Produto[]>>({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);

        // 1. pega todos os setores existentes no banco
        const setores = await produtosApi.listarSetores();

        // 2. busca os produtos de cada setor em paralelo
        const resultados = await Promise.all(
          setores.map((setor) => produtosApi.buscarPorSetor(setor)),
        );

        const agrupado: Record<string, Produto[]> = {};
        setores.forEach((setor, i) => {
          agrupado[setor] = resultados[i];
        });

        setProdutosPorSetor(agrupado);
        setErro(null);
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Erro ao carregar produtos");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold">
                Bem-vindo ao EASY MARKET
              </CardTitle>
              <CardDescription className="text-base">
                Transformando a maneira como você faz compras online.
                Compare preços, encontre ofertas e compre com segurança.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Link to="/Login">
                <Button>Entrar</Button>
              </Link>
              <Link to="/Cadastro">
                <Button variant="outline" className="w-full">
                  Cadastrar
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader><CardTitle>Variedade</CardTitle></CardHeader>
              <CardContent>
                Encontre milhares de produtos em diversas categorias.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Melhores Preços</CardTitle></CardHeader>
              <CardContent>
                Compare ofertas e economize nas suas compras.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Segurança</CardTitle></CardHeader>
              <CardContent>
                Ambiente seguro para realizar suas compras online.
              </CardContent>
            </Card>
          </div>

          {carregando && (
            <p className="text-center text-muted-foreground">Carregando produtos...</p>
          )}

          {erro && (
            <p className="text-center text-destructive">{erro}</p>
          )}

          {/* uma seção (Card) para cada setor encontrado no banco */}
          {Object.entries(produtosPorSetor).map(([setor, produtos]) => (
            <Card className="mt-4" key={setor}>
              <CardHeader>
                <CardTitle>{setor}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-4 gap-4 p-6">
                {produtos.map((produto) => (
                  <Card key={produto._id} className="w-full h-auto">
                    <CardHeader>
                      <img
                        src={
                          produto.imagens.length > 0
                            ? urlImagemProduto(produto._id, 0)
                            : "./src/assets/placeholder.jpg"
                        }
                        alt={produto.nome}
                        className="w-full h-70 rounded-lg object-cover"
                      />
                      <CardDescription>{produto.nome}</CardDescription>
                      <CardTitle>
                        {produto.valor.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{produto.setor}</CardDescription>

                      <Button
                        className="w-full mt-4"
                        size="sm"
                        onClick={() => navigate(`/p/${produto._id}`)}
                      >
                        Ver Mais
                      </Button>

                      <Dialogadd_carrinho
                        produto={{
                          id: produto._id,
                          product: produto.nome,
                          quantity: 1,
                          sector: produto.setor,
                          amount: produto.valor,
                        }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}