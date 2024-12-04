import React, { useState } from 'react';
import './inventory.css';

export function Inventory() {
  const [strengthScore, setStrengthScore] = useState(20); // Default to 1 column
  const [squares, setSquares] = useState([]); // State to hold draggable squares

  // Drag and drop functions
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => e.target.classList.add('dragging'), 0); // Add a dragging class
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging'); // Remove the dragging class
    e.target.style.visibility = 'visible'; // Ensure visibility is restored
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allows the drop event to be triggered
  };

  const handleDrop = (e) => {
    e.preventDefault();

    // Get the dragged element
    const draggedSquare = document.querySelector('.square.dragging');

    // Place the square inside the grid cell
    if (draggedSquare && !e.target.querySelector('.square')) {
      e.target.appendChild(draggedSquare);
    }
  };

  const handleSquareClick = (e) => {
    const square = e.target;

    // Create or display the editing form
    let editForm = document.querySelector('#edit-form');
    if (!editForm) {
      editForm = document.createElement('div');
      editForm.id = 'edit-form';
      editForm.style.position = 'absolute';
      editForm.style.top = '10px';
      editForm.style.right = '10px';
      editForm.style.padding = '10px';
      editForm.style.background = '#fff';
      editForm.style.border = '1px solid #000';
      editForm.innerHTML = `
        <label>
          Name: <input type="text" id="square-name" />
        </label>
        <br />
        <label>
          Info: <textarea id="square-info"></textarea>
        </label>
        <br />
        <button id="save-btn">Save</button>
        <button id="delete-btn">Delete</button> <!-- Added delete button -->
      `;
      document.body.appendChild(editForm);
    }

    // Populate form with the square's current data
    const nameInput = document.querySelector('#square-name');
    const infoTextarea = document.querySelector('#square-info');
    nameInput.value = square.dataset.name || `Square ${square.id}`;
    infoTextarea.value = square.dataset.info || 'No additional information.';

    // Save button functionality
    const saveButton = document.querySelector('#save-btn');
    saveButton.onclick = () => {
      square.dataset.name = nameInput.value;
      square.dataset.info = infoTextarea.value;
      square.textContent = nameInput.value; // Display the name on the square
      alert('Square information updated!');
    };

    // Delete button functionality
    const deleteButton = document.querySelector('#delete-btn');
    deleteButton.onclick = () => {
      if (confirm('Are you sure you want to delete this square?')) {
        square.remove();
        editForm.remove(); // Remove the edit form as well
        alert('Square deleted!');
      }
    };
  };

  const handleAddObject = () => {
    const newSquare = {
      id: `square-${squares.length + 1}`,
      name: `Square ${squares.length + 1}`,
      info: 'No additional information.',
    };
    setSquares([...squares, newSquare]);
  };

  const handleStrengthScoreChange = (e) => {
    setStrengthScore(Number(e.target.value));
  };

  const renderGrid = () => {
    const rows = 5;
    const cols = strengthScore;

    const containerClass = strengthScore < 8 ? 'grid-container shrink' : 'grid-container';

    return (
      <div className={containerClass} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: rows * cols }, (_, index) => (
          <div
            key={index}
            className="grid-cell"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <main>
      <div className="draggable-container">
        {squares.map((square) => (
          <div
            key={square.id}
            id={square.id}
            className="square"
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleSquareClick}
          >
            {square.name}
          </div>
        ))}
      </div>
      <section id="object-creator">
        <label htmlFor="Strength-Score">Strength Score:</label>
        <select
          id="Strength-Score"
          value={strengthScore}
          onChange={handleStrengthScoreChange}
        >
          {Array.from({ length: 17 }, (_, i) => (
            <option key={20 - i} value={20 - i}>
              {20 - i}
            </option>
          ))}
        </select>
        <button id="add-object" onClick={handleAddObject}>
          Add Object
        </button>
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
          <h6>
            (-10 speed)
          </h6>
          {renderGrid()}
          <h3>Heavily Encumbered</h3>
          <h6>
            (-20 speed and you have disadvantage on ability checks, attack rolls,
            and saving throws that use Strength, Dexterity, or Constitution.)
          </h6>
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

