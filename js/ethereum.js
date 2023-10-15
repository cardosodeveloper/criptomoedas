//Ethereum

async function fetchEthereumData() {
  const today = new Date();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(today.getMonth() - 12);

  const apiUrl = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=${Math.floor(twelveMonthsAgo.getTime() / 1000)}&to=${Math.floor(today.getTime() / 1000)}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const prices = data.prices.map(item => [new Date(item[0]), item[1]]);
    plotChart(prices);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}

function plotChart(prices) {
  const chartData = [{
    x: prices.map(item => item[0]),
    y: prices.map(item => item[1]),
    type: 'line'
  }];

  const layout = {
    title: 'Cotação do Ethereum nos Últimos 12 Meses',
    xaxis: {
      title: 'Data'
    },
    yaxis: {
      title: 'Preço (USD)'
    }
  };

  Plotly.newPlot('chart_et', chartData, layout);
}

fetchEthereumData();