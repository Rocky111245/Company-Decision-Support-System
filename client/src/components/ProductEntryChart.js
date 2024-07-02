import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register Chart.js components

const ProductInChart = () => {
  const chartRef = useRef(null);
  const [productInData, setProductInData] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    if (chartRef.current && productInData.length > 0) {
      createChart();
    }
  }, [productInData]);

  const fetchProductData = async () => {
    try {
      const today = new Date();
      const fiveDaysAgo = new Date(today);
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 30);
  
      const response = await fetch('/api/product_in');
      const data = await response.json();
  
      // Filter the data within the specified date range
      const filteredData = data.filter((entry) => {
        const date = new Date(entry.Date_of_Entry);
        return date >= fiveDaysAgo && date <= today;
      });
  
      setProductInData(filteredData);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  

  const createChart = () => {
    const ctx = chartRef.current.getContext('2d');
  
    // Group data by date
    const dataByDate = productInData.reduce((acc, entry) => {
      const date = entry.Date_of_Entry;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {});
  
    const labels = Object.keys(dataByDate);
  
    // Sort labels (dates) in ascending order
    labels.sort((a, b) => new Date(a) - new Date(b));
  
    const datasets = [];
  
    // For each date, create a dataset for each product
    labels.forEach((label) => {
      dataByDate[label].forEach((entry) => {
        const existingDataset = datasets.find((dataset) => dataset.label === entry.Product_Name);
        if (existingDataset) {
          existingDataset.data[labels.indexOf(label)] = (existingDataset.data[labels.indexOf(label)] || 0) + entry.quantity;
        } else {
          const newDataset = {
            label: entry.Product_Name,
            data: new Array(labels.length).fill(0),
            backgroundColor: getRandomColor(),
            stack: 'Stack 0',
          };
          newDataset.data[labels.indexOf(label)] = entry.quantity;
          datasets.push(newDataset);
        }
      });
    });
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          title: {
            display: true,
            text: 'Product Receiving Record', 
          },
        },
        scales: {
          x: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Product Receiving Date', 
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantity', 
            },
          },
        },
      },
    });
  };
  
  
  

  // Function to generate random colors for the bars
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return <canvas ref={chartRef}></canvas>;
};

export default ProductInChart;
