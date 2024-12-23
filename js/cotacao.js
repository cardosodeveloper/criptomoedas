
//Cotacao Hoje

const cryptoContainer = document.getElementById('crypto-container');

// Função para formatar números em moeda (BRL ou USD)
function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

// Função para obter o preço das criptomoedas
async function getCryptoPrices() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets';
  const params = {
    vs_currency: 'brl', // Para obter os preços em BRL
    ids: 'bitcoin,ethereum,ripple,litecoin', // Lista de criptomoedas
    order: 'market_cap_desc',
    per_page: 5, // Número de criptomoedas
    page: 1,
  };

  try {
    const response = await fetch(`${url}?vs_currency=${params.vs_currency}&ids=${params.ids}&order=${params.order}&per_page=${params.per_page}&page=${params.page}`);
    const data = await response.json();
    
    // Limpa o conteúdo atual
    cryptoContainer.innerHTML = '';
    
    // Exibe as informações das criptomoedas
    data.forEach(crypto => {
      const card = document.createElement('div');
      card.classList.add('crypto-card');
      
      const priceChangeClass = crypto.price_change_percentage_24h >= 0 ? 'change' : 'change down';
      const priceFormatted = formatCurrency(crypto.current_price);
      
      card.innerHTML = `
        <h3>${crypto.name}</h3>
        <p>${crypto.symbol.toUpperCase()}</p>
        <p class="price">${priceFormatted}</p>
        <p class="${priceChangeClass}">${crypto.price_change_percentage_24h.toFixed(2)}%</p>
      `;
      
      cryptoContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao obter dados das criptomoedas:', error);
  }
}

// Chama a função para exibir as criptomoedas
getCryptoPrices();

//Cotacao Hoje