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

export function EsqueciSenha() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  async function handleEnviarCodigo(e: React.FormEvent) {
    e.preventDefault()
    setErro("")
    setCarregando(true)

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErro(data.message ?? "Erro ao enviar o código. Tente novamente.")
        return
      }

      navigate("/r", {
        state: { email },
      })
    } catch {
      setErro("Não foi possível conectar ao servidor. Tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <>
      <Navbar />

      <header className="flex h-12 items-center gap-2 border-b px-4">
        <span className="text-sm font-medium text-muted-foreground">
          Esqueci minha senha
        </span>
      </header>
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Recuperar acesso à sua conta</CardTitle>
            <CardDescription>
              Digite o e-mail cadastrado para receber o código de recuperação.
            </CardDescription>
            <CardAction>
              <Button asChild variant="link">
                <Link to="/login">Voltar ao login</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form id="esqueci-senha-form" onSubmit={handleEnviarCodigo}>
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

                {erro && (
                  <p className="text-sm text-destructive">{erro}</p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              form="esqueci-senha-form"
              className="w-full"
              disabled={carregando}
            >
              {carregando ? "Enviando..." : "Enviar código"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
