import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register Chart.js components

const NetStockChart = () => {
  const [netStockData, setNetStockData] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    fetchNetStockData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      createChart();
    }
  }, [netStockData]);

  const fetchNetStockData = async () => {
    try {
      const response = await fetch('/api/netstock');
      const data = await response.json();
      setNetStockData(data);
    } catch (error) {
      console.error('Error fetching net stock data:', error);
    }
  };

  const createChart = () => {
    const ctx = chartRef.current.getContext('2d');
    destroyChart(); // Destroy previous chart if it exists
  
    const stockQuantities = netStockData.map((row) => row.Net_Stock);
  
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: netStockData.map((row) => row.Product_Name),
        datasets: [
          {
            label: 'Net Stock',
            data: stockQuantities,
            backgroundColor: 'rgba(50, 192, 192, 1)', // Set a single color for all bars
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantity',
              
            },
          },
          x: {
            title: {
              display: true,
              text: 'Product Name',
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                const dataIndex = tooltipItems[0].dataIndex;
                return netStockData[dataIndex].Product_Name;
              },
              label: (tooltipItem) => {
                const dataIndex = tooltipItem.dataIndex;
                const productName = netStockData[dataIndex].Product_Name;
                const companyName = netStockData[dataIndex].Company_Name;
                const quantity = netStockData[dataIndex].Net_Stock;
                return `Company: ${companyName}, Product: ${productName}, Quantity: ${quantity}`;
              },
            },
          },
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

  return <canvas ref={chartRef}></canvas>;
};

export default NetStockChart;
