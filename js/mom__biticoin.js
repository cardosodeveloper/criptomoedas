// Últimos 12 meses Bitcoin   
async function fetchBitcoinData() {
  const today = new Date();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(today.getMonth() - 12);

  // Alteração do parâmetro 'vs_currency' para 'brl' (Reais)
  const apiUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=brl&from=${Math.floor(twelveMonthsAgo.getTime() / 1000)}&to=${Math.floor(today.getTime() / 1000)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const prices = data.prices.map(item => [new Date(item[0]), item[1]]);
    plotBitcoinChart(prices);  // Função separada para Bitcoin
  } catch (error) {
    console.error('Erro ao buscar os dados do Bitcoin:', error);
  }
}

// Função de plotagem para o gráfico do Bitcoin
function plotBitcoinChart(prices) {
  const chartData = [{
    x: prices.map(item => item[0]),
    y: prices.map(item => item[1]),
    type: 'line'
  }];

  const layout = {
    title: 'Cotação do Bitcoin nos Últimos 12 Meses (em Reais)',
    xaxis: { title: 'Data' },
    yaxis: { title: 'Preço (BRL)' }
  };

  Plotly.newPlot('chart_btc', chartData, layout);
}