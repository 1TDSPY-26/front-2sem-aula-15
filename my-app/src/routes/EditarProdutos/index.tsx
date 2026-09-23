import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";
import type { TipoProduto } from "../../types/types";

export default function EditarProdutos() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<TipoProduto>({} as TipoProduto);

  useEffect(() => {
    async function carregarProduto() {
      try {
        const response = await fetch(`http://localhost:3001/produtos/${id}`);

        if (!response.ok) {
          throw new Error("A listagem dos produtos falhou!");
        }

        const data: TipoProduto = await response.json();
        setProduto(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    carregarProduto();
  }, []);

  // const produto = listaProdutos.find((p) => p.id === Number(id))

  function editarDados(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  }

  async function onSubmit() {
    try {
      const response = await fetch(
        `http://localhost:3001/produtos/${produto.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produto), // Aqui convertemos o produto para em Json
        },
      );

      if (!response.ok) {
        throw new Error(
          `Erro ao atualizar o produto: ${response.status} ${response.statusText}`,
        );
      }

      // Redirect
      navigate("/produtos");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h2>Editar Produtos</h2>
      <div>
        <form>
          <fieldset>
            <legend>Produtos: {produto.nome} </legend>

            <div>
              <label htmlFor="nome">Nome Produto: </label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={produto.nome}
                onChange={(e) => editarDados(e)}
              />
            </div>

            <div>
              <label htmlFor="estoque">Estoque: </label>
              <input
                type="number"
                name="estoque"
                id="estoque"
                value={produto.estoque}
                onChange={(e) => editarDados(e)}
              />
            </div>

            <div>
              <label htmlFor="preco">Preço: </label>
              <input
                type="number"
                name="preco"
                id="preco"
                value={produto.preco}
                onChange={(e) => editarDados(e)}
              />
            </div>

            <div>
              <button type="button" onClick={onSubmit}>Atualizar</button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
