// Selecionando o campo de busca e o botão
const campoBusca = document.querySelector("#campoBusca");
const botaoBusca = document.querySelector("#botao-busca");
let dados = [];

// Função para carregar os dados do JSON
async function carregarDados() {
  try {
    const response = await fetch("data.json");
    dados = await response.json();
    renderizarCards(dados);
  } catch (erro) {
    console.error("Erro ao carregar os dados:", erro);
  }
}

// Função para renderizar os cards
function renderizarCards(dadosFiltrados) {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = ""; // Limpa o container antes de renderizar

  for (const dado of dadosFiltrados) {
    const article = document.createElement("article");

    // CORREÇÃO EXTRA: Adiciona a classe "card" para puxar o CSS
    article.classList.add("card");

    // CORREÇÃO PRINCIPAL: Uso de crases (backticks) ` `
    article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.descricao}</p>
            <a href="${dado.steam_link}" target="_blank">Comprar</a>
        `;

    cardContainer.appendChild(article);
  }
}

// Função de busca
function buscar() {
  const termoBusca = campoBusca.value.toLowerCase();

  const dadosFiltrados = dados.filter(
    (dado) =>
      dado.nome.toLowerCase().includes(termoBusca) ||
      dado.descricao.toLowerCase().includes(termoBusca)
  );

  renderizarCards(dadosFiltrados);
}

// Adicionando evento de clique ao botão de busca
botaoBusca.addEventListener("click", buscar);

// Adicionando evento de tecla 'Enter' no campo de busca
campoBusca.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    buscar();
  }
});

// Carregar os dados ao iniciar a aplicação
carregarDados();
