Aula-09/09/2026 - USE-EFFECT
------------------------------------------

==============================================================================

# Guia de Configuração e Execução do Projeto

Siga o passo a passo abaixo para clonar, configurar o ambiente com Git Flow e executar o projeto localmente.

---

### 1. Clonar o repositório
```bash
git clone <endereço-remoto-repositorio>
```

### 2. Verificar branches locais
```bash
git branch
```

### 3. Verificar branches remotas
```bash
git branch -a
```

### 4. Inicializar a estrutura do Git Flow
Inicia a estrutura do Git Flow no projeto e muda automaticamente para a branch `develop`:
```bash
git flow init
```

> **Atenção (PC da Instituição):** Caso o Git Flow não esteja instalado no Windows, execute:
> ```bash
> winget install GitTower.GitFlowNext
> ```

### 5. Mudar para a branch de trabalho desejada
```bash
git switch <nomeDaBranch>
# ou
git checkout <nomeDaBranch>
```

### 6. Acessar a pasta da aplicação
```bash
cd my-app
```

### 7. Listar o conteúdo da pasta atual
```bash
ls
```

### 8. Abrir o VS Code a partir do Git Bash
```bash
code .
```

### 9. Encerrar o Git Bash
```bash
exit
```

### 10. Abrir o terminal no VS Code e instalar dependências
No VS Code, abra um novo terminal usando o **Command Prompt (CMD)** e instale as dependências:
```bash
npm install
# ou
npm i
```
> **Atenção:** Certifique-se de que o terminal está dentro da pasta `my-app`.

### 11. Executar o projeto em modo de desenvolvimento
```bash
npm run dev
```

=============================================================================================================================================================================

# Guia de Sincronização de Branches com o Professor

Se o seu código está diferente ou você não tem o conteúdo atual do professor, identifique sua situação e siga os passos correspondentes abaixo.

---

### 1. Acabou de clonar o repositório OU ainda não criou sua branch
*(Você não tem branch de trabalho e precisa começar exatamente do ponto onde o professor parou)*

1. Atualize a lista de branches do servidor:
```bash
git fetch origin
```

2. Crie a sua branch diretamente a partir da branch do professor:
```bash
git switch -c feature/exemplo-rmSeuRM origin/feature/exemplo-pf0670
```
> Substitua `rmSeuRM` pelo seu RM real (ex: `feature/exemplo-rm12345`).

---

### 

### 3. Sua branch deu erro/conflito e você quer descartar tudo e ficar idêntico ao professor
*(Para quem perdeu a aula, quebrou o código ou quer zerar o ambiente com o código oficial do professor)*

1. Acesse a sua branch:
```bash
git switch feature/exemplo-rmSeuRM
```

2. Baixe os dados atualizados:
```bash
git fetch origin
```

3. Force a sua branch a ficar exatamente igual à do professor:
```bash
git reset --hard origin/feature/exemplo-pf0670
```

> **Atenção:** O comando `git reset --hard` apaga qualquer alteração local não sincronizada e alinha tudo 100% com a branch do professor.


============================================================================================================================================================================


# useEffect: O hook que controla a rerenderização!!

Neste guia, vamos aprender como reagir a mudanças no seu projeto utilizando ganchos (**Hooks**):

* **O que é o `useEffect`?**  
  O `useEffect` é um hook nativo do React que atua como um observador. Ele serve para disparar ações secundárias (efeitos colaterais) sempre que algo muda ou quando um componente precisa se re-renderizar, sem interferir diretamente no fluxo visual da tela.

* **O que é o `useLocation`?**  
  O `useLocation` também é um hook, mas fornecido pelo `react-router`. Ele atua como uma antena que lê em tempo real os dados da URL atual da aplicação (caminho, parâmetros e estado).

Ao juntar os dois, criamos uma rotina automática que reage toda vez que o usuário navega por uma rota.

---

### Passo 1: Criar o Componente Observador de Rota

Crie o arquivo `src/components/ObservadorDeRota.tsx`:

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function ObservadorDeRota() {
  const location = useLocation();

  useEffect(() => {
    // 1. Exibe a rota acessada no console
    console.log(`Rota acessada: ${location.pathname}`);

    // 2. Altera o título da aba do navegador
    document.title = `Aplicação | ${location.pathname}`;

    // 3. Rola a visualização de volta ao topo
    window.scrollTo(0, 0);

  }, [location]); // Dependência que dispara o hook

  return null;
}
```

> **Explicação do Passo 1:**
> * `useLocation()`: Ativa a leitura do endereço da aplicação e guarda em `location`.
> * `useEffect(..., [location])`: O hook fica vigiando o valor de `location`. Se ele mudar, o código dentro da função roda imediatamente.
> * `return null`: O componente executa apenas tarefas de lógica e não adiciona elementos visuais ao HTML.

---

### Passo 2: Importar e Adicionar no `App.tsx`

Abra o arquivo `src/App.tsx` e coloque o observador no topo da estrutura:

```tsx
import { Outlet } from 'react-router';
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import ObservadorDeRota from './components/ObservadorDeRota';

export default function App() {
  return (
    <>
      <ObservadorDeRota />
      <Cabecalho />
      <Outlet />
      <Rodape />
    </>
  );
}
```

> **Explicação do Passo 2:**
> * Colocar o `<ObservadorDeRota />` dentro de `App.tsx` garante que o monitoramento fique ativo em toda a aplicação.
> * O `<Outlet />` continua cuidando da troca das páginas filhas enquanto o observador atua em segundo plano.

---

### Passo 3: Por que o Observador Funciona se o `App` não Muda?

> **Explicação do Passo 3:**
> 1. O `<RouterProvider>` compartilha o estado da rota com toda a árvore via Context API do React.
> 2. O hook `useLocation` conecta o `ObservadorDeRota` diretamente a esse canal.
> 3. Quando a rota muda, o React não precisa recarregar o `<App />` inteiro: ele atualiza apenas os componentes que usam hooks inscritos nessa alteração, re-executando o `useEffect`.

---

### Passo 4: Testar no Navegador

Execute `npm run dev` e valide o fluxo:

1. Abra o navegador e o console (`F12`).
2. Clique nos links do menu para alternar entre as rotas.
3. Verifique o console exibindo o novo caminho e a aba do navegador alterando o texto.

> **Explicação do Passo 4:**
> Esse teste confirma que o hook `useEffect` identificou a alteração disparada pelo `useLocation` e concluiu as ações com sucesso.
===============================================================================================================================================================================

# Guia Passo a Passo: Carregando e Listando Produtos em Tabela (React + TypeScript)

Neste tutorial, vamos pegar uma lista de produtos fictícios (o famoso **mock**) e aprender a guardar esses dados na memória do React com `useState`, simular o carregamento desses dados no momento em que a página abre com o `useEffect`, e desenhar cada produto na tela dentro de uma **tabela** organizada.

---

### Passo 1: O "Molde" do nosso Produto (Criando a Tipagem)

No TypeScript, antes de criar dados, nós criamos um **contrato** (ou uma ficha cadastral). Isso ensina ao editor exatamente quais campos todo produto precisa ter. Se esquecermos uma vírgula ou escrevermos o nome do campo errado, o TypeScript nos avisa na hora.

1. Dentro da pasta `src`, crie uma pasta chamada `types` (se ainda não tiver).
2. Dentro dela, crie o arquivo `types.ts`.
3. Adicione o seguinte código:

```typescript
// src/types/types.ts

// Aqui definimos o molde do nosso objeto de produto.
// Cada produto OBRIGATORIAMENTE deve ter esses campos e esses tipos:
export interface TipoProduto {
  id: number;          // O número de identificação único
  nome: string;        // O nome do produto em texto
  preco: number;       // O valor em número (sem R$, usamos só números decimais)
  descricao: string;   // Uma explicação curta do item
  avatar: string;      // O link (URL) da imagem que está na internet
}
```

---

### Passo 2: O Nosso Estoque Fictício (Arquivo de Mock)

Um dado "mockado" é um dado de mentirinha, usado para testes enquanto não temos um banco de dados de verdade conectado na internet.

1. Dentro de `src`, crie uma pasta chamada `data`.
2. Dentro de `data`, crie o arquivo `listaProdutos.ts`.
3. Vamos importar o molde `TipoProduto` e criar nossa lista de produtos:

```typescript
// src/data/listaProdutos.ts
import { TipoProduto } from '../types/types';

// Usamos TipoProduto[] com colchetes para avisar que é uma LISTA (Array) desse molde.
export const listaProdutos: TipoProduto[] = [
  {
    id: 1,
    nome: "Headset Gamer Sem Fio",
    preco: 299.90,
    descricao: "Áudio espacial 7.1, espumas confortáveis e microfone retrátil.",
    avatar: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    nome: "Teclado Mecânico RGB",
    preco: 249.00,
    descricao: "Switches mecânicos rápidos e iluminação colorida ajustável.",
    avatar: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    nome: "Smartwatch Fitness",
    preco: 189.50,
    descricao: "Mede batimentos cardíacos, conta passos e mostra notificações.",
    avatar: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    nome: "Câmera Instantânea",
    preco: 420.00,
    descricao: "Tira fotos analógicas e imprime na hora para colar no caderno.",
    avatar: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=120&auto=format&fit=crop&q=80"
  }
];
```

---

### Passo 3: Abrindo o Componente `Produtos` e Entendendo os Hooks

Agora abra o arquivo do seu componente que já existe: `src/routes/Produtos/index.tsx`.

Para fazer esse componente funcionar, precisaremos de duas ferramentas especiais do React chamadas **Hooks**:

1. **`useState`**: É a gaveta da memória do componente.
   * Toda vez que você guarda algo nela usando a função `set...`, o React descobre que tem novidade e repinta a tela para mostrar os dados atualizados.
2. **`useEffect`**: É um vigia que espera a tela carregar.
   * Imagine que o componente acabou de ser colocado na tela pela primeira vez (a gente chama isso de "montagem"). O `useEffect` percebe isso e dispara uma ação que você programou, como por exemplo: *"Agora que a tela abriu, busque a lista de produtos e guarde na gaveta!"*.

---

### Passo 4: Declarando os Imports e o Estado no Componente

No topo de `src/routes/Produtos/index.tsx`, vamos importar os Hooks, a tipagem e os dados mockados:

```tsx
// 1. Ferramentas do React
import { useState, useEffect } from 'react';

// 2. O molde que criamos
import { TipoProduto } from '../../types/types';

// 3. Os dados fictícios
import { listaProdutos } from '../../data/listaProdutos';

export default function Produtos() {
  // Criamos o estado "produtos". 
  // - Ele começa vazio: []
  // - Avisamos ao TypeScript que ele vai guardar uma lista de TipoProduto: <TipoProduto[]>
  const [produtos, setProdutos] = useState<TipoProduto[]>([]);

  // O useEffect vai entrar aqui no Passo 5...

  return (
    <main>
      <h1>Página de Produtos</h1>
    </main>
  );
}
```

---

### Passo 5: Carregando os Dados com `useEffect`

Agora vamos ensinar o componente a buscar os dados assim que o usuário entrar na página:

```tsx
  // Esse efeito roda automaticamente quando a tela é montada
  useEffect(() => {
    // Pegamos a listaProdutos do arquivo e guardamos dentro do useState
    setProdutos(listaProdutos);

    // O array vazio [] no final é o "segredo":
    // Ele diz ao React: "Execute isso APENAS UMA VEZ, quando o componente nascer na tela".
    // Se não colocar esse [], o React entraria em um loop infinito!
  }, []);
```

---

### Passo 6: Construindo a Tabela HTML (Linhas e Colunas)

Uma tabela na web funciona como uma planilha de caderno:
* `<table>`: A tabela inteira.
* `<thead>`: O cabeçalho (a primeira linha que diz o nome de cada coluna).
* `<th>`: A célula do cabeçalho (título da coluna: Foto, Nome, Preço...).
* `<tbody>`: O corpo da tabela, onde moram os dados reais.
* `<tr>`: Uma linha inteira (Table Row).
* `<td>`: Um quadradinho/célula de dado (Table Data).

Para mostrar vários produtos sem ter que digitar um por um manualmente, usamos a função do JavaScript chamada **`.map()`**.
* O `.map()` funciona como uma esteira de fábrica: ele pega cada item da nossa lista, um por um, e transforma em uma linha `<tr>` na tabela.

---

### Passo 7: O Código Completo do Componente `Produtos`

Substitua o conteúdo de `src/routes/Produtos/index.tsx` pelo código final documentado:

```tsx
import { useState, useEffect } from 'react';
import { TipoProduto } from '../../types/types';
import { listaProdutos } from '../../data/listaProdutos';

export default function Produtos() {
  // Estado que guarda a lista de produtos na memória do componente
  const [produtos, setProdutos] = useState<TipoProduto[]>([]);

  // Carrega os dados na primeira vez que a tela aparece
  useEffect(() => {
    setProdutos(listaProdutos);
  }, []);

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Painel de Produtos</h1>
      <p>Confira abaixo a lista de itens cadastrados no sistema:</p>

      {/* Tabela com borda e espaçamento para ficar fácil de ler */}
      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        
        {/* Cabeçalho da Tabela */}
        <thead>
          <tr style={{ backgroundColor: '#2c3e50', color: '#ffffff' }}>
            <th>Foto</th>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
          </tr>
        </thead>

        {/* Corpo da Tabela com a repetição dos produtos */}
        <tbody>
          {produtos.map((item) => (
            // A propriedade "key" é obrigatória no React quando usamos .map().
            // Ela ajuda o React a saber exatamente qual item é qual através do ID único.
            <tr key={item.id}>
              <td>
                <img 
                  src={item.avatar} 
                  alt={item.nome} 
                  width={60} 
                  height={60} 
                  style={{ objectFit: 'cover', borderRadius: '8px' }} 
                />
              </td>
              <td>{item.id}</td>
              <td><strong>{item.nome}</strong></td>
              {/* toFixed(2) garante que o preço sempre tenha 2 casas decimais (ex: 299.90) */}
              <td>R$ {item.preco.toFixed(2)}</td>
              <td>{item.descricao}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </main>
  );
}
```

---

### Passo 8: Conferindo o Resultado no Navegador

1. Verifique se o servidor do Vite está rodando no terminal do VS Code:
   ```bash
   npm run dev
   ```
2. Abra o navegador no endereço:
   ```text
   http://localhost:5173/produtos
   ```
3. Você verá todos os produtos listados, com as fotos carregadas diretamente da internet, formatados dentro da tabela.

==============================================================================================================================================================================
