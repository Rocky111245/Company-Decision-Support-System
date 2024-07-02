import React, { useState } from 'react';
import './Homepage.css';
import Navbar from '../components/Navbar';
import NetStockChart from '../components/NetStockChart';
import TotalValueChart from '../components/TotalValueChart';
import ExpenseSummaryChart from '../components/ExpensePieChart';
import ProductInChart from '../components/ProductEntryChart';
import ProductOutChart from '../components/ProductOutChart';


const Homepage = () => {
  // State to keep track of active tab
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Function to handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

 
  return (
    
    <div class="container">
    <div class="Navbar"><Navbar activeTab={activeTab} handleTabClick={handleTabClick} className="homepage__navbar"/></div>
    <div class="bottomLeft">
      <ProductInChart></ProductInChart>
    </div>
    <div class="topLeft">
      <NetStockChart></NetStockChart>
    </div>
    <div class="topRight1">
      <TotalValueChart></TotalValueChart>
    </div>
    <div class="topRight2">
      <ExpenseSummaryChart></ExpenseSummaryChart>
    </div>
    <div class="bottomRight">
      <ProductOutChart></ProductOutChart>
    </div>
  </div>
  
  );
  
 
  
  
};

export default Homepage;
