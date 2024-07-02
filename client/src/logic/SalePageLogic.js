import React, { useState, useEffect } from 'react';

export function useSalePageLogic() {
  const [Transport, setTransport] = useState('0');
  const [date, setDate] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [saleValue, setSaleValue] = useState('0');
  const [productOptions, setProductOptions] = useState([]);
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState([]);
  const [otherInputs, setOtherInputs] = useState({
    salesCommission: 2.5,
    VATonsalesValue: 3
  });

  useEffect(() => {
    fetchProductNames();
  }, []);
  
  const handleTransportChange = (value) => {
    setTransport(value);
    console.log(`Transport cost: ${value}`);
  };

  const handleOtherInputChange = (name, value) => {
    setOtherInputs((prevState) => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  };

  useEffect(() => {
    updateSummary();
  }, [rows]);

  const fetchProductNames = () => {
    fetch('/api/product_in_summary')
      .then(response => response.json())
      .then(data => {
        const productNames = data.map(item => item.Product_Name);
        setProductOptions(productNames);
        if (productNames.length > 0) {
          setProductName(productNames[0]);
        }
      })
      .catch(error => console.error(error));
  };

  const handleDateChange = event => {
    setDate(event.target.value);
  };

  const handleProductNameChange = event => {
    setProductName(event.target.value);
  };

  const handleQuantityChange = event => {
    setQuantity(event.target.value);
  };

  const handleCustomerNameChange = event => {
    setCustomerName(event.target.value);
  };

  const handleSaleValueChange = event => {
    setSaleValue(event.target.value);
  };

  const handleAddRow = async () => {
    if (!date || !productName || !quantity || !customerName || !saleValue) {
      alert('Please fill in all fields.');
      return;
    }
  
    const invoiceAmountBDT = calculateInvoiceAmount(saleValue);
    const costOfGoods = calculateCostOfGoods(invoiceAmountBDT);
  
    const newRow = {
      date,
      productName,
      quantity,
      customerName,
      saleValue,
      costOfGoods,
    };
  
  
    try {
      const response = await fetch('/api/product_sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      });
  
      if (response.ok) {
        const data = await response.json();
        newRow.Product_Sell_ID = data.Product_Sell_ID;
  
        setRows(prevRows => [...prevRows, newRow]);
        setDate('');
        setProductName(productOptions[0].productName);
        setQuantity('');
        setSaleValue('');
  
        console.log(`Data added successfully to the server with ID ${data.Product_Sell_ID}`);
      } else {
        console.error('Failed to add data to the server');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the data.');
    }
  };
  



  const updateSummary = () => {
    const summaryData = rows.reduce((acc, row) => {
      const existingItem = acc.find(item => item.productName === row.productName);
      if (existingItem) {
        existingItem.quantity += parseInt(row.quantity);
      } else {
        acc.push({
          productName: row.productName,
          quantity: parseInt(row.quantity)
        });
      }
      return acc;
    }, []);
    setSummary(summaryData);
  };

 const handleDeleteRow = async index => {
  try {
    const deletedRow = rows[index];

    const response = await fetch(`/api/product_sell/${deletedRow.Product_Sell_ID}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Row deleted successfully
      console.log('Row deleted successfully');
      setRows(prevRows => prevRows.filter((_row, idx) => idx !== index));
    } else {
      // Error occurred while deleting the row
      console.error('Failed to delete the row');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while deleting the row.');
  }
};


const calculateInvoiceAmount = saleValue => {
  return parseFloat(saleValue) + parseFloat(Transport); 
};

  const calculateCostOfGoods = (invoiceAmount) => {
    const {
      salesCommission,
      VATonsalesValue,
    } = otherInputs;
  
    const salesCommissionValue = invoiceAmount * (salesCommission / 100);
    const VATonsalesValueCost = invoiceAmount * (VATonsalesValue / 100);
    
    console.log(`Invoice Amount: ${invoiceAmount}`);
    console.log(`Sales Commission: ${salesCommissionValue}`);
    console.log(`VAT on Sales Value: ${VATonsalesValueCost}`);
  
    const cost =
      invoiceAmount +
      salesCommissionValue +
      VATonsalesValueCost;
      
  
    return Math.round(cost);
  };
  

  return {
    date,
    productName,
    quantity,
    customerName,
    saleValue,
    productOptions,
    rows,
    summary,
    Transport,
    handleDateChange,
    handleProductNameChange,
    handleQuantityChange,
    handleCustomerNameChange,
    handleSaleValueChange,
    handleAddRow,
    handleDeleteRow,
    handleTransportChange,
    handleOtherInputChange,
    calculateInvoiceAmount,
    calculateCostOfGoods,
  };
}
