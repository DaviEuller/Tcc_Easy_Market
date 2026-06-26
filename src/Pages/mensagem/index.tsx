import { useState, useRef, useEffect } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebarapp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Send,
  MessageCircle,
  Check,
  CheckCheck,
  MoreVertical,
  Phone,
  Video,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────

type Mensagem = {
  id: string;
  texto: string;
  hora: string;
  minha: boolean;       // true = enviada pelo usuário logado
  lida: boolean;
};

type Conversa = {
  id: string;
  nome: string;
  iniciais: string;
  cor: string;          // classe tailwind para o avatar
  ultimaMensagem: string;
  hora: string;
  naoLidas: number;
  online: boolean;
  mensagens: Mensagem[];
};

// ─── Dados de exemplo ─────────────────────────────────────────────────────

const conversasIniciais: Conversa[] = [
  {
    id: "1",
    nome: "Mariana Costa",
    iniciais: "MC",
    cor: "from-purple-500 to-pink-500",
    ultimaMensagem: "Obrigada pelo atendimento! 😊",
    hora: "10:42",
    naoLidas: 2,
    online: true,
    mensagens: [
      { id: "m1", texto: "Olá! Gostaria de saber mais sobre o produto.", hora: "10:30", minha: false, lida: true },
      { id: "m2", texto: "Claro! Qual produto você tem interesse?", hora: "10:31", minha: true, lida: true },
      { id: "m3", texto: "O kit de decoração na página inicial.", hora: "10:33", minha: false, lida: true },
      { id: "m4", texto: "Temos em estoque, posso te enviar mais fotos se quiser.", hora: "10:35", minha: true, lida: true },
      { id: "m5", texto: "Por favor! E qual o prazo de entrega para SP?", hora: "10:38", minha: false, lida: true },
      { id: "m6", texto: "Para São Paulo é de 3 a 5 dias úteis. 🚚", hora: "10:40", minha: true, lida: true },
      { id: "m7", texto: "Perfeito, vou finalizar a compra agora.", hora: "10:41", minha: false, lida: false },
      { id: "m8", texto: "Obrigada pelo atendimento! 😊", hora: "10:42", minha: false, lida: false },
    ],
  },
  {
    id: "2",
    nome: "Rafael Souza",
    iniciais: "RS",
    cor: "from-blue-500 to-cyan-500",
    ultimaMensagem: "Quando chega meu pedido?",
    hora: "09:15",
    naoLidas: 1,
    online: false,
    mensagens: [
      { id: "m1", texto: "Bom dia! Fiz um pedido ontem.", hora: "09:10", minha: false, lida: true },
      { id: "m2", texto: "Bom dia, Rafael! Pode me informar o número do pedido?", hora: "09:12", minha: true, lida: true },
      { id: "m3", texto: "É o #4521.", hora: "09:13", minha: false, lida: true },
      { id: "m4", texto: "Quando chega meu pedido?", hora: "09:15", minha: false, lida: false },
    ],
  },
  {
    id: "3",
    nome: "Loja Artesã",
    iniciais: "LA",
    cor: "from-amber-500 to-orange-500",
    ultimaMensagem: "Você: Confirmo o pedido! ✅",
    hora: "Ontem",
    naoLidas: 0,
    online: true,
    mensagens: [
      { id: "m1", texto: "Olá! Temos uma promoção especial hoje.", hora: "14:00", minha: false, lida: true },
      { id: "m2", texto: "Que ótimo! Me conta mais.", hora: "14:05", minha: true, lida: true },
      { id: "m3", texto: "20% off em todos os itens de cerâmica.", hora: "14:06", minha: false, lida: true },
      { id: "m4", texto: "Confirmo o pedido! ✅", hora: "14:10", minha: true, lida: true },
    ],
  },
  {
    id: "4",
    nome: "Suporte Easy Market",
    iniciais: "EM",
    cor: "from-green-500 to-emerald-500",
    ultimaMensagem: "Seu problema foi resolvido.",
    hora: "Seg",
    naoLidas: 0,
    online: true,
    mensagens: [
      { id: "m1", texto: "Olá! Como posso te ajudar?", hora: "11:00", minha: false, lida: true },
      { id: "m2", texto: "Tive um problema com meu pagamento.", hora: "11:02", minha: true, lida: true },
      { id: "m3", texto: "Pode me passar o ID da transação?", hora: "11:03", minha: false, lida: true },
      { id: "m4", texto: "Seu problema foi resolvido.", hora: "11:20", minha: false, lida: true },
    ],
  },
];

// ─── Componente ──────────────────────────────────────────────────────────

export function Mensagens() {
  const [conversas, setConversas] = useState<Conversa[]>(conversasIniciais);
  const [ativaId, setAtivaId] = useState<string | null>("1");
  const [busca, setBusca] = useState("");
  const [texto, setTexto] = useState("");
  const [mostrarLista, setMostrarLista] = useState(true); // controle mobile
  const fundoRef = useRef<HTMLDivElement>(null);

  const conversa = conversas.find((c) => c.id === ativaId) ?? null;

  const conversasFiltradas = conversas.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Rola para a última mensagem ao abrir conversa
  useEffect(() => {
    fundoRef.current?.scrollTo({ top: fundoRef.current.scrollHeight, behavior: "smooth" });
  }, [ativaId, conversa?.mensagens.length]);

  function abrirConversa(id: string) {
    setAtivaId(id);
    setMostrarLista(false);
    // Marca como lida
    setConversas((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              naoLidas: 0,
              mensagens: c.mensagens.map((m) => ({ ...m, lida: true })),
            }
          : c
      )
    );
  }

  function enviar() {
    if (!texto.trim() || !ativaId) return;
    const nova: Mensagem = {
      id: `m${Date.now()}`,
      texto: texto.trim(),
      hora: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      minha: true,
      lida: false,
    };
    setConversas((prev) =>
      prev.map((c) =>
        c.id === ativaId
          ? { ...c, mensagens: [...c.mensagens, nova], ultimaMensagem: `Você: ${nova.texto}`, hora: nova.hora }
          : c
      )
    );
    setTexto("");
  }

  // Avatar colorido
  function Avatar({ iniciais, cor, size = "md", online }: { iniciais: string; cor: string; size?: "sm" | "md"; online?: boolean }) {
    return (
      <div className="relative shrink-0">
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-gradient-to-br text-white font-semibold",
            size === "sm" ? "h-9 w-9 text-xs" : "h-10 w-10 text-sm",
            cor
          )}
        >
          {iniciais}
        </div>
        {online !== undefined && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full border-2 border-background",
              size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5",
              online ? "bg-green-500" : "bg-muted-foreground/40"
            )}
          />
        )}
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-12 items-center gap-2 border-b px-4 shrink-0">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium text-muted-foreground">Mensagens</span>
          {conversas.reduce((acc, c) => acc + c.naoLidas, 0) > 0 && (
            <Badge className="ml-1 h-5 px-1.5 text-xs">
              {conversas.reduce((acc, c) => acc + c.naoLidas, 0)}
            </Badge>
          )}
        </header>

        {/* Layout: lista + chat side-by-side */}
        <div className="flex flex-1 overflow-hidden h-[calc(100vh-3rem)]">

          {/* ── Lista de conversas ───────────────────────────────────── */}
          <aside
            className={cn(
              "flex flex-col border-r w-72 shrink-0",
              // mobile: esconde lista quando uma conversa está aberta
              !mostrarLista && "hidden md:flex",
              mostrarLista && "flex"
            )}
          >
            {/* Busca */}
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversa…"
                  className="h-8 pl-8 text-xs"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </div>

            {/* Lista */}
            <ScrollArea className="flex-1">
              {conversasFiltradas.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground px-4">
                  <MessageCircle className="h-8 w-8 opacity-30" />
                  <p className="text-xs">Nenhuma conversa encontrada.</p>
                </div>
              ) : (
                <div className="flex flex-col py-1">
                  {conversasFiltradas.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => abrirConversa(c.id)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/60 relative",
                        ativaId === c.id && "bg-muted"
                      )}
                    >
                      <Avatar iniciais={c.iniciais} cor={c.cor} online={c.online} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className={cn("text-sm truncate", c.naoLidas > 0 ? "font-semibold" : "font-medium")}>
                            {c.nome}
                          </span>
                          <span className="text-xs text-muted-foreground shrink-0">{c.hora}</span>
                        </div>
                        <div className="flex items-center justify-between gap-1 mt-0.5">
                          <span className={cn("text-xs truncate", c.naoLidas > 0 ? "text-foreground" : "text-muted-foreground")}>
                            {c.ultimaMensagem}
                          </span>
                          {c.naoLidas > 0 && (
                            <Badge className="h-4 w-4 p-0 flex items-center justify-center text-[10px] shrink-0">
                              {c.naoLidas}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </aside>

          {/* ── Área do chat ─────────────────────────────────────────── */}
          <div
            className={cn(
              "flex flex-col flex-1 min-w-0",
              mostrarLista && "hidden md:flex",
              !mostrarLista && "flex"
            )}
          >
            {conversa ? (
              <>
                {/* Header do chat */}
                <div className="flex items-center gap-3 px-4 h-14 border-b shrink-0">
                  {/* Voltar — mobile */}
                  <button
                    className="md:hidden text-muted-foreground hover:text-foreground"
                    onClick={() => setMostrarLista(true)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>

                  <Avatar iniciais={conversa.iniciais} cor={conversa.cor} online={conversa.online} />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight truncate">{conversa.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {conversa.online ? "Online agora" : "Offline"}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Mensagens */}
                <div
                  ref={fundoRef}
                  className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2"
                >
                  {conversa.mensagens.map((msg, i) => {
                    const anterior = conversa.mensagens[i - 1];
                    const mesmoRemetente = anterior?.minha === msg.minha;

                    return (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex",
                          msg.minha ? "justify-end" : "justify-start",
                          mesmoRemetente ? "mt-0.5" : "mt-3"
                        )}
                      >
                        {/* Avatar da outra pessoa (só no primeiro da sequência) */}
                        {!msg.minha && !mesmoRemetente && (
                          <Avatar iniciais={conversa.iniciais} cor={conversa.cor} size="sm" />
                        )}
                        {!msg.minha && mesmoRemetente && (
                          <div className="w-9 shrink-0" />
                        )}

                        <div
                          className={cn(
                            "max-w-[70%] px-3 py-2 rounded-2xl text-sm leading-relaxed",
                            msg.minha
                              ? "bg-primary text-primary-foreground rounded-br-sm ml-2"
                              : "bg-muted text-foreground rounded-bl-sm ml-2"
                          )}
                        >
                          <p>{msg.texto}</p>
                          <div
                            className={cn(
                              "flex items-center gap-1 mt-1",
                              msg.minha ? "justify-end" : "justify-start"
                            )}
                          >
                            <span
                              className={cn(
                                "text-[10px]",
                                msg.minha ? "text-primary-foreground/60" : "text-muted-foreground"
                              )}
                            >
                              {msg.hora}
                            </span>
                            {msg.minha && (
                              msg.lida
                                ? <CheckCheck className="h-3 w-3 text-primary-foreground/60" />
                                : <Check className="h-3 w-3 text-primary-foreground/60" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input de envio */}
                <div className="px-4 py-3 border-t shrink-0">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Digite uma mensagem…"
                      className="h-9 text-sm"
                      value={texto}
                      onChange={(e) => setTexto(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && enviar()}
                    />
                    <Button
                      size="icon"
                      className="h-9 w-9 shrink-0"
                      onClick={enviar}
                      disabled={!texto.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Estado vazio */
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground p-8">
                <MessageCircle className="h-12 w-12 opacity-20" />
                <div>
                  <p className="text-sm font-medium">Nenhuma conversa aberta</p>
                  <p className="text-xs mt-1">Selecione uma conversa na lista ao lado.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}