"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DialogEditarProduto, DialogExcluirProduto } from "@/components/Dialog_app"

export type Sale_produtos = {
  id: string
  product: string
  quantity: number
  sector: string
  amount: number
}

export const columns_produtos: ColumnDef<Sale_produtos>[] = [
  {
    accessorKey: "product",
    header: "Produto",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "sector",
    header: "Setor",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div className="text-right">{formatted}</div>
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const produto = row.original
      return (
        <div className="flex gap-2">
          <DialogEditarProduto
            produto={produto}
            onSave={(atualizado) => console.log("Salvar:", atualizado)}
          />
          <DialogExcluirProduto
            produto={produto}
            onDelete={(id) => console.log("Excluir id:", id)}
          />
        </div>
      )
    },
  },
]