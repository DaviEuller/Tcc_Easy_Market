"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Check } from "lucide-react"
import { useState } from "react"
import {DialogExcluirProduto } from "@/components/Dialog_app"

export type Sale_carrinho = {
  id: string
  product: string
  quantity: number
  amount: number
}

function EditQuantityCell({
  row,
  onUpdate,
}: {
  row: any
  onUpdate: (id: string, quantity: number) => void
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState<number>(row.getValue("quantity"))

  const handleConfirm = () => {
    if (value < 1) return
    onUpdate(row.original.id, value)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-20 h-8"
          autoFocus
        />
        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleConfirm}>
          <Check className="h-4 w-4 text-green-500" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span>{row.getValue("quantity")}</span>
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditing(true)}>
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Agora é uma função que recebe onUpdate
export const columns_Carrinho = (
  onUpdate: (id: string, quantity: number) => void
): ColumnDef<Sale_carrinho>[] => [
  {
    accessorKey: "product",
    header: "Produto",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
    cell: ({ row }) => (
      <EditQuantityCell row={row} onUpdate={onUpdate} />
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div>Valor</div>,
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
  id: "actions",
  header: "Ações",
  cell: ({ row }) => {
    const produto = row.original
    return (
      <DialogExcluirProduto
        produto={produto}
        onDelete={(id) => console.log("Excluir id:", id)}
      />
    )
  },
},
]