import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronsUpDown,
  ChevronDown,
  LayoutDashboard,
  BarChart2,
  Search,
  ShoppingCart,
  ShoppingBag,
  Building2,
  MessageCircleMore,
  Bolt,
  User2,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Um item de navegação dentro de um grupo com dropdown (ex: "Login" dentro de "Conta")
interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

// Um grupo de navegação: ou é um link direto (tem `to`), ou é um dropdown (tem `items`)
interface NavGroup {
  label: string;
  icon: LucideIcon;
  to?: string;
  items?: NavItem[];
}

// Itens agrupados por setor, para reduzir a quantidade de informação
// visível de uma vez. Cada grupo vira um botão com dropdown no hover.
const navGroups: NavGroup[] = [
  {
    label: "Início",
    icon: LayoutDashboard,
    to: "/", // grupo de item único: clica e navega direto
  },
  {
    label: "EasyChat", to: "/m", icon: MessageCircleMore 
  },
  {
    label: "Conta",
    icon: User2,
    items: [
      { label: "Login", to: "/login", icon: BarChart2 },
      { label: "Dashboard", to: "/Dashboard", icon: BarChart2 },
      { label: "Perfil de usuário", to: "/user", icon: User2 },
      { label: "Perfil da empresa", to: "/empresaperfi", icon: Building2 },
    ],
  },
  {
    label: "Compras",
    icon: ShoppingBag,
    items: [
      { label: "Explorar", to: "/Explorar", icon: Search },
      { label: "Minhas Compras", to: "/Compras", icon: ShoppingBag },
      { label: "Carrinho", to: "/Carrinho", icon: ShoppingCart },
    ],
  },
  { label: "Configuração", to: "/c", icon: Bolt },


];

function NavGroupDesktop({ group }: { group: NavGroup }) {
  const Icon = group.icon;

  // Grupo de item único (ex: Início) — link direto, sem dropdown
  if (group.to) {
    return (
      <Button variant="ghost" asChild size="sm">
        <Link to={group.to} className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {group.label}
        </Link>
      </Button>
    );
  }

  return (
    <div className="group relative">
      <Button variant="ghost" size="sm" className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {group.label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
      </Button>

      {/* Ponte invisível entre o botão e o dropdown, evita "gap" no hover */}
      <div className="absolute left-0 top-full h-2 w-full" />

      <div
        className="invisible absolute left-0 top-full z-50 min-w-[14rem] translate-y-1 rounded-md border
                   bg-popover p-1 opacity-0 shadow-md transition-all duration-150
                   group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
      >
        {(group.items ?? []).map(({ label, to, icon: ItemIcon }: NavItem) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <ItemIcon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function NavGroupMobile({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const [aberto, setAberto] = useState(false);
  const Icon = group.icon;

  if (group.to) {
    return (
      <Button variant="ghost" asChild className="justify-start">
        <Link to={group.to} className="flex items-center gap-2" onClick={onNavigate}>
          <Icon className="h-4 w-4" />
          {group.label}
        </Link>
      </Button>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-between"
        onClick={() => setAberto((prev) => !prev)}
      >
        <span className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {group.label}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${aberto ? "rotate-180" : ""}`}
        />
      </Button>

      {aberto && (
        <div className="ml-4 flex flex-col gap-1 border-l pl-2">
          {(group.items ?? []).map(({ label, to, icon: ItemIcon }: NavItem) => (
            <Button
              key={to}
              variant="ghost"
              asChild
              className="justify-start"
              onClick={onNavigate}
            >
              <Link to={to} className="flex items-center gap-2">
                <ItemIcon className="h-4 w-4" />
                {label}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const [nomeUsuario, setNomeUsuario] = useState("Usuário");
  const [emailUsuario, setEmailUsuario] = useState("usuario@email.com");
  const [iniciaisUsuario, setIniciaisUsuario] = useState("U");

  useEffect(() => {
    const email = localStorage.getItem("usuario_email");
    const nome = localStorage.getItem("usuario_nome");

    if (email) {
      setEmailUsuario(email);

      // Gera iniciais a partir do email (ex: "joao.silva@..." → "JS")
      const partes = email.split("@")[0].split(/[.\-_]/);
      const iniciais = partes
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() ?? "")
        .join("");
      setIniciaisUsuario(iniciais || "U");

      // Usa como nome caso não haja nome separado
      if (nome) {
        setNomeUsuario(nome.charAt(0).toUpperCase() + nome.slice(1));
      } else {
        // Usa a primeira parte do email como nome
        setNomeUsuario(partes[0].charAt(0).toUpperCase() + partes[0].slice(1));
      }
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo — empresa */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white text-sm font-bold">
            EM
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold">Easy Market</span>
            <span className="text-xs text-muted-foreground">Enterprise</span>
          </div>
        </Link>

        {/* Links - desktop, agrupados por setor */}
        <div className="hidden items-center gap-1 lg:flex">
          {navGroups.map((group) => (
            <NavGroupDesktop key={group.label} group={group} />
          ))}
        </div>

        {/* Usuário - desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs font-semibold">
            {iniciaisUsuario}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">{nomeUsuario}</span>
            <span className="text-xs text-muted-foreground">{emailUsuario}</span>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Botão menu - mobile */}
        <button
          className="lg:hidden"
          onClick={() => setMenuAberto((prev) => !prev)}
          aria-label="Abrir menu"
        >
          {menuAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Links - mobile, agrupados em acordeão */}
      {menuAberto && (
        <div className="flex flex-col gap-1 border-t px-4 py-2 lg:hidden">
          {navGroups.map((group) => (
            <NavGroupMobile
              key={group.label}
              group={group}
              onNavigate={() => setMenuAberto(false)}
            />
          ))}

          {/* Usuário - mobile */}
          <div className="mt-2 flex items-center justify-between border-t px-2 pt-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs font-semibold">
                {iniciaisUsuario}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium">{nomeUsuario}</span>
                <span className="text-xs text-muted-foreground">{emailUsuario}</span>
              </div>
            </div>
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </nav>
  );
}