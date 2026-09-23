import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import type { TipoProduto } from "../../types/types";

export default function EditarProdutos() {

    const { id } = useParams<{id:string}>();

    const navigate = useNavigate();

    const [produto,setProduto] = useState<TipoProduto>({} as TipoProduto);

    useEffect( () => {

        const carregarProduto = async () => {

            try{
            const response = await fetch(`http://localhost:3001/produtos/${id}`);

            if(!response.ok){
                throw new Error("Produto não encontrado!");
            }

            const data:TipoProduto = await response.json();
            console.log(data);
            setProduto(data);

            }catch(error){
                console.error(error);
            }
        }
        carregarProduto();
    },[]);

    // const produto = listaProdutos.find( ( p )=> p.id === Number(id));
    
    const alterarDadosCampo = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target;
        setProduto({...produto, [name]: value});
    }

    const onSubmit = async ()=>{

        try{

            const response = await fetch(`http://localhost:3001/produtos/${produto.id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(produto)
            });

            if(!response.ok){
                throw new Error(`Erro ao atualizar o produto : ${response.status} - ${response.
                statusText}`);
            }

            navigate("/produtos");
        }catch(error){
            console.error(error);
        }
    }

    return (
        <main>
            <h2>Editar Produtos</h2>
            <div>
                <form>
                    <fieldset>
                        <legend>Produto:{produto.nome}</legend>
                        <div>
                            <label htmlFor="nome">Nome produto:</label>
                            <input type="text" name="nome" id="nome" value={produto.nome} onChange={(e) => alterarDadosCampo(e)} />
                        </div>
                        <div>
                            <label htmlFor="estoque">Estoque:</label>
                            <input type="number" name="estoque" id="estoque" value={produto.estoque} onChange={(e) => alterarDadosCampo(e)} />
                        </div>
                        <div>
                            <label htmlFor="preco">Preço:</label>
                            <input type="number" name="preco" id="preco" value={produto.preco} onChange={(e) => alterarDadosCampo(e)} />
                        </div>
                        <div>
                            <button>Atualizar</button>
                        </div>
                    </fieldset>
                </form>
            </div>

        </main>
    );
}
