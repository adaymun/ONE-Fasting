import React, { useState } from 'react';
import { createFastingPlan } from '../apiService';

const FastingPlanForm = ({ onPlanCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
    isPremium: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure duration is a number
    const planData = { ...formData, duration: Number(formData.duration) };
    const createdPlan = await createFastingPlan(planData);
    if (createdPlan && createdPlan._id) {
      if (onPlanCreated) {
        onPlanCreated(createdPlan);
      }
      // Clear form
      setFormData({
        name: '',
        duration: '',
        description: '',
        isPremium: false,
      });
    } else {
      alert('Failed to create plan');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Create New Fasting Plan</h2>
      <div>
        <label>
          Name: 
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Duration (hours): 
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Premium:
          <input
            type="checkbox"
            name="isPremium"
            checked={formData.isPremium}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Create Plan</button>
    </form>
  );
};

export default FastingPlanForm; 