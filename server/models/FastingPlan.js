/*
 * FastingPlan.js
 * Purpose: Defines the Mongoose schema and model for intermittent fasting plans.
 */

const mongoose = require('mongoose');

const FastingPlanSchema = new mongoose.Schema(
  {
    // The name of the fasting plan.
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Duration of the fasting plan (e.g., in hours)
    duration: {
      type: Number,
      required: true,
    },
    // A brief description of the fasting plan.
    description: {
      type: String,
      required: true,
    },
    // Flag to indicate if the plan is a premium feature.
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export the FastingPlan model
module.exports = mongoose.model('FastingPlan', FastingPlanSchema); 