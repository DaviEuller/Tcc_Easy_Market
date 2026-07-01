import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
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

export function CardCadastro() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    nome: "",
    senha: "",
    confirmPassword: "",
    cpf: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (formData.senha !== formData.confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          nome: formData.nome,
          senha: formData.senha,
          cpf: formData.cpf,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Erro ao criar conta.")
      }

      navigate("/login") // redireciona após cadastro
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen items-center justify-center bg-background p-6">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Faça o cadastro na Easy Market</CardTitle>
              <CardDescription>
                Preencha os campos abaixo para criar sua conta.
              </CardDescription>
              <CardAction>
                <Button asChild variant="link">
                  <Link to="/login">Já tenho conta</Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form id="cadastro-form" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seuemail@example.com" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input id="nome" type="text" placeholder="Seu nome completo" value={formData.nome} onChange={handleChange} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="senha">Senha</Label>
                    <Input id="senha" type="password" value={formData.senha} onChange={handleChange} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" type="text" value={formData.cpf} onChange={handleChange} required />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" form="cadastro-form" className="w-full" disabled={loading}>
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>
            </CardFooter>
          </Card>
        </div>
    </>
  )
}