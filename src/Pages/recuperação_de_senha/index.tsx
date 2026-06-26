
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebarapp"

export function Esqueceusenha() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">
            Recuperar senha
          </span>
        </header>
        <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Recuperação de senha</CardTitle>
          <CardDescription>
              Coloque o codigo que foi enviado ao seu email
          </CardDescription>
          <CardAction>

          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="Codigo">Codigo</Label>
                <Input
                  id="codigo"
                  type="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Nova Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                  </a>
                </div>
                
                <Input id="password" type="password" required />

                <div className="flex items-center">
                  <Label htmlFor="password">Confirmar Nova Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                  </a>
                </div>
                
                <Input id="password" type="password" required />
              </div>
            </div>
            
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Recuperar
          </Button>
        </CardFooter>
      </Card>
    </div>
    </SidebarInset>
    </SidebarProvider>
  )
}
