import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  ChevronsUpDown,
  LayoutDashboard,
  BarChart2,
  Search,
  ShoppingCart,
  ShoppingBag,
  Building2,
  MessageCircleMore,
  Bolt ,
  User2,
} from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      {/* Header — empresa */}
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white text-sm font-bold">
              EM
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Easy Market</span>
              <span className="text-xs text-muted-foreground">Enterprise</span>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {/* Links principais */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Início</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/login">
                    <BarChart2 className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>


            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/Dashboard">
                <BarChart2 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/Explorar">
                <Search className="h-4 w-4" />
                <span>Explorar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/Compras">
                <ShoppingBag className="h-4 w-4" />
                <span>Minhas Compras</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/Carrinho">
                <ShoppingCart className="h-4 w-4" />
                <span>Carrinho</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Empresa */}
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/empresaperfi">
                <Building2 className="h-4 w-4" />
                <span>Perfil da empresa</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>


          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/user">
                <User2 className="h-4 w-4" />
                <span>Perfil de usuario</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/m">
                <MessageCircleMore className="h-4 w-4" />
                <span>EasyChat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>


          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/c">
                <Bolt className="h-4 w-4" />
                <span>Configuração</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          
        </SidebarGroup>
        <SidebarSeparator />
      </SidebarContent>

      

      {/* Footer — usuário */}
      <SidebarSeparator />
      <SidebarFooter>
        <div className="flex items-center justify-between px-2 py-2">
          
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs font-semibold">
              U
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium">Usuário</span>
              <span className="text-xs text-muted-foreground">usuario@email.com</span>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
