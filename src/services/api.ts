import type { Produto } from "@/types/produto";

// Coloque a URL do backend em um .env: VITE_API_URL=http://localhost:3000
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// Wrapper genérico de fetch: já monta a URL, trata erro HTTP e faz o parse do JSON
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    // O backend usa NotFoundException do Nest, que devolve { message: "..." }
    const erro = await res.json().catch(() => null);
    throw new Error(erro?.message ?? `Erro ${res.status} ao acessar ${path}`);
  }

  return res.json() as Promise<T>;
}

// Monta a URL pública de uma imagem do produto (index 0 = primeira imagem)
export function urlImagemProduto(produtoId: string, index = 0) {
  return `${API_URL}/produtos/${produtoId}/imagem/${index}`;
}

export const produtosApi = {
  listarTodos: () => apiFetch<Produto[]>("/produtos"),

  buscarPorId: (id: string) => apiFetch<Produto>(`/produtos/${id}`),

  buscarPorSetor: (setor: string) =>
    apiFetch<Produto[]>(`/produtos/buscar/setor?setor=${encodeURIComponent(setor)}`),

  buscarPorNome: (nome: string) =>
    apiFetch<Produto[]>(`/produtos/buscar/nome?nome=${encodeURIComponent(nome)}`),

  buscarPorPreco: (min?: number, max?: number) => {
    const params = new URLSearchParams();
    if (min !== undefined) params.set("min", String(min));
    if (max !== undefined) params.set("max", String(max));
    return apiFetch<Produto[]>(`/produtos/buscar/preco?${params.toString()}`);
  },

  listarSetores: () => apiFetch<string[]>("/produtos/setores"),
};
