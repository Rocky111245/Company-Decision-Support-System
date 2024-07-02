import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-plugin-datalabels'; // add this line to import the plugin

Chart.register(...registerables); // Register Chart.js components

const ExpenseSummaryChart = () => {
  const chartRef = useRef(null);
  const [productInSummary, setProductInSummary] = useState([]);
  const [productSellSummary, setProductSellSummary] = useState([]);

  useEffect(() => {
    fetchProductInSummary();
    fetchProductSellSummary();
  }, []);

  useEffect(() => {
    if (chartRef.current && productInSummary.length > 0 && productSellSummary.length > 0) {
      createChart();
    }
  }, [productInSummary, productSellSummary]);

  const fetchProductInSummary = async () => {
    try {
      const response = await fetch('/api/product_in_summary');
      const data = await response.json();
      setProductInSummary(data);
    } catch (error) {
      console.error('Error fetching product in summary:', error);
    }
  };

  const fetchProductSellSummary = async () => {
    try {
      const response = await fetch('/api/product_sell_summary');
      const data = await response.json();
      setProductSellSummary(data);
    } catch (error) {
      console.error('Error fetching product sell summary:', error);
    }
  };

  const createChart = () => {
    const ctx = chartRef.current.getContext('2d');
    const warehouseExpenses = productInSummary.map((summary) => summary.Expenses_up_to_warehouse);
    const aftersaleExpenses = productSellSummary.map((summary) => summary.Expenses_aftersale);

    const totalWarehouseExpense = warehouseExpenses.reduce((a, b) => a + b, 0);
    const totalAfterSaleExpense = aftersaleExpenses.reduce((a, b) => a + b, 0);
    const totalExpense = totalWarehouseExpense + totalAfterSaleExpense;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Expense Before Sale', 'Expense After Sale'],
        datasets: [
          {
            data: [totalWarehouseExpense, totalAfterSaleExpense],
            backgroundColor: ['#36A2EB', '#FFCE56'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Expense Summary',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed.y || context.raw;
                const percentage = ((value / totalExpense) * 100).toFixed(2);
                return `${context.label}: ${percentage}% , Taka ${value}`;
              },
            },
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
        },
        legend: {
          display: true,
          labels: {
            font: {
              size: 14,
            },
          },
        },
      },
    });
  };

  return <canvas ref={chartRef}></canvas>;
};

export default ExpenseSummaryChart;
