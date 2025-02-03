import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Get the root element from the HTML where the app will be mounted
const container = document.getElementById('root');

// Create a root using React 18's createRoot API
const root = ReactDOM.createRoot(container);

// Render the main App component inside React.StrictMode for highlighting potential issues
root.render(
  <React.StrictMode>
    {/* Main App component rendering the application */}
    <App />
  </React.StrictMode>
); 