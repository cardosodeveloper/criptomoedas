// Últimos 12 meses Ethereum    
async function fetchEthereumData() {
  const today = new Date();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(today.getMonth() - 12);

  // Alteração para Ethereum (ETH) com 'vs_currency=brl' (Reais)
  const apiUrl = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=brl&from=${Math.floor(twelveMonthsAgo.getTime() / 1000)}&to=${Math.floor(today.getTime() / 1000)}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.prices && data.prices.length > 0) {
      const prices = data.prices.map(item => [new Date(item[0]), item[1]]);
      plotEthereumChart(prices);  // Função separada para Ethereum
    } else {
      console.error('Não foi possível obter os preços do Ethereum.');
    }
  } catch (error) {
    console.error('Erro ao buscar os dados do Ethereum:', error);
  }
}

// Função de plotagem para o gráfico do Ethereum
function plotEthereumChart(prices) {
  const chartData = [{
    x: prices.map(item => item[0]),
    y: prices.map(item => item[1]),
    type: 'line'
  }];

  const layout = {
    title: 'Cotação do Ethereum nos Últimos 12 Meses (em Reais)',
    xaxis: { title: 'Data' },
    yaxis: { title: 'Preço (BRL)' }
  };

  Plotly.newPlot('chart_eth', chartData, layout);
}

// Chamando as funções para buscar os dados de ambas as criptos
fetchBitcoinData();
fetchEthereumData();   