import React, { useState } from 'react';
import './inventory.css';

export function Inventory() {
  const [strengthScore, setStrengthScore] = useState(20); // Default to 1 column

  const handleStrengthScoreChange = (e) => {
    setStrengthScore(Number(e.target.value));
  };

  const renderGrid = () => {
    const rows = 5;
    const cols = strengthScore;

    const containerClass = strengthScore < 8 ? "grid-container shrink" : "grid-container";

    return (
      <div className={containerClass} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: rows * cols }, (_, index) => (
          <div key={index} className="grid-cell"></div>
        ))}
      </div>
    );
  };

  return (
    <main>
      <section id="object-creator">
        <label htmlFor="Strength-Score">Strength Score:</label>
        <select
          id="Strength-Score"
          value={strengthScore}
          onChange={handleStrengthScoreChange}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <option key={20 - i} value={20 - i}>
              {20 - i}
            </option>
          ))}
        </select>
        <button id="add-object">Add Object</button>
        <div id="API-Placeholder">
          <h10>Random Duck Pictures API PlaceHolder</h10>
        </div>
      </section>

      <section id="inventory-section">
        <h2>Username-Placeholder's Inventory</h2>

        <div id="inventory-grid">
          <h3>Not Encumbered!</h3>
          {renderGrid()}
          <h3>Encumbered</h3>
          <h6>(-10 speed)</h6>
          {renderGrid()}
          <h3>Heavly Encumbered</h3>
          <h6>(-20 speed and you have disadvantage on ability checks, attack rolls, and saving throws that use Strength, Dexterity, or Constitution.)</h6>
          {renderGrid()}
        </div>

        <div id="websocket-placeholder">
          <h3>WebSocket Placeholder</h3>
          <p>Inventory data will Real-time update so players can share an inventory</p>
        </div>

        <div id="database-placeholder">
          <h3>Database Placeholder</h3>
          <p>Inventory data will be fetched from the database and displayed in the grid above.</p>
        </div>
      </section>
    </main>
  );
}
