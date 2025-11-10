import { useState } from 'react';
import { BabylonianDigit } from './components/BabylonianDigit';
import { convertToBase60, isValidBabylonianInput } from './utils/babylonianConverter';
import { shouldDisplayZero } from './utils/zeroDisplay';
import { BABYLONIAN_CONFIG, ERA_LABELS, type BabylonianEra } from './config/constants';
import './App.css';

function App() {
  const [decimalNumber, setDecimalNumber] = useState<number>(BABYLONIAN_CONFIG.DEFAULT_NUMBER);
  const [selectedEra, setSelectedEra] = useState<BabylonianEra>(BABYLONIAN_CONFIG.DEFAULT_ERA);

  /**
   * Handles changes to the historical era selection
   */
  const handleEraChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedEra(event.target.value as BabylonianEra);
  };

  /**
   * Handles changes to the decimal number input field
   * Automatically removes leading zeros (e.g., "007" becomes 7)
   */
  const handleInputChange = (inputEvent: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = inputEvent.target.value;

    // Handle empty input
    if (inputValue === '') {
      setDecimalNumber(0);
      return;
    }

    // Parse input - this automatically removes leading zeros
    const parsedNumber = parseInt(inputValue, 10);

    // Validate and set the parsed number (without leading zeros)
    if (isValidBabylonianInput(parsedNumber)) {
      setDecimalNumber(parsedNumber);
    }
  };

  // Convert decimal number to array of base-60 digits
  const babylonianDigits = convertToBase60(decimalNumber);

  return (
    <div className="App">
      <h1>Decimal to Babylonian Cuneiform Numeral Converter</h1>
      <div className="converter-container">
        <div className="era-selection">
          <label htmlFor="era-select">zero notation:</label>
          <select
            id="era-select"
            value={selectedEra}
            onChange={handleEraChange}
            className="era-select"
          >
            <option value="OLD_BABYLONIA">{ERA_LABELS.OLD_BABYLONIA}</option>
            <option value="SELEUCID_ERA">{ERA_LABELS.SELEUCID_ERA}</option>
            <option value="EXTENDED_POSITIONAL">{ERA_LABELS.EXTENDED_POSITIONAL}</option>
          </select>
        </div>

        <label htmlFor="decimal-input">Enter a non-negative number:</label>
        <input
          id="decimal-input"
          type="number"
          value={decimalNumber}
          onChange={handleInputChange}
          min={BABYLONIAN_CONFIG.MIN_NUMBER}
          className="decimal-input"
        />
        <div className="cuneiform-display">
          {babylonianDigits.map((digit, index) => (
            <BabylonianDigit
              key={index}
              digit={digit}
              shouldDisplayZero={shouldDisplayZero(babylonianDigits, index, selectedEra)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
