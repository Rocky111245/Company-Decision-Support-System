import React, { useState, useEffect } from 'react';

export function useStockPageLogic() {
  const [exchangeRate, setExchangeRate] = useState('');
  const [date, setDate] = useState('');
  const [productName, setProductName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [productOptions, setProductOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState([]);
  const [otherInputs, setOtherInputs] = useState({
    freightCharge: 2.5,
    seaAirFreight: 3,
    customsTaxVAT: 5,
    inlandFreightCharge: 1,
    advanceIncomeTax: 5,
  });

  useEffect(() => {
    fetchProductNames();
    fetchCompanyNames();
  }, []);

  const handleExchangeRateChange = (value) => {
    setExchangeRate(value);
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
    fetch('/api/product_names')
      .then((response) => response.json())
      .then((data) => {
        setProductOptions(data);
        if (data.length > 0) {
          setProductName(data[0].productName);
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchCompanyNames = () => {
    fetch('/api/company_name')
      .then((response) => response.json())
      .then((data) => {
        setCompanyOptions(data);
        if (data.length > 0) {
          setCompanyName(data[0].companyName);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleAddRow = async () => {
    if (!date || !productName || !companyName || !quantity || !price || !exchangeRate) {
      alert('Please fill in all fields.');
      return;
    }

    const invoiceAmountBDT = calculateInvoiceAmount(price);
    const costOfGoods = calculateCostOfGoods(invoiceAmountBDT);

    const newRow = {
      date,
      productName,
      companyName,
      quantity,
      price,
      invoiceAmountBDT,
      costOfGoods,
    };

    try {
      const response = await fetch('/api/product_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      });

      if (response.ok) {
        const data = await response.json();
        newRow.Product_In_ID = data.Product_In_ID;

        setRows((prevRows) => [...prevRows, newRow]);
        setDate('');
        setProductName(productOptions[0].productName);
        setCompanyName(companyOptions[0].companyName);
        setQuantity('');
        setPrice('');

        console.log(`Data added successfully to the server with ID ${data.Product_In_ID}`);
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
      const existingItem = acc.find((item) => item.productName === row.productName);
      if (existingItem) {
        existingItem.quantity += parseInt(row.quantity);
      } else {
        acc.push({
          productName: row.productName,
          quantity: parseInt(row.quantity),
        });
      }
      return acc;
    }, []);
    setSummary(summaryData);
  };

  const handleDeleteRow = async (index) => {
    const selectedRow = rows[index];
    const productId = selectedRow.Product_In_ID; // Retrieve the Product_In_ID associated with the row

    try {
      const response = await fetch(`/api/product_in/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Data deleted successfully on the server');
        setRows((prevRows) => prevRows.filter((_row, idx) => idx !== index)); // Remove the row from the frontend state
      } else {
        console.error('Failed to delete data on the server');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the data.');
    }
  };

  const calculateInvoiceAmount = (price) => {
    return price * exchangeRate;
  };

  const calculateCostOfGoods = (invoiceAmount) => {
    const {
      freightCharge,
      seaAirFreight,
      customsTaxVAT,
      inlandFreightCharge,
      advanceIncomeTax,
    } = otherInputs;

    const cost =
      invoiceAmount +
      invoiceAmount * (freightCharge / 100) +
      invoiceAmount * (seaAirFreight / 100) +
      invoiceAmount * (customsTaxVAT / 100) +
      invoiceAmount * (inlandFreightCharge / 100) +
      invoiceAmount * (advanceIncomeTax / 100);

    return Math.round(cost);
  };

  return {
    date,
    productName,
    companyName,
    quantity,
    price,
    productOptions,
    companyOptions,
    rows,
    summary,
    exchangeRate,
    handleDateChange,
    handleProductNameChange,
    handleCompanyNameChange,
    handleExchangeRateChange,
    handleQuantityChange,
    handlePriceChange,
    handleAddRow,
    handleDeleteRow,
    calculateInvoiceAmount,
    calculateCostOfGoods,
    handleOtherInputChange,
  };
}
