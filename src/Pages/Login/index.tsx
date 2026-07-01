import { useState } from "react"
        import { Link, useNavigate } from "react-router-dom"
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
import { Navbar } from "@/components/sidebarapp"

const API_URL = "http://localhost:3000"

export function CardDemo() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro("")
    setCarregando(true)

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Backend throws UnauthorizedException with a message property
        setErro(data.message ?? "Erro ao fazer login. Tente novamente.")
        return
      }

      // Decode the JWT payload (middle part, base64url encoded)
      const payload = JSON.parse(
        atob(data.access_token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
      )

      // Save token and user info to localStorage
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("usuario_id", payload.sub)
      localStorage.setItem("usuario_email", payload.email)
      localStorage.setItem("usuario_nome", payload.nome)
      localStorage.setItem("usuario_tipo", payload.tipo)

      // Redirect to the home/dashboard page after successful login
      navigate("/")
    } catch {
      setErro("Não foi possível conectar ao servidor. Tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  async function handleEsqueceuSenha(e: React.MouseEvent) {
    e.preventDefault()
    navigate("/esqueci-senha")
  }

  return (
    <>
      <Navbar />

        <header className="flex h-12 items-center gap-2 border-b px-4">
          <span className="text-sm font-medium text-muted-foreground">
            Login
          </span>
        </header>
        <div className="flex min-h-screen items-center justify-center bg-background p-6">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Faça o login na Easy Market</CardTitle>
              <CardDescription>
                Entre com seu e-mail e senha para acessar sua conta.
              </CardDescription>
              <CardAction>
                <Button asChild variant="link">
                  <Link to="/cadastro">Cadastre-se</Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form id="login-form" onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                      <a
                        href="/esqueci-senha"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        onClick={handleEsqueceuSenha}
                      >
                        Esqueceu sua senha?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </div>

                  {/* Error message */}
                  {erro && (
                    <p className="text-sm text-destructive">{erro}</p>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                form="login-form"
                className="w-full"
                disabled={carregando}
              >
                {carregando ? "Entrando..." : "Entrar na Easy Market"}
              </Button>
            </CardFooter>
          </Card>
        </div>
    </>
  )
}     