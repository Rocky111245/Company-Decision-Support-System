import React from 'react';
import { useSalePageLogic } from '../logic/SalePageLogic';
import './Stock_In.css';
import SaleCalculator from '../components/SaleCalculator';
import Navbar from '../components/Navbar';

function Stock_Sell() {
  const {
    date,
    productName,
    quantity,
    customerName,
    saleValue,
    productOptions,
    rows,
    summary,
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
  } = useSalePageLogic();



  return (
    <div className="stock-in">
      <Navbar></Navbar>
      <SaleCalculator
          onTransportChange={handleTransportChange}
          onOtherInputChange={handleOtherInputChange}
          invoiceAmount={calculateInvoiceAmount(saleValue)}
      />
      <h2 className="stock-in__title">Stock Sales</h2>
      <div className="stock-in__table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="table__header">Date of Sale</th>
              <th className="table__header">Product Name</th>
              <th className="table__header">Customer Name</th>
              <th className="table__header">Quantity</th>
              <th className="table__header">Sale Value</th>
              <th className="table__header">Actual Selling Price</th>
              <th className="table__header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="table__row">
                <td className="table__data">{row.date}</td>
                <td className="table__data">{row.productName}</td>
                <td className="table__data">{row.customerName}</td>
                <td className="table__data">{row.quantity}</td>
                <td className="table__data">{row.saleValue}</td>
                <td className="table__data">
                  {calculateCostOfGoods(calculateInvoiceAmount(row.saleValue))}
                </td>
                <td className="table__data">
                  <button
                    className="table__button table__button--delete"
                    onClick={() => handleDeleteRow(index)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            <tr className="table__row">
              <td className="table__data">
                <input
                  type="date"
                  className="table__input stock_in__date_input"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </td>
              <td className="table__data">
                <select
                  className="table__select stock_in__product_select"
                  value={productName}
                  onChange={handleProductNameChange}
                  required
                >
                  <option value="" disabled hidden>
                    Select a product
                  </option>
                  {productOptions.map(product => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </td>
              <td className="table__data">
                <input
                  type="text"
                  className="table__input stock_in__customer_input"
                  value={customerName}
                  onChange={handleCustomerNameChange}
                  required
                />
              </td>
              <td className="table__data">
                <input
                  type="number"
                  className="table__input stock_in__quantity_input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  required
                />
              </td>
              <td className="table__data">
                <input
                  type="number"
                  className="table__input stock_in__sale_value_input"
                  value={saleValue}
                  onChange={handleSaleValueChange} // Update sale value dynamically
                  required
                />
              </td>
              <td className="table__data">
               Tk {calculateCostOfGoods(calculateInvoiceAmount(saleValue))}
              </td>
              <td className="table__data">
                <button
                  className="table__button table__button--add"
                  onClick={handleAddRow}
                >
                  Sell
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="stock-in__title">Summary</h2>
      <div className="stock-in__table-container">
        <table className="table stock_in__summary_table">
          <thead>
            <tr>
              <th className="table__header">Product Name</th>
              <th className="table__header">Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item, index) => (
              <tr key={index} className="table__row">
                <td className="table__data">{item.productName}</td>
                <td className="table__data">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stock_Sell;
