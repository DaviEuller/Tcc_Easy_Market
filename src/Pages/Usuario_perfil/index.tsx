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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Camera,
  Pencil,
  Save,
  X,
  Check,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Mail,
} from "lucide-react";

type UsuarioData = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
};

type EnderecoData = {
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
};

type SenhaData = {
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
};

const usuarioInicial: UsuarioData = {
  nome: "Usuário",
  email: "usuario@email.com",
  telefone: "(11) 99999-0000",
  cpf: "000.000.000-00",
};

const enderecoInicial: EnderecoData = {
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
};

const senhaInicial: SenhaData = {
  senhaAtual: "",
  novaSenha: "",
  confirmarSenha: "",
};

export function PerfilUsuario() {
  const [usuario, setUsuario] = useState<UsuarioData>(usuarioInicial);
  const [endereco, setEndereco] = useState<EnderecoData>(enderecoInicial);

  const [editando, setEditando] = useState<string | null>(null);
  const [tempUsuario, setTempUsuario] = useState<UsuarioData>(usuarioInicial);
  const [tempEndereco, setTempEndereco] = useState<EnderecoData>(enderecoInicial);
  const [senha, setSenha] = useState<SenhaData>(senhaInicial);

  const [salvando, setSalvando] = useState(false);
  const [salvoRecente, setSalvoRecente] = useState<string | null>(null);
  const [erroSenha, setErroSenha] = useState<string | null>(null);

  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const [buscandoCep, setBuscandoCep] = useState(false);

  function iniciarEdicao(secao: string) {
    setTempUsuario({ ...usuario });
    setTempEndereco({ ...endereco });
    setErroSenha(null);
    setEditando(secao);
  }

  function cancelar() {
    setEditando(null);
    setErroSenha(null);
    setSenha(senhaInicial);
  }

  async function salvar(secao: string) {
    if (secao === "senha") {
      if (!senha.senhaAtual) {
        setErroSenha("Informe a senha atual.");
        return;
      }
      if (senha.novaSenha.length < 6) {
        setErroSenha("A nova senha precisa ter pelo menos 6 caracteres.");
        return;
      }
      if (senha.novaSenha !== senha.confirmarSenha) {
        setErroSenha("As senhas não coincidem.");
        return;
      }
    }

    setSalvando(true);
    // Aqui vai a chamada à API:
    // if (secao === "dados")   await api.put('/usuarios/me', tempUsuario)
    // if (secao === "endereco") await api.put('/usuarios/me/endereco', tempEndereco)
    // if (secao === "senha")   await api.put('/usuarios/me/senha', { senhaAtual: senha.senhaAtual, novaSenha: senha.novaSenha })
    await new Promise((r) => setTimeout(r, 600));

    if (secao === "dados") setUsuario({ ...tempUsuario });
    if (secao === "endereco") setEndereco({ ...tempEndereco });
    if (secao === "senha") setSenha(senhaInicial);

    setEditando(null);
    setSalvando(false);
    setErroSenha(null);
    setSalvoRecente(secao);
    setTimeout(() => setSalvoRecente(null), 2500);
  }

  async function buscarCep(cep: string) {
    const limpo = cep.replace(/\D/g, "");
    if (limpo.length !== 8) return;
    setBuscandoCep(true);
    try {
      // await api.get(`/cep/${limpo}`) ou usar ViaCEP diretamente
      const res = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setTempEndereco((p) => ({
          ...p,
          rua: data.logradouro || p.rua,
          bairro: data.bairro || p.bairro,
          cidade: data.localidade || p.cidade,
          estado: data.uf || p.estado,
        }));
      }
    } catch {
      // silencioso — usuário preenche manualmente
    }
    setBuscandoCep(false);
  }

  const iniciais = usuario.nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const enderecoPreenchido = !!endereco.rua;

  function BotoesEdicao({ secao }: { secao: string }) {
    return editando !== secao ? (
      <Button
        variant="outline"
        size="sm"
        onClick={() => iniciarEdicao(secao)}
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
          className="text-xs h-8 gap-1"
        >
          <X className="h-3 w-3" />
          Cancelar
        </Button>
        <Button
          size="sm"
          onClick={() => salvar(secao)}
          disabled={salvando}
          className="text-xs h-8 gap-1"
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
    );
  }

  function ConfirmacaoSalvo({ secao }: { secao: string }) {
    return salvoRecente === secao ? (
      <div className="flex items-center gap-1.5 text-xs text-green-600 mt-1">
        <Check className="h-3 w-3" />
        Alterações salvas
      </div>
    ) : null;
  }

  function CampoInput(
    label: string,
    value: string,
    onChange: (v: string) => void,
    opts?: { tipo?: string; placeholder?: string; disabled?: boolean }
  ) {
    return (
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <Input
          type={opts?.tipo ?? "text"}
          value={value}
          placeholder={opts?.placeholder}
          disabled={opts?.disabled}
          onChange={(e) => onChange(e.target.value)}
          className="h-9"
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />

        <header className="flex h-12 items-center gap-2 border-b px-4">
          <span className="text-sm font-medium text-muted-foreground">
            Meu perfil
          </span>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 max-w-2xl mx-auto w-full">

          {/* Avatar + nome */}
          <Card>
            <CardContent className="pt-6 pb-5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl font-semibold border-2 border-background shadow-sm">
                    {iniciais}
                  </div>
                  <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:opacity-80 transition-opacity">
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <div>
                  <p className="text-base font-semibold">{usuario.nome}</p>
                  <p className="text-sm text-muted-foreground">{usuario.email}</p>
                </div>
                <Badge variant="secondary" className="ml-auto text-xs">
                  Cliente
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Dados pessoais */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <User className="h-4 w-4" />
                    Dados pessoais
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Nome, e-mail, telefone e CPF
                  </CardDescription>
                </div>
                <BotoesEdicao secao="dados" />
              </div>
              <ConfirmacaoSalvo secao="dados" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {editando === "dados" ? (
                <>
                  {CampoInput("Nome completo", tempUsuario.nome, (v) =>
                    setTempUsuario((p) => ({ ...p, nome: v }))
                  )}
                  {CampoInput("E-mail", tempUsuario.email, (v) =>
                    setTempUsuario((p) => ({ ...p, email: v }), ), { tipo: "email" }
                  )}
                  {CampoInput("Telefone", tempUsuario.telefone, (v) =>
                    setTempUsuario((p) => ({ ...p, telefone: v })), { tipo: "tel" }
                  )}
                  {CampoInput("CPF", tempUsuario.cpf, () => {}, {
                    disabled: true,
                    placeholder: "000.000.000-00",
                  })}
                  <p className="text-xs text-muted-foreground -mt-2">
                    O CPF não pode ser alterado.
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-3 text-sm">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Nome</p>
                      <p className="font-medium">{usuario.nome}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">CPF</p>
                      <p className="font-mono">{usuario.cpf}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{usuario.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{usuario.telefone}</span>
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
                    Endereço padrão
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Usado como endereço de entrega nas compras
                  </CardDescription>
                </div>
                <BotoesEdicao secao="endereco" />
              </div>
              <ConfirmacaoSalvo secao="endereco" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {editando === "endereco" ? (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <Label className="text-xs text-muted-foreground">CEP</Label>
                      <Input
                        className="h-9 mt-1.5"
                        value={tempEndereco.cep}
                        placeholder="00000-000"
                        onChange={(e) => {
                          const v = e.target.value;
                          setTempEndereco((p) => ({ ...p, cep: v }));
                          buscarCep(v);
                        }}
                      />
                      {buscandoCep && (
                        <p className="text-xs text-muted-foreground mt-1 animate-pulse">
                          Buscando…
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      {CampoInput("Rua / Avenida", tempEndereco.rua, (v) =>
                        setTempEndereco((p) => ({ ...p, rua: v }))
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {CampoInput("Número", tempEndereco.numero, (v) =>
                      setTempEndereco((p) => ({ ...p, numero: v }))
                    )}
                    {CampoInput("Complemento", tempEndereco.complemento, (v) =>
                      setTempEndereco((p) => ({ ...p, complemento: v }))
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {CampoInput("Bairro", tempEndereco.bairro, (v) =>
                      setTempEndereco((p) => ({ ...p, bairro: v }))
                    )}
                    {CampoInput("Cidade", tempEndereco.cidade, (v) =>
                      setTempEndereco((p) => ({ ...p, cidade: v }))
                    )}
                    {CampoInput("Estado", tempEndereco.estado, (v) =>
                      setTempEndereco((p) => ({ ...p, estado: v }))
                    )}
                  </div>
                </>
              ) : enderecoPreenchido ? (
                <div className="flex items-start gap-2.5 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p>
                      {endereco.rua}, {endereco.numero}
                      {endereco.complemento && ` — ${endereco.complemento}`}
                    </p>
                    <p className="text-muted-foreground">
                      {endereco.bairro} · {endereco.cidade}/{endereco.estado} · CEP {endereco.cep}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <MapPin className="h-8 w-8 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">
                    Nenhum endereço cadastrado.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 mt-1"
                    onClick={() => iniciarEdicao("endereco")}
                  >
                    Adicionar endereço
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trocar senha */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lock className="h-4 w-4" />
                    Senha
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Troque sua senha de acesso
                  </CardDescription>
                </div>
                <BotoesEdicao secao="senha" />
              </div>
              <ConfirmacaoSalvo secao="senha" />
            </CardHeader>
            <CardContent>
              {editando === "senha" ? (
                <div className="flex flex-col gap-4">
                  {/* Senha atual */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">Senha atual</Label>
                    <div className="relative">
                      <Input
                        type={mostrarSenhaAtual ? "text" : "password"}
                        value={senha.senhaAtual}
                        className="h-9 pr-10"
                        onChange={(e) =>
                          setSenha((p) => ({ ...p, senhaAtual: e.target.value }))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setMostrarSenhaAtual((v) => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {mostrarSenhaAtual ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Nova senha */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">Nova senha</Label>
                    <div className="relative">
                      <Input
                        type={mostrarNovaSenha ? "text" : "password"}
                        value={senha.novaSenha}
                        className="h-9 pr-10"
                        onChange={(e) =>
                          setSenha((p) => ({ ...p, novaSenha: e.target.value }))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setMostrarNovaSenha((v) => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {mostrarNovaSenha ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {senha.novaSenha.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex gap-1 flex-1">
                          {[1, 2, 3, 4].map((n) => (
                            <div
                              key={n}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                senha.novaSenha.length >= n * 3
                                  ? n <= 1
                                    ? "bg-red-400"
                                    : n <= 2
                                    ? "bg-amber-400"
                                    : n <= 3
                                    ? "bg-yellow-400"
                                    : "bg-green-500"
                                  : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {senha.novaSenha.length < 4
                            ? "Fraca"
                            : senha.novaSenha.length < 7
                            ? "Média"
                            : senha.novaSenha.length < 10
                            ? "Boa"
                            : "Forte"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Confirmar senha */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Confirmar nova senha
                    </Label>
                    <div className="relative">
                      <Input
                        type={mostrarConfirmar ? "text" : "password"}
                        value={senha.confirmarSenha}
                        className="h-9 pr-10"
                        onChange={(e) =>
                          setSenha((p) => ({ ...p, confirmarSenha: e.target.value }))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setMostrarConfirmar((v) => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {mostrarConfirmar ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {senha.confirmarSenha.length > 0 &&
                      senha.novaSenha !== senha.confirmarSenha && (
                        <p className="text-xs text-destructive mt-0.5">
                          As senhas não coincidem.
                        </p>
                      )}
                  </div>

                  {erroSenha && (
                    <p className="text-xs text-destructive -mt-1">{erroSenha}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sua senha está protegida. Clique em Editar para alterá-la.
                </p>
              )}
            </CardContent>
          </Card>

          

        </main>
    </>
  );
}