
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
  import React, { useState } from "react"
    import { Navbar } from "@/components/sidebarapp"
  import { useNavigate } from "react-router-dom"

  const API_URL = "http://localhost:3000"




  

  export function Esqueceusenha() {
    
    const navigate = useNavigate()
    const [codigo, setCodigo] = useState("")
    const [nsenha, setNsenha] = useState("")
    const [,setErro] = useState("")
    const [carregando, setCarregando] = useState(false)

    async function handleNovaSenha(e: React.FormEvent) {

    e.preventDefault()
    setErro("")
    setCarregando(true)

      try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: codigo,
          novaSenha: nsenha,
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setErro(data.message ?? "Erro ao fazer login. tente novamente.")
        return
      }

      navigate("/")
    } catch (error) {
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
            <form id="esqueceu-form" onSubmit={handleNovaSenha}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="Codigo">Codigo</Label>
                  <Input
                    id="codigo"
                    type="text"
                    required
                    onChange={(e) => setCodigo(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password"

                    >Nova Senha</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                    </a>
                  </div>
                  
                  <Input type="password" required 
                    id="Nova_Senha"
                    onChange={(e) => setNsenha(e.target.value)}/>

                  <div className="flex items-center">
                    <Label htmlFor="password">Confirmar Nova Senha</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                    </a>
                  </div>
                  
                  <Input  type="password" required 
                    id="Confirmar_Senha"/>
                </div>
              </div>
              
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" form="esqueceu-form"className="w-full">
              {carregando ? "Recuperando..." : "Recuperar Senha"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
    )
  }
