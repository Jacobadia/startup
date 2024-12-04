import React, { useState } from 'react';
import './inventory.css';

export function Inventory() {
  const [strengthScore, setStrengthScore] = useState(20); // Default to 1 column
  const [items, setItems] = useState([]); // State to hold draggable items

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
    const draggedItem = document.querySelector('.item.dragging');

    // Place the item inside the grid cell
    if (draggedItem && !e.target.querySelector('.item')) {
      e.target.appendChild(draggedItem);
    }
  };

  const handleItemClick = (e) => {
    const item = e.target;

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
          Name: <input type="text" id="item-name" />
        </label>
        <br />
        <label>
          Info: <textarea id="item-info"></textarea>
        </label>
        <br />
        <button id="save-btn">Save</button>
        <button id="delete-btn">Delete</button> <!-- Added delete button -->
      `;
      document.body.appendChild(editForm);
    }

    // Populate form with the item's current data
    const nameInput = document.querySelector('#item-name');
    const infoTextarea = document.querySelector('#item-info');
    nameInput.value = item.dataset.name || `Item ${item.id}`;
    infoTextarea.value = item.dataset.info || 'No additional information.';

    // Save button functionality
    const saveButton = document.querySelector('#save-btn');
    saveButton.onclick = () => {
      item.dataset.name = nameInput.value;
      item.dataset.info = infoTextarea.value;
      item.textContent = nameInput.value; // Display the name on the item
      alert('Item information updated!');
    };

    // Delete button functionality
    const deleteButton = document.querySelector('#delete-btn');
    deleteButton.onclick = () => {
      if (confirm('Are you sure you want to delete this item?')) {
        item.remove();
        editForm.remove(); // Remove the edit form as well
        alert('Item deleted!');
      }
    };
  };

  const handleAddObject = () => {
    const newItem = {
      id: `item-${items.length + 1}`,
      name: `Item ${items.length + 1}`,
      info: 'No additional information.',
    };
    setItems([...items, newItem]);
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
        {items.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="item"
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleItemClick}
          >
            {item.name}
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

