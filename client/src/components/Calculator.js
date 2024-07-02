import React, { useEffect, useState } from 'react';
import './Calculator.css';

const Calculator = ({ onExchangeRateChange, onOtherInputChange, invoiceAmount }) => {
  const [exchangeRate, setExchangeRate] = useState('');
  const [inputs, setInputs] = useState({
    freightCharge: 2.5,
    seaAirFreight: 3,
    customsTaxVAT: 5,
    inlandFreightCharge: 1,
    advanceIncomeTax: 5,
  });
  const [calculatedValues, setCalculatedValues] = useState({
    freightChargeValue: '',
    seaAirFreightValue: '',
    customsTaxVATValue: '',
    inlandFreightChargeValue: '',
    advanceIncomeTaxValue: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'exchangeRate':
        setExchangeRate(value);
        onExchangeRateChange(value);
        break;
      default:
        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        onOtherInputChange(name, value);
        break;
    }
  };

  useEffect(() => {
    calculateValues();
  }, [invoiceAmount, inputs]);

  const calculateValues = () => {
    const freightChargeValue = ((parseFloat(inputs.freightCharge) / 100) * invoiceAmount).toFixed(2);
    const seaAirFreightValue = ((parseFloat(inputs.seaAirFreight) / 100) * invoiceAmount).toFixed(2);
    const customsTaxVATValue = ((parseFloat(inputs.customsTaxVAT) / 100) * invoiceAmount).toFixed(2);
    const inlandFreightChargeValue = ((parseFloat(inputs.inlandFreightCharge) / 100) * invoiceAmount).toFixed(2);
    const advanceIncomeTaxValue = ((parseFloat(inputs.advanceIncomeTax) / 100) * invoiceAmount).toFixed(2);

    setCalculatedValues({
      freightChargeValue,
      seaAirFreightValue,
      customsTaxVATValue,
      inlandFreightChargeValue,
      advanceIncomeTaxValue,
    });
  };

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">Cost Calculator</h2>
      <div className="calculator-box">
        <div className="calculator-inputs">
          <div className="calculator-input">
            <label htmlFor="exchangeRate">Exchange Rate:</label>
            <input
              type="text"
              id="exchangeRate"
              name="exchangeRate"
              value={exchangeRate}
              onChange={handleInputChange}
              placeholder="Enter exchange rate"
              className="calculator-input-field"
            />
          </div>
          {Object.entries(inputs).map(([name, value]) => (
            <div className="calculator-input" key={name}>
              <label htmlFor={name}>{`${name.charAt(0).toUpperCase()}${name.slice(1)} (%):`}</label>
              <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={handleInputChange}
                placeholder={`Enter ${name}`}
                className="calculator-input-field"
              />
            </div>
          ))}
        </div>
        <div className="calculator-results">
          <div className="calculator-result">
            <span>Freight Charge Value:</span>
            <span>{calculatedValues.freightChargeValue}</span>
          </div>
          <div className="calculator-result">
            <span>Sea/Air Freight Value:</span>
            <span>{calculatedValues.seaAirFreightValue}</span>
          </div>
          <div className="calculator-result">
            <span>Customs Tax and VAT Value:</span>
            <span>{calculatedValues.customsTaxVATValue}</span>
          </div>
          <div className="calculator-result">
            <span>Inland Freight Charge Value:</span>
            <span>{calculatedValues.inlandFreightChargeValue}</span>
          </div>
          <div className="calculator-result">
            <span>Advance Income Tax Value:</span>
            <span>{calculatedValues.advanceIncomeTaxValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
