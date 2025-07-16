# HermesDB Frontend

This frontend is built with React and provides the user interface for HermesDB.

## Project Structure

- **src/App.tsx**: Main application component.
- **src/assets/**: Static assets and images.
- **src/pages/**: Contains the main screens (e.g., ChatScreen, HomeScreen).
- **src/components/**: Reusable UI components.
- **src/hooks/**: React hooks.
- **src/utils/**: Reusable UI logic.
- **src/services/api/**: API service logic for communicating with the backend.

## Requirements

- **Node.js** (recommended: latest LTS)
- **npm** or **pnpm**

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Frontend Server

```bash
npm run dev
```


The app will be available at [http://localhost:5173](http://localhost:5173).

> **Important:**  
> Make sure the HermesDB backend is running and accessible for the frontend to function properly.

### 3. Build for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist/` folder.

---

> **Note:**  
> For development, the frontend expects the backend to be running locally on its default port. Adjust API endpoints in the service files (vite.config.ts) if your backend runs elsewhere.

---
