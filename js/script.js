//Tabelas

async function fetchCryptocurrencyData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,litecoin');
        const data = await response.json();

        const cryptoTable = document.getElementById('cryptoTable');

        data.forEach(crypto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${crypto.name}</td>
                <td>${crypto.symbol}</td>
                <td>$${crypto.current_price.toFixed(2)}</td>
            `;
            cryptoTable.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao obter os dados:', error);
    }
}

fetchCryptocurrencyData();

//Varias moedas

// Configuração da API
const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";
const params = {
    vs_currency: "usd",
    ids: "bitcoin,ethereum,ripple,litecoin",
    order: "market_cap_desc",
    per_page: 30,
    page: 1,
    sparkline: false,
};

// Elemento Canvas para o gráfico
const ctx = document.getElementById("cryptoChart").getContext("2d");

// Função para buscar dados da API
async function fetchData() {
    try {
        const response = await fetch(`${apiUrl}?` + new URLSearchParams(params));
        const data = await response.json();

        // Extrair dados de preço para cada criptomoeda
        const labels = data.map(item => item.symbol.toUpperCase());
        const prices = data.map(item => item.current_price);

        // Configurar dados do gráfico
        const chartData = {
            labels: labels,
            datasets: [{
                label: "Preço em USD",
                data: prices,
                borderColor: "blue",
                fill: false,
            }],
        };

        // Configurar opções do gráfico
        const chartOptions = {
            scales: {
                y: {
                    beginAtZero: false,
                },
            },
        };

        // Criar o gráfico
        new Chart(ctx, {
            type: "line",
            data: chartData,
            options: chartOptions,
        });
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
    }
}

// Chamar a função para buscar dados da API e criar o gráfico
fetchData();


//Bitcoin

async function fetchBitcoinData() {
  const today = new Date();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(today.getMonth() - 12);

  const apiUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${Math.floor(twelveMonthsAgo.getTime() / 1000)}&to=${Math.floor(today.getTime() / 1000)}`;
  
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
    title: 'Cotação do Bitcoin nos Últimos 12 Meses',
    xaxis: {
      title: 'Data'
    },
    yaxis: {
      title: 'Preço (USD)'
    }
  };

  Plotly.newPlot('chart_btc', chartData, layout);
}

fetchBitcoinData();

