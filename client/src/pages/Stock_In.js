import React from 'react';
import { useStockPageLogic } from '../logic/stockPageLogic';
import './Stock_In.css';
import Calculator from '../components/Calculator';
import Navbar from '../components/Navbar';

function Stock_In() {
  const {
    date,
    productName,
    companyName,
    quantity,
    price,
    productOptions,
    companyOptions,
    rows,
    summary,
    handleDateChange,
    handleProductNameChange,
    handleCompanyNameChange,
    handleQuantityChange,
    handlePriceChange,
    handleAddRow,
    handleDeleteRow,
    calculateInvoiceAmount,
    calculateCostOfGoods,
    handleExchangeRateChange,
    handleOtherInputChange,
  } = useStockPageLogic();

  return (
    <div className="stock-in">
      <Navbar></Navbar>
      <div className="stock-in__calculator">
        <Calculator
          onExchangeRateChange={handleExchangeRateChange}
          onOtherInputChange={handleOtherInputChange}
          invoiceAmount={calculateInvoiceAmount(price)}
        />
      </div>

      <h2 className="stock-in__title">Stock In</h2>
      <div className="stock-in__table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="table__header">Date of Entry</th>
              <th className="table__header">Product Name</th>
              <th className="table__header">Company Name</th>
              <th className="table__header">Quantity</th>
              <th className="table__header">Price</th>
              <th className="table__header">Invoice Amount in Taka</th>
              <th className="table__header">Cost of Goods upto Warehouse</th>
              <th className="table__header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="table__row">
                <td className="table__data">{row.date}</td>
                <td className="table__data">{row.productName}</td>
                <td className="table__data">{row.companyName}</td>
                <td className="table__data">{row.quantity}</td>
                <td className="table__data">$ {row.price}</td>
                <td className="table__data">
                  Tk {calculateInvoiceAmount(row.price)}
                </td>
                <td className="table__data">
                  Tk {calculateCostOfGoods(calculateInvoiceAmount(row.price))}
                </td>
                <td className="table__data">
            
                  <button
                    className="table__button table__button--delete"
                    onClick={() => handleDeleteRow(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr className="table__row">
              <td className="table__data">
                <input
                  type="date"
                  className="table__input"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </td>
              <td className="table__data">
                <select
                  className="table__select"
                  value={productName}
                  onChange={handleProductNameChange}
                  required
                >
                  <option value="" disabled hidden>
                    Select a product
                  </option>
                  {productOptions.map((product) => (
                    <option key={product.productID} value={product.productName}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </td>
              <td className="table__data">
                <select
                  className="table__select"
                  value={companyName}
                  onChange={handleCompanyNameChange}
                  required
                >
                  <option value="" disabled hidden>
                    Select a company
                  </option>
                  {companyOptions.map((company) => (
                    <option key={company.companyID} value={company.companyName}>
                      {company.companyName}
                    </option>
                  ))}
                </select>
              </td>
              <td className="table__data">
                <input
                  type="number"
                  className="table__input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  required
                />
              </td>
              <td className="table__data">
                <input
                  type="number"
                  className="table__input"
                  value={price}
                  onChange={handlePriceChange}
                  required
                />
              </td>
              <td className="table__data">
                Tk {calculateInvoiceAmount(price)}
              </td>
              <td className="table__data">
                Tk {calculateCostOfGoods(calculateInvoiceAmount(price))}
              </td>
              <td className="table__data">
                <button
                  className="table__button table__button--add"
                  onClick={handleAddRow}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="stock-in__title">Summary</h2>
      <div className="stock-in__table-container">
        <table className="table">
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

export default Stock_In;
