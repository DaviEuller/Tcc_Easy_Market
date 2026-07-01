export interface Produto {
  _id: string;
  nome: string;
  quantidade: number;
  setor: string;
  valor: number;
  imagens: { contentType: string; originalName: string }[];
  createdAt?: string;
  updatedAt?: string;
}
