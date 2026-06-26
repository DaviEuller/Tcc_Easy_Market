import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Tag, Users, Building2, DollarSign, Star, ArrowUpDown, Package, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categorias = ["Todos", "Consoles", "Camisas", "Eletrônicos"];
const papeisUsuario = ["Todos", "Admin", "Comprador", "Vendedor"];
const setoresEmpresa = ["Todos", "Tecnologia", "Varejo", "Moda", "Eletrônicos"];

function SectionTitle({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function ChipButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-2.5 py-1 rounded-md text-xs font-medium border transition-all duration-150
        ${active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
        }
      `}
    >
      {label}
    </button>
  );
}

export function FiltrosExplorar() {
  const [categoria, setCategoria] = useState("Todos");
  const [precoRange, setPrecoRange] = useState([0, 5000]);
  const [estrelasMin, setEstrelasMin] = useState(0);
  const [ordenar, setOrdenar] = useState("relevancia");
  const [filtroEmEstoque, setFiltroEmEstoque] = useState(false);
  const [filtroFreteGratis, setFiltroFreteGratis] = useState(false);
  const [filtroVendedorVerificado, setFiltroVendedorVerificado] = useState(false);
  const [buscaUsuario, setBuscaUsuario] = useState("");
  const [papelUsuario, setPapelUsuario] = useState("Todos");
  const [buscaEmpresa, setBuscaEmpresa] = useState("");
  const [setorEmpresa, setSetorEmpresa] = useState("Todos");

  const totalFiltrosAtivos = [
    categoria !== "Todos",
    precoRange[0] > 0 || precoRange[1] < 5000,
    estrelasMin > 0,
    ordenar !== "relevancia",
    filtroEmEstoque,
    filtroFreteGratis,
    filtroVendedorVerificado,
    buscaUsuario !== "",
    papelUsuario !== "Todos",
    buscaEmpresa !== "",
    setorEmpresa !== "Todos",
  ].filter(Boolean).length;

  function limparTudo() {
    setCategoria("Todos");
    setPrecoRange([0, 5000]);
    setEstrelasMin(0);
    setOrdenar("relevancia");
    setFiltroEmEstoque(false);
    setFiltroFreteGratis(false);
    setFiltroVendedorVerificado(false);
    setBuscaUsuario("");
    setPapelUsuario("Todos");
    setBuscaEmpresa("");
    setSetorEmpresa("Todos");
  }

  return (
    <div className="flex flex-col h-full w-64 bg-background">

      {/* Cabeçalho do painel */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros</span>
          {totalFiltrosAtivos > 0 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {totalFiltrosAtivos}
            </Badge>
          )}
        </div>
        {totalFiltrosAtivos > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={limparTudo}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex flex-col gap-0 overflow-y-auto flex-1">

        {/* Categoria */}
        <div className="px-4 py-4">
          <SectionTitle icon={Tag} label="Categoria" />
          <div className="flex flex-wrap gap-1.5">
            {categorias.map(c => (
              <ChipButton
                key={c}
                label={c}
                active={categoria === c}
                onClick={() => setCategoria(c)}
              />
            ))}
          </div>
        </div>

        <Separator />

        {/* Usuários */}
        <div className="px-4 py-4">
          <SectionTitle icon={Users} label="Usuários" />
          <Input
            placeholder="Buscar usuário..."
            value={buscaUsuario}
            onChange={e => setBuscaUsuario(e.target.value)}
            className="h-8 text-sm mb-2.5"
          />
          <div className="flex flex-wrap gap-1.5">
            {papeisUsuario.map(r => (
              <ChipButton
                key={r}
                label={r}
                active={papelUsuario === r}
                onClick={() => setPapelUsuario(r)}
              />
            ))}
          </div>
        </div>

        <Separator />

        {/* Empresas */}
        <div className="px-4 py-4">
          <SectionTitle icon={Building2} label="Empresas" />
          <Input
            placeholder="Buscar empresa..."
            value={buscaEmpresa}
            onChange={e => setBuscaEmpresa(e.target.value)}
            className="h-8 text-sm mb-2.5"
          />
          <div className="flex flex-wrap gap-1.5">
            {setoresEmpresa.map(s => (
              <ChipButton
                key={s}
                label={s}
                active={setorEmpresa === s}
                onClick={() => setSetorEmpresa(s)}
              />
            ))}
          </div>
        </div>

        <Separator />

        {/* Faixa de preço */}
        <div className="px-4 py-4">
          <SectionTitle icon={DollarSign} label="Faixa de preço" />
          <Slider
            min={0}
            max={5000}
            step={50}
            value={precoRange}
            onValueChange={setPrecoRange}
            className="mt-1 mb-3"
          />
          <div className="flex justify-between">
            <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded text-muted-foreground">
              R$ {precoRange[0].toLocaleString("pt-BR")}
            </span>
            <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded text-muted-foreground">
              R$ {precoRange[1].toLocaleString("pt-BR")}
            </span>
          </div>
        </div>

        <Separator />

        {/* Avaliação */}
        <div className="px-4 py-4">
          <SectionTitle icon={Star} label="Avaliação mínima" />
          <div className="flex flex-wrap gap-1.5">
            {[0, 3, 4, 5].map(n => (
              <ChipButton
                key={n}
                label={n === 0 ? "Todas" : `${n}+ ★`}
                active={estrelasMin === n}
                onClick={() => setEstrelasMin(n)}
              />
            ))}
          </div>
        </div>

        <Separator />

        {/* Ordenar por */}
        <div className="px-4 py-4">
          <SectionTitle icon={ArrowUpDown} label="Ordenar por" />
          <Select value={ordenar} onValueChange={setOrdenar}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevancia">Relevância</SelectItem>
              <SelectItem value="menor-preco">Menor preço</SelectItem>
              <SelectItem value="maior-preco">Maior preço</SelectItem>
              <SelectItem value="avaliacao">Melhor avaliação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Disponibilidade */}
        <div className="px-4 py-4">
          <SectionTitle icon={Package} label="Disponibilidade" />
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                checked={filtroEmEstoque}
                onCheckedChange={(v) => setFiltroEmEstoque(!!v)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Em estoque
              </span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                checked={filtroFreteGratis}
                onCheckedChange={(v) => setFiltroFreteGratis(!!v)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Frete grátis
              </span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                checked={filtroVendedorVerificado}
                onCheckedChange={(v) => setFiltroVendedorVerificado(!!v)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Vendedor verificado
              </span>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}