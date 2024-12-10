import React, { useState, useContext, useEffect } from 'react';
import './inventory.css';
import { UserContext } from '../UserContext';

export function Inventory() {
  const { username } = useContext(UserContext); // Access the username
  const [strengthScore, setStrengthScore] = useState(20); // Default to 20 columns
  const [items, setItems] = useState([]); // State to hold draggable items
  const [selectedItem, setSelectedItem] = useState(null); // For editing an item
  const [error, setError] = useState(''); // Error handling
  const [loading, setLoading] = useState(true); // Loading state

  const grids = ['notEncumbered', 'encumbered', 'heavilyEncumbered']; // Grid identifiers

  // Fetch items from the backend when the component mounts
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch('/api/inventory');
        if (response.ok) {
          const data = await response.json();
          console.log("apiresponse: ", data);
  
          // Extract the items correctly from the nested structure
          if (data.items && Array.isArray(data.items.items)) {
            setItems(data.items.items); // Set the items in state
          } else {
            console.error("Unexpected inventory structure:", data);
            setError('⚠ Inventory data format is incorrect.');
          }
        } else {
          const errorData = await response.json();
          setError(`⚠ Failed to load inventory: ${errorData.msg}`);
        }
      } catch (err) {
        console.error('⚠ Network error while loading inventory.', err);
        setError('⚠ Network error while loading inventory.');
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    fetchInventory();
  }, []);

  // Save items to the backend whenever the `items` state changes
  useEffect(() => {
    const saveInventory = async () => {
      try {
        const response = await fetch('/api/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Failed to save inventory: ${errorData.msg}`);
          setError('⚠ Failed to save inventory. Try again later.');
        }
      } catch (err) {
        console.error('⚠ Network error while saving inventory.');
        setError('⚠ Network error while saving inventory.');
      }
    };

    if (items.length > 0) saveInventory(); // Save only if there are items
  }, [items]);

  // Add a new object to the inventory
  const handleAddObject = () => {
    const newItem = {
      id: `item-${items.length + 1}`,
      name: `Item ${items.length + 1}`,
      info: 'No additional information.',
      position: { grid: null, cell: null }, // Separate grid and cell
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  // Handle item edits
  const handleSaveItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setSelectedItem(null); // Close the editing form
  };

  // Handle item deletion
  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      setSelectedItem(null); // Close the editing form if open
    }
  };

  // Drag-and-Drop Handlers
  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDrop = (e, grid, cellIndex) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, position: { grid, cell: cellIndex } }
          : item
      )
    );
  };

  const handleDragOver = (e) => e.preventDefault(); // Allows drop

  // Render the editing form as a popup
  const renderEditForm = () => {
    if (!selectedItem) return null;
    return (
      <div id="edit-form" style={{ position: 'fixed', top: '10px', right: '10px', padding: '10px', background: '#fff', border: '1px solid #000', zIndex: 1000 }}>
        <label>
          Name:
          <input type="text" value={selectedItem.name} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} />
        </label>
        <br />
        <label>
          Info:
          <textarea value={selectedItem.info} onChange={(e) => setSelectedItem({ ...selectedItem, info: e.target.value })}></textarea>
        </label>
        <br />
        <button onClick={() => handleSaveItem(selectedItem)}>Save</button>
        <button onClick={() => handleDeleteItem(selectedItem.id)}>Delete</button>
        <button onClick={() => setSelectedItem(null)}>Close</button>
      </div>
    );
  };

  // Render the grid
  const renderGrid = (label, description, gridKey) => {
    const rows = 5;
    const cols = strengthScore;
    const totalCells = rows * cols;

    return (
      <>
        <h3>{label}</h3>
        <h6>{description}</h6>
        <div className={`grid-container ${strengthScore < 8 ? 'shrink' : ''}`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: totalCells }, (_, index) => (
            <div key={index} className="grid-cell" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, gridKey, index)}>
              {items
                .filter(
                  (item) =>
                    item.position.grid === gridKey &&
                    item.position.cell === index
                )
                .map((item) => (
                  <div
                    key={item.id}
                    id={item.id}
                    className="item"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onClick={() => setSelectedItem(item)} // Open edit form on click
                  >
                    {item.name}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </>
    );
  };

  if (loading) return <p>Loading inventory...</p>;

  return (
    <main>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="draggable-container">
        {items.filter((item) => item.position.grid === null).map((item) => (
          <div key={item.id} id={item.id} className="item" draggable="true" onDragStart={(e) => handleDragStart(e, item.id)} onClick={() => setSelectedItem(item)}>
            {item.name}
          </div>
        ))}
      </div>
      {renderEditForm()} {/* Render the editing form */}
      <section id="object-creator">
        <label htmlFor="Strength-Score">Strength Score:</label>
        <select id="Strength-Score" value={strengthScore} onChange={(e) => setStrengthScore(Number(e.target.value))}>
          {Array.from({ length: 17 }, (_, i) => (
            <option key={20 - i} value={20 - i}>
              {20 - i}
            </option>
          ))}
        </select>
        <button id="add-object" onClick={handleAddObject}>
          Add Object
        </button>
      </section>
      <section id="inventory-section">
        <h2>{username ? `${username}'s Inventory` : 'Inventory'}</h2>
        {renderGrid('Not Encumbered!', '', 'notEncumbered')}
        {renderGrid('Encumbered', '(-10 speed)', 'encumbered')}
        {renderGrid('Heavily Encumbered', '(-20 speed and disadvantage on ability checks, attack rolls, and saving throws that use Strength, Dexterity, or Constitution.)', 'heavilyEncumbered')}
      </section>
    </main>
  );
}
