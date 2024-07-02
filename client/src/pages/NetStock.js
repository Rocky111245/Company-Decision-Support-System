import React, { useState, useEffect } from 'react';
import './NetStock.css';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const NetStock = () => {
  const [netStockData, setNetStockData] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    fetchNetStockData();
  }, []);

  const fetchNetStockData = async () => {
    try {
      const response = await fetch('/api/netstock');
      const data = await response.json();
      setNetStockData(data);
    } catch (error) {
      console.error('Error fetching net stock data:', error);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle sort order if the same column is clicked again
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set sort column and initial sort order
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const getSortedData = () => {
    if (sortColumn) {
      return [...netStockData].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (valueA < valueB) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return netStockData;
  };

  const sortedData = getSortedData();

  return (
    <div className="table-container">
      <Navbar></Navbar>
      <table className="table">
        <thead>
          <tr className="table__row">
            <th
              className="table__header"
              onClick={() => handleSort('Product_Name')}
              id="productNameHeader"
            >
              <span className="table__header-text">Product Name</span>
              {sortColumn === 'Product_Name' && sortOrder === 'asc' && <FaSortUp className="table__sort-icon" />}
              {sortColumn === 'Product_Name' && sortOrder === 'desc' && <FaSortDown className="table__sort-icon" />}
              {!sortColumn && <FaSort className="table__sort-icon" />}
            </th>
            <th
              className="table__header"
              onClick={() => handleSort('Company_Name')}
              id="companyNameHeader"
            >
              <span className="table__header-text">Company Name</span>
              {sortColumn === 'Company_Name' && sortOrder === 'asc' && <FaSortUp className="table__sort-icon" />}
              {sortColumn === 'Company_Name' && sortOrder === 'desc' && <FaSortDown className="table__sort-icon" />}
              {!sortColumn && <FaSort className="table__sort-icon" />}
            </th>
            <th
              className="table__header"
              onClick={() => handleSort('Quantity_In')}
              id="stockInQuantityHeader"
            >
              <span className="table__header-text">Stock In Quantity</span>
              {sortColumn === 'Quantity_In' && sortOrder === 'asc' && <FaSortUp className="table__sort-icon" />}
              {sortColumn === 'Quantity_In' && sortOrder === 'desc' && <FaSortDown className="table__sort-icon" />}
              {!sortColumn && <FaSort className="table__sort-icon" />}
            </th>
            <th
              className="table__header"
              onClick={() => handleSort('Quantity_Sold')}
              id="stockOutQuantityHeader"
            >
              <span className="table__header-text">Stock Out Quantity</span>
              {sortColumn === 'Quantity_Sold' && sortOrder === 'asc' && <FaSortUp className="table__sort-icon" />}
              {sortColumn === 'Quantity_Sold' && sortOrder === 'desc' && <FaSortDown className="table__sort-icon" />}
              {!sortColumn && <FaSort className="table__sort-icon" />}
            </th>
            <th
              className="table__header"
              onClick={() => handleSort('Net_Stock')}
              id="netStockHeader"
            >
              <span className="table__header-text">Net Stock</span>
              {sortColumn === 'Net_Stock' && sortOrder === 'asc' && <FaSortUp className="table__sort-icon" />}
              {sortColumn === 'Net_Stock' && sortOrder === 'desc' && <FaSortDown className="table__sort-icon" />}
              {!sortColumn && <FaSort className="table__sort-icon" />}
            </th>
            <th
              className="table__header"
              onClick={() => handleSort('Average_buying_price')}
              id="buyingPriceHeader"
            >
              <span className="table__header-text">Average Buying Price</span>
              {sortColumn === 'Average_buying_price' && sortOrder === 'asc' && <FaSortUp className="table__sort-icon" />}
              {sortColumn === 'Average_buying_price' && sortOrder === 'desc' && <FaSortDown className="table__sort-icon" />}
              {!sortColumn && <FaSort className="table__sort-icon" />}
            </th>
            <th
              className="table__header"
              onClick={() => handleSort('Total_CostOfGoods')}
              id="costOfGoodsBoughtHeader"
            >
              <span className="table__header-text">COG/W Average</span>
              {sortColumn === 'Total_CostOfGoods' && sortOrder === 'asc' && <FaSortUp className="table__sort-icon" />}
              {sortColumn === 'Total_CostOfGoods' && sortOrder === 'desc' && <FaSortDown className="table__sort-icon" />}
              {!sortColumn && <FaSort className="table__sort-icon" />}
            </th>
            <th
              className="table__header"
              onClick={() => handleSort('salePrice')}
              id="salePriceHeader"
            >
              <span className="table__header-text">COG/W Total on Stock</span>
              {sortColumn === 'salePrice' && sortOrder === 'asc' && <FaSortUp className="table__sort-icon" />}
              {sortColumn === 'salePrice' && sortOrder === 'desc' && <FaSortDown className="table__sort-icon" />}
              {!sortColumn && <FaSort className="table__sort-icon" />}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'table__row table__row--even' : 'table__row'}>
              <td>{row.Product_Name}</td>
              <td>{row.Company_Name}</td>
              <td>{row.Quantity_In}</td>
              <td>{row.Quantity_Sold}</td>
              <td>{Math.round(row.Net_Stock)}</td>
              <td>{Math.round(row.Average_buying_price)}</td>
              <td>{Math.round(row.COG_W_average)}</td>
              <td>{Math.round(row.COG_W_for_Stock)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NetStock;
