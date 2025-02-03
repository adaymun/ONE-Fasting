/*
 * fastingController.js
 * Purpose: Contains functions to manage intermittent fasting plans and premium feature endpoints.
 */

const FastingPlan = require('../models/FastingPlan');

/**
 * Function: getFastingPlans
 * Purpose: Retrieve all fasting plans from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function getFastingPlans(req, res) {
  try {
    // Fetch all fasting plans from the database
    const plans = await FastingPlan.find({});
    res.json(plans);
  } catch (error) {
    console.error('Error fetching fasting plans:', error);
    res.status(500).json({ message: 'Error fetching fasting plans.' });
  }
}

/**
 * Function: createFastingPlan
 * Purpose: Create a new fasting plan in the database.
 * @param {Object} req - The request object containing fasting plan data in req.body.
 * @param {Object} res - The response object.
 */
async function createFastingPlan(req, res) {
  try {
    const { name, duration, description, isPremium } = req.body;
    // Create a new fasting plan using the data from the request body
    const plan = new FastingPlan({ name, duration, description, isPremium });
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    console.error('Error creating fasting plan:', error);
    res.status(500).json({ message: 'Error creating fasting plan.' });
  }
}

/**
 * Function: updateFastingPlan
 * Purpose: Update an existing fasting plan in the database.
 * @param {Object} req - The request object containing fasting plan data in req.body and the plan id in req.params.
 * @param {Object} res - The response object.
 */
async function updateFastingPlan(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    // Find and update the fasting plan with the provided id
    const updatedPlan = await FastingPlan.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedPlan) {
      return res.status(404).json({ message: 'Fasting plan not found.' });
    }
    res.json(updatedPlan);
  } catch (error) {
    console.error('Error updating fasting plan:', error);
    res.status(500).json({ message: 'Error updating fasting plan.' });
  }
}

/**
 * Function: deleteFastingPlan
 * Purpose: Delete an existing fasting plan from the database.
 * @param {Object} req - The request object containing the plan id in req.params.
 * @param {Object} res - The response object.
 */
async function deleteFastingPlan(req, res) {
  try {
    const { id } = req.params;
    console.log('Deleting fasting plan with id:', id);
    
    // Check if the provided id is a valid MongoDB ObjectId
    if (!require('mongoose').Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid fasting plan id.' });
    }

    const deletedPlan = await FastingPlan.findByIdAndDelete(id);
    if (!deletedPlan) {
      return res.status(404).json({ message: 'Fasting plan not found.' });
    }
    res.json({ message: 'Fasting plan deleted successfully.' });
  } catch (error) {
    console.error('Error deleting fasting plan:', error);
    res.status(500).json({ message: 'Error deleting fasting plan.' });
  }
}

// Export the controller functions for use in route definitions
module.exports = {
  getFastingPlans,
  createFastingPlan,
  updateFastingPlan,
  deleteFastingPlan
}; 