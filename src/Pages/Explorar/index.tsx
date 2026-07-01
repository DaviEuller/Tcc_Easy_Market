import {useNavigate} from "react-router-dom";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Navbar } from "@/components/sidebarapp";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Dialogadd_carrinho } from "@/components/Dialog_app";
import { FiltrosExplorar } from "@/components/filtersapp";

export function Explorar() {
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

        {/* Header — botão de filtros e busca */}
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <span className="text-sm font-medium text-muted-foreground">
            Explorar
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setFiltrosAbertos(prev => !prev)}
            className="flex items-center gap-2"
          >
            {filtrosAbertos ? (
              <>
                <X className="h-4 w-4" />
                Fechar filtros
              </>
            ) : (
              <>
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
              </>
            )}
          </Button>

          <Field orientation="horizontal">
            <Input type="search" placeholder="Pesquisar..." />
            <Button>Pesquisar</Button>
          </Field>
        </header>

        {/* Layout abaixo do header: filtros + produtos lado a lado */}
        <div className="flex min-h-screen">

          {/* Painel de filtros — desliza ao abrir */}
          <aside
            className={`border-r bg-background overflow-hidden transition-all duration-300 ${
              filtrosAbertos ? "w-64" : "w-0"
            }`}
          >
            <div className="w-64">
              <FiltrosExplorar />
            </div>
          </aside>

          {/* Produtos */}
          <div className="flex-1 bg-background p-6">
            <div className="mx-auto max-w-7xl space-y-8">

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Consoles</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-4 p-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card
                      key={i}
                      className="w-full h-auto cursor-pointer"
                    >
                      <CardHeader >
                        <img src="./src/assets/ps6.jpg" alt="Logo" className="w-full h-70 rounded-lg" />
                        <CardDescription>PS6 - Real</CardDescription>
                        <CardTitle>R$ 1000,00</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          Esse Playstation 6 é real não é fake
                        </CardDescription>
                        
                        <Button  className="w-full mt-4"size="sm" onClick={() => navigate(`/p`)}>Ver Mais</Button>
                        <Dialogadd_carrinho
                          produto={{
                            id: String(i),
                            product: "PS6 - Real",
                            quantity: 1,
                            sector: "Consoles",
                            amount: 1000,
                          }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Camisas</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-4 p-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="w-full h-auto" >
                      <CardHeader>
                        <img src="./src/assets/brasil.jpg" alt="Logo" className="w-full h-70 rounded-lg" />
                        <CardDescription>Camisa do Brasil</CardDescription>
                        <CardTitle>R$ 100,00</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          Esse Playstation 6 é real não é fake
                        </CardDescription>
                        
                        <Button  className="w-full mt-4"size="sm" onClick={() => navigate(`/p`)}>Ver Mais</Button>
                        <Dialogadd_carrinho
                          produto={{
                            id: String(i),
                            product: "PS6 - Real",
                            quantity: 1,
                            sector: "Consoles",
                            amount: 1000,
                          }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
    </>
  );
}