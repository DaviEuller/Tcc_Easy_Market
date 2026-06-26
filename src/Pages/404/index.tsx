import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Card404() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <span className="text-2xl">🗺️</span>
          </div>
          <CardTitle className="text-8xl font-medium tracking-tighter">
            404
          </CardTitle>
          <div className="mx-auto my-4 h-0.5 w-12 bg-border" />
          <CardTitle className="text-xl">Página não encontrada</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            A página que você está procurando foi movida, removida ou nunca existiu.
          </CardDescription>
        </CardHeader>

        <CardFooter className="justify-center">
          <Button asChild variant="outline">
            <Link to="/">
              ← Voltar para home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}