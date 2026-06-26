"use client"

import { type ColumnDef } from "@tanstack/react-table"

export type Sale_compras = {
  id: string
  image: string
  product: string
  quantity: number
  tracking_code: number
  amount: number
  status: "pendente" | "enviado" | "entregue" | "cancelado"
}

export const columns_Compras: ColumnDef<Sale_compras>[] = [
  {
    accessorKey: "image",
    header: "Produto",
    cell: ({ row }) => (
      <img
        src={row.getValue("image")}
        alt={row.original.product}
        className="w-14 h-14 object-cover rounded-md"
      />
    ),
  },
  {
    accessorKey: "product",
    header: "Nome",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "tracking_code",
    header: "Codigo de rastreamento",
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      return (
        <div>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Sale_compras["status"]

      const styles = {
        pendente:  "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        enviado:   "bg-blue-500/20   text-blue-400   border-blue-500/30",
        entregue:  "bg-green-500/20  text-green-400  border-green-500/30",
        cancelado: "bg-red-500/20    text-red-400    border-red-500/30",
      }

      const labels = {
        pendente:  "Pendente",
        enviado:   "Enviado",
        entregue:  "Entregue",
        cancelado: "Cancelado",
      }

      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
          {labels[status]}
        </span>
      )
    },
  },
]