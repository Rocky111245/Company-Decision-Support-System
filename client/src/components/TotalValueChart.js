import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register Chart.js components

const TotalValueChart = () => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      createChart();
    }
  }, [chartData]);

  const fetchChartData = async () => {
    try {
      const response = await fetch('/api/netstock');
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const createChart = () => {
    const ctx = chartRef.current.getContext('2d');
    destroyChart(); // Destroy previous chart if it exists
  
    const totalPrices = chartData.map((row) =>{
      const quantityIn = row.Quantity_In;
      const netStock = row.Net_Stock;
      return (row.Total_Price / quantityIn) * netStock;

    } );
    const productNames = chartData.map((row) => row.Product_Name);
    const colors = generateColors(productNames.length); // Generate dynamic colors
  
    // Calculate the sum of all total prices
    const totalSum = totalPrices.reduce((a, b) => a + b, 0);
  
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: productNames,
        datasets: [
          {
            data: totalPrices,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Percentage of Total Value by Product',
          },
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map(data => {
                sum += data;
              });
              let percentage = (value*100 / sum).toFixed(2)+"%";
              return percentage;
            },
            color: '#fff',
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                const dataIndex = context.dataIndex;
                const totalPrice = context.parsed.y;
                const productName = productNames[dataIndex];
                return `Product: ${productName}`;
              },
              afterLabel: (context) => {
                const dataIndex = context.dataIndex;
                const totalPrice = context.dataset.data[dataIndex];
  
                // Calculate the percentage of the total price
                const percentage = ((totalPrice / totalSum) * 100).toFixed(2);
                return `Value: $${totalPrice} (${percentage}%)`;
              },
            },
          },
        },
        title: {
          display: true,
          text: 'Item Value in Warehouse',
        },
      },
    });
  };
  
  

  const destroyChart = () => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }
  };

  const generateColors = (count) => {
    const colors = [];
    const colorPalette = [
      '#FF6384', // Red
      '#36A2EB', // Blue
      '#FFCE56', // Yellow
      '#483D8B', // Dark Stale Blue
      '#9966FF', // Purple
      '#00b3b3', // Orange
      '#FF5733', // Coral
    ];
    

    for (let i = 0; i < count; i++) {
      const colorIndex = i % colorPalette.length;
      colors.push(colorPalette[colorIndex]);
    }

    return colors;
  };

  return <canvas ref={chartRef}></canvas>;
};

export default TotalValueChart;
