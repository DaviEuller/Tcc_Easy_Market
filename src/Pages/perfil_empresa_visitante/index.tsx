import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/sidebarapp";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Camera,
  Flag,
  Share2,
  Globe,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Package,
} from "lucide-react";

type EmpresaData = {
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  descricao: string;
  email: string;
  telefone: string;
  site: string;
  instagram: string;
  facebook: string;
  twitter: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
};

const dadosIniciais: EmpresaData = {
  nomeFantasia: "Easy Market",
  razaoSocial: "Easy Market Comércio Ltda.",
  cnpj: "12.345.678/0001-99",
  descricao:
    "Marketplace focado em conectar pequenos e médios lojistas com clientes de todo o Brasil.",
  email: "contato@easymarket.com.br",
  telefone: "(11) 99999-0000",
  site: "https://easymarket.com.br",
  instagram: "@easymarket",
  facebook: "easymarket",
  twitter: "@easymarket",
  cep: "01310-100",
  rua: "Av. Paulista",
  numero: "1000",
  complemento: "Sala 202",
  bairro: "Bela Vista",
  cidade: "São Paulo",
  estado: "SP",
};

export function EmpresaPerfil_V() {
  const [dados] = useState<EmpresaData>(dadosIniciais);

  return (
    <>
      <Navbar />

        <header className="flex h-12 items-center gap-2 border-b px-4">
          <span className="text-sm font-medium text-muted-foreground">
            Perfil da empresa
          </span>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 max-w-3xl mx-auto w-full">

          {/* Capa e logo */}
          <Card>
            <div className="relative h-32 rounded-t-xl bg-gradient-to-r from-blue-600 to-blue-400 overflow-hidden">
              
                
            </div>
            <CardContent className="pt-0">
              <div className="flex items-end gap-4 -mt-8 mb-4">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-blue-600 text-white text-2xl font-bold border-4 border-background shadow-sm">
                    EM
                  </div>
                  <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:opacity-80 transition-opacity">
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <div className="pb-1">
                  <h1 className="text-lg font-semibold leading-tight">
                    {dados.nomeFantasia}
                  </h1>
                  
                  <p className="text-sm text-muted-foreground">
                    {dados.razaoSocial}
                  </p>

                  
                </div>
                
                <div className="flex gap-2 ml-auto pb-1">
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                    <Share2 className="h-3.5 w-3.5" />
                    Compartilhar
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground">
                    <Flag className="h-3.5 w-3.5" />
                    Denunciar
                  </Button>
                  <Button size="sm" className="h-8 text-xs gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" />
                    Mensagem
                  </Button>
                </div>
                
              </div>
            </CardContent>
          </Card>

          {/* Dados gerais */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 className="h-4 w-4" />
                    Dados da empresa
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Nome, CNPJ e descrição pública
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Nome fantasia
                  </p>
                  <p className="font-medium">{dados.nomeFantasia}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">CNPJ</p>
                  <p className="font-medium font-mono">{dados.cnpj}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Razão social
                  </p>
                  <p>{dados.razaoSocial}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Descrição
                  </p>
                  <p className="text-muted-foreground">{dados.descricao}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Phone className="h-4 w-4" />
                    Contato
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    E-mail e telefone de atendimento
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{dados.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{dados.telefone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <MapPin className="h-4 w-4" />
                    Endereço da loja
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Localização física do estabelecimento
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="text-sm flex flex-col gap-1">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p>
                      {dados.rua}, {dados.numero}
                      {dados.complemento && ` — ${dados.complemento}`}
                    </p>
                    <p className="text-muted-foreground">
                      {dados.bairro} · {dados.cidade}/{dados.estado} · CEP{" "}
                      {dados.cep}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Redes sociais */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Globe className="h-4 w-4" />
                    Redes sociais
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Site e perfis das redes sociais da empresa
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 text-sm">
                {dados.site && (
                  <div className="flex items-center gap-2.5">
                    <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                    <a
                      href={dados.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {dados.site}
                    </a>
                  </div>
                )}
                {dados.instagram && (
                  <div className="flex items-center gap-2.5">
                    <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{dados.instagram}</span>
                  </div>
                )}
                {dados.facebook && (
                  <div className="flex items-center gap-2.5">
                    <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{dados.facebook}</span>
                  </div>
                )}
                {dados.twitter && (
                  <div className="flex items-center gap-2.5">
                    <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{dados.twitter}</span>
                  </div>
                )}

                 <div className="flex items-center gap-2.5">
                    <Button size="sm" className="h-8 text-xs gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" />
                    Mensagem
                  </Button>
                  </div>
              </div>
            </CardContent>
          </Card>

          {/* ============================================================
              ÁREA DE PRODUTOS DA EMPRESA
              Adicione aqui os componentes da listagem/gerenciamento de produtos.
              Sugestões: tabela de produtos, grid de cards, filtros, paginação, etc.
              ============================================================ */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Package className="h-4 w-4" />
                    Produtos da empresa
                  </CardTitle>
                </div>

              </div>
            </CardHeader>
            <CardContent>
              {/* TODO: inserir listagem de produtos aqui */}
              <div className="flex flex-col items-center justify-center py-10 text-center gap-2 text-muted-foreground">
                <Package className="h-8 w-8 opacity-30" />
                <p className="text-sm">Nenhum produto cadastrado ainda.</p>
              </div>
            </CardContent>
          </Card>
          {/* ============================================================ */}

        </main>
    </>
  );
}