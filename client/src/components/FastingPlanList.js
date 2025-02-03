import React, { useState, useEffect } from 'react';
import { getFastingPlans, deleteFastingPlan, updateFastingPlan } from '../apiService';

const FastingPlanList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    duration: '',
    description: '',
    isPremium: false,
  });

  const fetchData = async () => {
    try {
      const data = await getFastingPlans();
      setPlans(data);
    } catch (err) {
      console.error('Error fetching fasting plans:', err);
      setError('Error fetching plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteFastingPlan(id);
    console.log('Delete result:', result);
    if (result && result.message === 'Fasting plan deleted successfully.') {
      // Refresh the list
      fetchData();
    } else {
      alert('Failed to delete plan. Received response: ' + JSON.stringify(result));
    }
  };

  const handleEdit = (plan) => {
    setEditingPlanId(plan._id);
    setEditFormData({
      name: plan.name,
      duration: plan.duration,
      description: plan.description,
      isPremium: plan.isPremium,
    });
  };

  const handleCancelEdit = () => {
    setEditingPlanId(null);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSaveEdit = async (id) => {
    const updateData = {
      ...editFormData,
      duration: Number(editFormData.duration),
    };
    const updatedPlan = await updateFastingPlan(id, updateData);
    if (updatedPlan && updatedPlan._id) {
      setEditingPlanId(null);
      fetchData();
    } else {
      alert('Failed to update plan');
    }
  };

  if (loading) return <div>Loading fasting plans...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Fasting Plans</h2>
      <ul>
        {plans.map(plan => (
          <li key={plan._id} style={{ marginBottom: '10px' }}>
            {editingPlanId === plan._id ? (
              <div>
                <input 
                  type="text" 
                  name="name" 
                  value={editFormData.name} 
                  onChange={handleEditChange} 
                />
                <input 
                  type="number" 
                  name="duration" 
                  value={editFormData.duration} 
                  onChange={handleEditChange} 
                />
                <input 
                  type="text" 
                  name="description" 
                  value={editFormData.description} 
                  onChange={handleEditChange} 
                />
                <label>
                  Premium:
                  <input 
                    type="checkbox" 
                    name="isPremium" 
                    checked={editFormData.isPremium} 
                    onChange={handleEditChange} 
                  />
                </label>
                <button onClick={() => handleSaveEdit(plan._id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{plan.name}</strong> &mdash; {plan.duration} hours<br />
                {plan.description} {plan.isPremium && <span style={{ color: 'red' }}>(Premium)</span>}
                <br />
                <button onClick={() => handleEdit(plan)}>Edit</button>
                <button onClick={() => handleDelete(plan._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FastingPlanList; 