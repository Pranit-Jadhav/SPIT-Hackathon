# Neon Dashboard - React Application

A modern warehouse operations management dashboard built with React.js.

## Features

- **Dashboard**: Overview of receipt and delivery operations
- **Receipt Operations**: Manage incoming stock with table and kanban views
- **Delivery Operations**: Manage outgoing stock with stock validation
- **Modern UI**: Neon-themed design with smooth animations
- **Responsive**: Works on all screen sizes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js          # Main dashboard page
│   ├── Receipt.js            # Receipt operations page
│   ├── Delivery.js           # Delivery operations page
│   ├── ReceiptModal.js       # Receipt form modal
│   ├── DeliveryModal.js      # Delivery form modal
│   └── Header.js             # Shared header component
├── App.js                    # Main app component with routing
├── index.js                  # Entry point
└── index.css                 # Global styles
```

## Technologies Used

- React 18
- React Router DOM
- CSS3 (with animations)
- Create React App

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

