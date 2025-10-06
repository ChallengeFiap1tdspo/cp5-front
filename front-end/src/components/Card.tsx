import type { TipoProduto } from "../data/listaProdutos";

export default function Card({ produto }: { produto: TipoProduto }) {
  return (
    <article className="border-2 bg-[#1b1b1b] text-white p-4 m-2 w-60 h-40 rounded">
      <h2 className="text-lg font-semibold">{produto.nome}</h2>
      <p>ID: {produto.id}</p>
      <p>Preço: R$ {produto.preco}</p>
    </article>
  );
}
