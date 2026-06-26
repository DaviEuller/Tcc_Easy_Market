
import { Link, useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Dialogadd_carrinho } from "@/components/Dialog_app"

export function HomePage() {
  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">
            Home
          </span>
        </header>

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

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Consoles</CardTitle>
            </CardHeader>
              <CardContent className="grid grid-cols-4 gap-4 p-6">
                
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="w-full h-auto">
                    
                    <CardHeader>
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
                  <Card key={i} className="w-full h-auto">
                    
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
      </SidebarInset>
    </SidebarProvider>
  );
}