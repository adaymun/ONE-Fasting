/*
 * fastingRoutes.js
 * Purpose: Defines API routes for managing intermittent fasting related endpoints.
 */

// Import the Express module and create a router instance
const express = require('express');
const router = express.Router();

// Import the fastingController to handle the logic for fasting routes
const fastingController = require('../controllers/fastingController');

/**
 * Route: GET /plans
 * Purpose: Retrieve a list of fasting plans
 * This route delegates to fastingController.getFastingPlans for handling the request
 */
router.get('/plans', fastingController.getFastingPlans);

/**
 * Route: POST /plans
 * Purpose: Create a new fasting plan
 * This route delegates to fastingController.createFastingPlan for handling the request
 */
router.post('/plans', fastingController.createFastingPlan);

/**
 * Route: PUT /plans/:id
 * Purpose: Update an existing fasting plan
 * This route delegates to fastingController.updateFastingPlan for handling the request
 */
router.put('/plans/:id', fastingController.updateFastingPlan);

/**
 * Route: DELETE /plans/:id
 * Purpose: Delete an existing fasting plan
 * This route delegates to fastingController.deleteFastingPlan for handling the request
 */
router.delete('/plans/:id', fastingController.deleteFastingPlan);

// Export the router so it can be mounted in app.js
module.exports = router; 