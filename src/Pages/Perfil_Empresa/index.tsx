import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Camera,
  Globe,
  Package,
  Phone,
  Mail,
  MapPin,
  Save,
  Pencil,
  X,
  Check,
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

export function EmpresaPerfil() {
  const [dados, setDados] = useState<EmpresaData>(dadosIniciais);
  const [editando, setEditando] = useState<string | null>(null);
  const [temp, setTemp] = useState<EmpresaData>(dadosIniciais);
  const [salvando, setSalvando] = useState(false);
  const [salvoRecente, setSalvoRecente] = useState<string | null>(null);

  function iniciarEdicao(secao: string) {
    setTemp({ ...dados });
    setEditando(secao);
  }

  function cancelar() {
    setEditando(null);
    setTemp({ ...dados });
  }

  async function salvar(secao: string) {
    setSalvando(true);
    // Aqui vai a chamada à API: await api.put('/empresa/perfil', temp)
    await new Promise((r) => setTimeout(r, 600));
    setDados({ ...temp });
    setEditando(null);
    setSalvando(false);
    setSalvoRecente(secao);
    setTimeout(() => setSalvoRecente(null), 2500);
  }

  const campo = (
    label: string,
    campo: keyof EmpresaData,
    tipo: string = "text",
    placeholder?: string
  ) => (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        type={tipo}
        value={temp[campo]}
        placeholder={placeholder}
        onChange={(e) => setTemp((p) => ({ ...p, [campo]: e.target.value }))}
        className="h-9"
      />
    </div>
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium text-muted-foreground">
            Perfil da empresa
          </span>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 max-w-3xl mx-auto w-full">

          {/* Capa e logo */}
          <Card>
            <div className="relative h-32 rounded-t-xl bg-gradient-to-r from-blue-600 to-blue-400 overflow-hidden">
              <button className="absolute bottom-2 right-2 flex items-center gap-1.5 text-xs text-white/80 hover:text-white bg-black/20 hover:bg-black/30 rounded-md px-2 py-1 transition-colors">
                <Camera className="h-3.5 w-3.5" />
                Alterar capa
              </button>
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
                <Badge variant="secondary" className="ml-auto mb-1 text-xs">
                  Ativo
                </Badge>
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
                {editando !== "geral" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => iniciarEdicao("geral")}
                    className="gap-1.5 text-xs h-8"
                  >
                    <Pencil className="h-3 w-3" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={cancelar}
                      className="gap-1.5 text-xs h-8"
                    >
                      <X className="h-3 w-3" />
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => salvar("geral")}
                      disabled={salvando}
                      className="gap-1.5 text-xs h-8"
                    >
                      {salvando ? (
                        <span className="animate-pulse">Salvando…</span>
                      ) : (
                        <>
                          <Save className="h-3 w-3" />
                          Salvar
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
              {salvoRecente === "geral" && (
                <div className="flex items-center gap-1.5 text-xs text-green-600 mt-1">
                  <Check className="h-3 w-3" />
                  Alterações salvas
                </div>
              )}
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {editando === "geral" ? (
                <>
                  {campo("Nome fantasia", "nomeFantasia")}
                  {campo("Razão social", "razaoSocial")}
                  {campo("CNPJ", "cnpj", "text", "00.000.000/0000-00")}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Descrição
                    </Label>
                    <Textarea
                      value={temp.descricao}
                      rows={3}
                      onChange={(e) =>
                        setTemp((p) => ({ ...p, descricao: e.target.value }))
                      }
                      className="resize-none text-sm"
                    />
                  </div>
                </>
              ) : (
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
              )}
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
                {editando !== "contato" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => iniciarEdicao("contato")}
                    className="gap-1.5 text-xs h-8"
                  >
                    <Pencil className="h-3 w-3" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={cancelar}
                      className="text-xs h-8"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => salvar("contato")}
                      disabled={salvando}
                      className="text-xs h-8"
                    >
                      {salvando ? (
                        <span className="animate-pulse">Salvando…</span>
                      ) : (
                        <>
                          <Save className="h-3 w-3 mr-1" />
                          Salvar
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
              {salvoRecente === "contato" && (
                <div className="flex items-center gap-1.5 text-xs text-green-600 mt-1">
                  <Check className="h-3 w-3" />
                  Alterações salvas
                </div>
              )}
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {editando === "contato" ? (
                <>
                  {campo("E-mail de contato", "email", "email")}
                  {campo("Telefone", "telefone", "tel")}
                </>
              ) : (
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
              )}
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
                {editando !== "endereco" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => iniciarEdicao("endereco")}
                    className="gap-1.5 text-xs h-8"
                  >
                    <Pencil className="h-3 w-3" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={cancelar}
                      className="text-xs h-8"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => salvar("endereco")}
                      disabled={salvando}
                      className="text-xs h-8"
                    >
                      {salvando ? (
                        <span className="animate-pulse">Salvando…</span>
                      ) : (
                        <>
                          <Save className="h-3 w-3 mr-1" />
                          Salvar
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
              {salvoRecente === "endereco" && (
                <div className="flex items-center gap-1.5 text-xs text-green-600 mt-1">
                  <Check className="h-3 w-3" />
                  Alterações salvas
                </div>
              )}
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {editando === "endereco" ? (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">{campo("CEP", "cep")}</div>
                    <div className="col-span-2">{campo("Rua / Avenida", "rua")}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {campo("Número", "numero")}
                    {campo("Complemento", "complemento")}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>{campo("Bairro", "bairro")}</div>
                    <div>{campo("Cidade", "cidade")}</div>
                    <div>{campo("Estado", "estado")}</div>
                  </div>
                </>
              ) : (
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
              )}
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
                {editando !== "redes" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => iniciarEdicao("redes")}
                    className="gap-1.5 text-xs h-8"
                  >
                    <Pencil className="h-3 w-3" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={cancelar}
                      className="text-xs h-8"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => salvar("redes")}
                      disabled={salvando}
                      className="text-xs h-8"
                    >
                      {salvando ? (
                        <span className="animate-pulse">Salvando…</span>
                      ) : (
                        <>
                          <Save className="h-3 w-3 mr-1" />
                          Salvar
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
              {salvoRecente === "redes" && (
                <div className="flex items-center gap-1.5 text-xs text-green-600 mt-1">
                  <Check className="h-3 w-3" />
                  Alterações salvas
                </div>
              )}
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {editando === "redes" ? (
                <>
                  {campo("Site", "site", "url", "https://seusite.com.br")}
                  <div className="grid grid-cols-3 gap-3">
                    {campo("Instagram", "instagram", "text", "@usuario")}
                    {campo("Facebook", "facebook", "text", "pagina")}
                    {campo("Twitter / X", "twitter", "text", "@usuario")}
                  </div>
                </>
              ) : (
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
                      <search className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{dados.instagram}</span>
                    </div>
                  )}
                  {dados.facebook && (
                    <div className="flex items-center gap-2.5">
                      <search className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{dados.facebook}</span>
                    </div>
                  )}
                  {dados.twitter && (
                    <div className="flex items-center gap-2.5">
                      <search className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span>{dados.twitter}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

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

        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
