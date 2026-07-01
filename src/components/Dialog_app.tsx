"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImagePicker } from "@/components/ui/ImagePicker"

type Produto = {
  id: string
  product: string
  quantity: number
  sector: string
  amount: number
}

// ─── Cadastrar ───────────────────────────────────────────────────────────────

export function DialogCadastroProduto() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ product: "", quantity: "", sector: "", amount: "" })
  const [images, setImages] = useState<File[]>([])

  function handleSubmit() {
    console.log("Cadastrar:", form)
    // TODO: chamar sua API aqui
    setForm({ product: "", quantity: "", sector: "", amount: "" })
    setOpen(false)
  }

  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Cadastrar Produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Produto</DialogTitle>
          <DialogDescription>Preencha os dados do novo produto.</DialogDescription>
        </DialogHeader>

        <ImagePicker
          onImageSelect={(files) =>
            setImages((prev) => [...prev, ...files])
          }
        />

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="product">Nome do Produto</Label>
            <Input
              id="product"
              placeholder="Ex: Notebook Pro"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Ex: 10"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sector">Setor</Label>
            <Input
              id="sector"
              placeholder="Ex: TI"
              value={form.sector}
              onChange={(e) => setForm({ ...form, sector: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Ex: 1250.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Editar ──────────────────────────────────────────────────────────────────

type DialogEditarProps = {
  produto: Produto
  onSave: (produto: Produto) => void
}

export function DialogEditarProduto({ produto, onSave }: DialogEditarProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    product: produto.product,
    quantity: String(produto.quantity),
    sector: produto.sector,
    amount: String(produto.amount),
  })

  function handleSubmit() {
    onSave({
      ...produto,
      product: form.product,
      quantity: Number(form.quantity),
      sector: form.sector,
      amount: Number(form.amount),
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Editar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>Altere os dados do produto.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-product">Nome do Produto</Label>
            <Input
              id="edit-product"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-quantity">Quantidade</Label>
            <Input
              id="edit-quantity"
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-sector">Setor</Label>
            <Input
              id="edit-sector"
              value={form.sector}
              onChange={(e) => setForm({ ...form, sector: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-amount">Valor (R$)</Label>
            <Input
              id="edit-amount"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Excluir ─────────────────────────────────────────────────────────────────

type DialogExcluirProps = {
  produto: Produto
  onDelete: (id: string) => void
}

export function DialogExcluirProduto({ produto, onDelete }: DialogExcluirProps) {
  const [open, setOpen] = useState(false)

  function handleDelete() {
    onDelete(produto.id)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">Excluir</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Excluir Produto</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir <strong>{produto.product}</strong>? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type DialogAddCarrinhoProps = {
  produto: Produto
}

export function Dialogadd_carrinho({ produto }: DialogAddCarrinhoProps) {
  const [open, setOpen] = useState(false)


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4"size="sm"> Adicionar ao carrinho </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Adicionar ao Carrinho </DialogTitle>
          <DialogDescription>
            Tem certeza que deseja Adiocionar <strong>{produto.product}</strong>? 
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button >Adiocionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}