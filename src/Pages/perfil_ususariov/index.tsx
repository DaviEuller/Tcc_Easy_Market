import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Navbar } from "@/components/sidebarapp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  ShoppingBag,
  MessageCircle,
  Heart,
  Calendar,
  Flag,
  Share2,
} from "lucide-react";

// ─── Tipos de dados públicos do perfil ─────────────────────────────────────

type PerfilPublico = {
  nome: string;
  cidade: string;
  estado: string;
  membroDesde: string;          // ex: "março de 2022"
  avaliacao: number;            // 0–5
  totalAvaliacoes: number;
  compras: number;
  favoritos: number;
  bio: string;
  interesses: string[];         // tags de categoria
};

// ─── Dados de exemplo (substitua pela chamada de API) ───────────────────────

const perfilExemplo: PerfilPublico = {
  nome: "Mariana Costa",
  cidade: "São Paulo",
  estado: "SP",
  membroDesde: "março de 2022",
  avaliacao: 4.7,
  totalAvaliacoes: 38,
  compras: 124,
  favoritos: 57,
  bio: "Apaixonada por decoração, moda sustentável e gastronomia. Sempre em busca de produtos únicos de pequenos produtores.",
  interesses: ["Decoração", "Moda", "Gastronomia", "Artesanato", "Plantas"],
};

// ─── Componente ─────────────────────────────────────────────────────────────

export function PerfilUsuarioVisitante() {
  const perfil = perfilExemplo;

  const iniciais = perfil.nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Renderiza estrelas preenchidas / meia / vazias
  function Estrelas({ valor }: { valor: number }) {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`h-3.5 w-3.5 ${
              valor >= n
                ? "fill-amber-400 text-amber-400"
                : valor >= n - 0.5
                ? "fill-amber-200 text-amber-400"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <Navbar />

        <header className="flex h-12 items-center gap-2 border-b px-4">
          <span className="text-sm font-medium text-muted-foreground">
            Perfil público
          </span>

          {/* Badge indicando modo visitante */}
          <Badge
            variant="secondary"
            className="ml-2 text-xs gap-1 bg-amber-100 text-amber-700 border-amber-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 inline-block" />
            Modo visitante
          </Badge>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 max-w-2xl mx-auto w-full">

          {/* ── Hero do perfil ─────────────────────────────────────────── */}
          <Card className="overflow-hidden">
            {/* Banner decorativo */}
            <div className="h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400" />

            <CardContent className="pt-0 pb-5">
              <div className="flex items-end gap-4 -mt-8 mb-4">
                {/* Avatar */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-semibold border-4 border-background shadow-sm shrink-0">
                  {iniciais}
                </div>

                {/* Ações rápidas (visível para visitantes) */}
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

              {/* Nome + localização */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg font-semibold leading-tight">{perfil.nome}</h1>
                  <Badge variant="secondary" className="text-xs">Cliente</Badge>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{perfil.cidade}, {perfil.estado}</span>
                  <span className="text-muted-foreground/40 mx-1">·</span>
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>Membro desde {perfil.membroDesde}</span>
                </div>

                {/* Avaliação */}
                <div className="flex items-center gap-2 mt-1">
                  <Estrelas valor={perfil.avaliacao} />
                  <span className="text-sm font-medium">{perfil.avaliacao.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">
                    ({perfil.totalAvaliacoes} avaliações)
                  </span>
                </div>
              </div>

              {/* Bio */}
              {perfil.bio && (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-t pt-3">
                  {perfil.bio}
                </p>
              )}
            </CardContent>
          </Card>

          {/* ── Estatísticas ───────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-4 pb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shrink-0">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xl font-semibold leading-tight">{perfil.compras}</p>
                  <p className="text-xs text-muted-foreground">Compras realizadas</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 pb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-500 shrink-0">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xl font-semibold leading-tight">{perfil.favoritos}</p>
                  <p className="text-xs text-muted-foreground">Itens favoritados</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Interesses ─────────────────────────────────────────────── */}
          {perfil.interesses.length > 0 && (
            <Card>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                  Interesses
                </p>
                <div className="flex flex-wrap gap-2">
                  {perfil.interesses.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Aviso de modo visitante ─────────────────────────────────── */}
          <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <span className="mt-0.5 h-4 w-4 shrink-0 text-amber-500">ℹ</span>
            <p>
              Você está vendo este perfil como um <strong>visitante</strong>. 
              Informações privadas como e-mail, CPF e endereço não são exibidas.
            </p>
          </div>

        </main>
    </>
  );
}