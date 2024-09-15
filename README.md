# TTRPG Inventory Manager

## Elevator Pitch

The TTRPG Inventory Manager is a web-based tool inspired by the Resident Evil 4 inventory system, designed for tabletop role-playing games (TTRPGs). It allows players to manage and organize their in-game items visually, helping them fit everything into limited inventory spaces and helping them not to forget all the crap they carry around. With simple drag-and-drop interactivity, users can arrange items, weapons, and equipment in a grid-based inventory, making it perfect for a variety of TTRPG campaigns.

## Key Features

- **Grid-Based Inventory**: A visual inventory management system similar to Resident Evil 4, featuring a drag-and-drop interface for organizing items.
- **Item Stats & Descriptions**: Players can click on items to view/edit item descriptions.
- **Save and Load**: Persistent storage of inventory configurations that can be retrieved across game sessions.
- **Real-Time Updates**: Game masters and players can push real-time inventory updates using WebSockets.
- **User Authentication**: Players can create accounts and log in to save and manage their personalized inventories.

## Technologies

### HTML
- **Purpose**: Provides the foundational structure of the inventory manager.
- **Pages**: The site will consist of two primary HTML pages:
  - **Login page**: A simple page where users can create an account or log in.
  - **Inventory page**: The main page for viewing and interacting with the inventory grid.

### CSS
- **Purpose**: Adds styling to the inventory manager to create a clean, visually appealing grid-based layout.
- **Key Features**:
  - Responsive design ensuring the layout works on various screen sizes.
  - Styling for the grid, items, buttons, and modals that display item details.

### JavaScript
- **Purpose**: Handles the interactivity of the inventory system.
- **Key Features**:
  - Drag-and-drop functionality for rearranging items.
  - Click event handlers for showing item descriptions.
