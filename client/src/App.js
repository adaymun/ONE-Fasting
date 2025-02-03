import React, { useState } from 'react';
import FastingPlanList from './components/FastingPlanList';
import FastingPlanForm from './components/FastingPlanForm';

// Main App component for ONE - Intermittent Fasting React client
function App() {
  // State to force refresh of the plan list when a new plan is created
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePlanCreated = (newPlan) => {
    // When a new plan is successfully created, update the refresh key to re-mount FastingPlanList
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Header for the application */}
      <h1>Welcome to ONE - Intermittent Fasting</h1>
      {/* Brief description */}
      <p>This health web app helps you track intermittent fasting and manage premium features.</p>
      
      {/* FastingPlanForm to create new fasting plans */}
      <FastingPlanForm onPlanCreated={handlePlanCreated} />

      {/* FastingPlanList to display the list of fasting plans, re-rendered when refreshKey changes */}
      <FastingPlanList key={refreshKey} />
    </div>
  );
}

// Exporting the App component as default for use in index.js and elsewhere
export default App; 