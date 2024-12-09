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
 
### React
- **Purpose**: Creates a single-page application with dynamic components.
- **Key Features**:
  - The inventory grid will be componentized, with each item as a React component.
  - Real-time reactivity when users move or remove items from the grid.

### Web Service
- **Purpose**: Facilitates communication between the client and server.
- **Endpoints**:
  - **GET**  Fetches the current state of the user's inventory.
  - **POST** Saves the user's inventory after changes.
  - **GET** Fetches details about a specific item.
  - **Third-party service**: Uses [Dog CEO’s API](https://dog.ceo/api/breeds/image/random) to display random pictures of dogs as item placeholders for fun.

### Authentication
- **Purpose**: Allows users to register and log in to save their inventory.
- **Implementation**:
  - Users will create accounts with email and password.
  - Authenticated users will have access to their personalized inventory.

### Database Data
- **Purpose**: Provides persistent storage of users' inventories and items.
- **Key Features**:
  - The database will store user data, inventory configurations, and item details.
  - Users’ login credentials will be securely stored, and only authenticated users can access their inventories.

### WebSocket
- **Purpose**: Enables real-time updates for the inventory system.
- **Key Features**:
  - WebSockets will push updates whenever users modify their inventory, ensuring game masters or other players can see these updates live.

## Application Design

### Layout

Here’s a rough sketch of the application's user interface:

**Login Page**:
- Simple form with email and password fields
- A “Create Account” option for new users

![LogIn Mockup](https://github.com/Jacobadia/startup/blob/main/Inventory%20login.png?raw=true)

**Inventory Page**:
- A grid where users can drag and drop items
- Item slots will be visually laid out to mimic a TTRPG-style inventory
- A sidebar displaying item details, such as stats, weight, and description, when clicked

![Inventory Mockup](https://github.com/Jacobadia/startup/blob/main/Inventory.png?raw=true)

# HTML Deliverable
- [x] HTML pages for each component of your application
    - Two pages one to log in and the other for the interactable inventory
- [x] Proper use of HTML tags including BODY, NAV, MAIN, HEADER, FOOTER
- [x] Links between pages as necessary
  - Navigation in header 
- [x] Application textual content
  - Titles on pages and labels buttons
- [x] Placeholder for 3rd party service calls
  - Random duck pictures API placeholder (pictures will be placed onto the objects that can be dragged)
- [x] Application images
  - icon and suitcase image on login page 
- [x] Login placeholder, including user name display
- [x] Database data placeholder showing content stored in the database
- [x] WebSocket data placeholder showing where realtime communication will go

# CSS Deliverable
- [x] Properly styled CSS Header, footer, and main content body
    - Three pages one to log in, the other for the interactable inventory, and an about page
- [x] Navigation elements
    - nav in the header
- [x] Links between pages as necessary
  - Navigation in header 
- [x] Responsive to window resizing
  - each page designed with @media when necessary
- [x] Application elements
  - Styled buttons and forms
- [x] Application images
  - suitcase image on about page 
- [x] Application text content
  - styled about page

## React deliverable

For this deliverable I used JavaScript and React so that the application completely works for a single user. I also added placeholders for future technology.

- [x] **Bundled and transpiled** - done!
- [x] **Components** - Login, inventory and about are components with mocks for login, WebSocket.
  - [x] **login** - When you press enter or the login button it takes you to the inventory page and displays the username.
  - [x] **database** - Displayes item and item descriptions. Currently this is stored and retrieved from local storage, but it will be replaced with the database data later.
  - [x] **WebSocket** - Simulates real-time updates. Once implemented, it will allow inventory changes to be reflected live across multiple connected users.
- [x] **Router** - Routing between login and inventory and about components.
- [x] **Hooks**
  - **useState**: 
    - Used in the `Login` component to manage username input.
    - Used in the `Inventory` component to manage inventory items and grid size based on the strength score.
  - **useContext**: 
    - Provides global state for the username via a `UserContext`.
    - Used in `Login` to set the username and in `Inventory` to display it.
  - **useNavigate**: 
    - Used in the `Login` component for programmatically navigating to the inventory page after a successful login.

## Service deliverable

For this deliverable, I created a full-stack web application, the application includes a Node.js/Express backend and a React frontend with dynamic interaction.

- [x] **Node.js/Express HTTP service** - I created the backend service using Express, handling endpoints for user authentication and inventory management.
- [x] **Static middleware for frontend** - I used Express static middleware to serve the frontend content from the public directory.
- [x] **Calls to third party endpoints** - I implemented calls to the Picsum Photos API for random artwork and the Useless Facts API for fun facts. (on the about page)
- [x] **Backend service endpoints** - I created authentication endpoints (create, login, logout) and endpoints for fetching and saving user inventories.
- [x] **Frontend calls service endpoints** - I used the fetch function to interact with the backend endpoints for user authentication and inventory management. (login and inventory pages)

