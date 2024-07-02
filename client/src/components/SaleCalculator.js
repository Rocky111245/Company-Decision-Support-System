import React, { useEffect, useState } from 'react';
import './Calculator.css';

const SalesCalculator = ({ onTransportChange, invoiceAmount }) => {
  const [transport, setTransport] = useState('');
  const [salesCommission, setSalesCommission] = useState(2.5);
  const [VATonsalesValue, setVATonsalesValue] = useState(3);

  const [calculatedValues, setCalculatedValues] = useState({
    salesCommission: 0,
    VATonsalesValue: 0
  });

  useEffect(() => {
    calculateValues();
  }, [invoiceAmount, salesCommission, VATonsalesValue]);

  const calculateValues = () => {
    const calculatedSalesCommission = ((parseFloat(salesCommission) / 100) * invoiceAmount).toFixed(2);
    const calculatedVATonsalesValue = ((parseFloat(VATonsalesValue) / 100) * invoiceAmount).toFixed(2);
    setCalculatedValues({
      salesCommission: calculatedSalesCommission,
      VATonsalesValue: calculatedVATonsalesValue
    });
  };

  const handleInputChange = (name, valueSetter) => (e) => {
    valueSetter(e.target.value);
    if (name === 'transport') {
      onTransportChange(e.target.value);
    }
  };

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">Cost Calculator</h2>
      <div className="calculator-box">
        <div className="calculator-inputs">
          <div className="calculator-input">
            <label htmlFor="transport">Transport and Installation Cost</label>
            <input
              type="text"
              id="transport"
              name="transport"
              value={transport}
              onChange={handleInputChange('transport', setTransport)}
              placeholder="Enter transport cost"
              className="calculator-input-field"
            />
          </div>
          <div className="calculator-input">
            <label htmlFor="salesCommission">Sales Commission (%)</label>
            <input
              type="text"
              id="salesCommission"
              name="salesCommission"
              value={salesCommission}
              onChange={handleInputChange('salesCommission', setSalesCommission)}
              placeholder="Enter sales commission"
              className="calculator-input-field"
            />
          </div>
          <div className="calculator-input">
            <label htmlFor="VATonsalesValue">VAT on Sales Value (%)</label>
            <input
              type="text"
              id="VATonsalesValue"
              name="VATonsalesValue"
              value={VATonsalesValue}
              onChange={handleInputChange('VATonsalesValue', setVATonsalesValue)}
              placeholder="Enter VAT on sales value"
              className="calculator-input-field"
            />
          </div>
        </div>
        <div className="calculator-results">
          <div className="calculator-result">
            <span>Sales Commission</span>
            <span>{calculatedValues.salesCommission}</span>
          </div>
          <div className="calculator-result">
            <span>VAT</span>
            <span>{calculatedValues.VATonsalesValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCalculator;
