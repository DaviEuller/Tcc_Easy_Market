"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

export type Sale = {
  id: string
  name: string
  email: string
  phone: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
}

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "amount",
    header: () => <div>Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div >{formatted}</div>
    },
  },
  {
    id: "actions",
    header: "Contato",
    cell: ({ row }) => {
      const sale = row.original
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`mailto:${sale.email}`)}
          >
            <Mail className="h-4 w-4 mr-1" />
            E-mail
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`tel:${sale.phone}`)}
          >
            <Phone className="h-4 w-4 mr-1" />
            Ligar
          </Button>
        </div>
      )
    },
  },
]