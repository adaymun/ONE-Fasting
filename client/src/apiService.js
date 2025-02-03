/*
 * apiService.js
 * Purpose: Provides functions to interact with the backend API for ONE - Intermittent Fasting.
 */

/**
 * Function: getFastingPlans
 * Purpose: Fetches the fasting plans from the backend API.
 * It uses a relative URL which, thanks to the proxy setting in package.json,
 * will be automatically routed to http://localhost:5001 when in development.
 * @returns {Object} - The JSON response from the API or an error message on failure.
 */
export async function getFastingPlans() {
  try {
    // Fetch from the fasting plans endpoint; the proxy will forward this call in development
    const response = await fetch('/api/fasting/plans');
    // If the response is not OK, throw an error to be caught below
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getFastingPlans:', error);
    return { message: 'Error fetching data' };
  }
}

/**
 * Function: createFastingPlan
 * Purpose: Sends a POST request to create a new fasting plan in the backend database.
 * @param {Object} planData - The fasting plan data, including name, duration, description, and isPremium flag.
 * @returns {Object} - The JSON response from the API (the created plan) or an error message on failure.
 */
export async function createFastingPlan(planData) {
  try {
    const response = await fetch('/api/fasting/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planData)
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating fasting plan:', error);
    return { message: 'Error creating fasting plan' };
  }
}

/**
 * Function: deleteFastingPlan
 * Purpose: Sends a DELETE request to remove a fasting plan from the backend database.
 * @param {String} planId - The ID of the fasting plan to delete.
 * @returns {Object} - The JSON response from the API or an error message on failure.
 */
export async function deleteFastingPlan(planId) {
  try {
    const response = await fetch(`/api/fasting/plans/${planId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting fasting plan:', error);
    return { message: 'Error deleting fasting plan' };
  }
}

/**
 * Function: updateFastingPlan
 * Purpose: Sends a PUT request to update an existing fasting plan in the backend database.
 * @param {String} planId - The ID of the fasting plan to update.
 * @param {Object} updateData - The data to update for the fasting plan.
 * @returns {Object} - The JSON response from the API (the updated plan) or an error message on failure.
 */
export async function updateFastingPlan(planId, updateData) {
  try {
    const response = await fetch(`/api/fasting/plans/${planId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating fasting plan:', error);
    return { message: 'Error updating fasting plan' };
  }
} 