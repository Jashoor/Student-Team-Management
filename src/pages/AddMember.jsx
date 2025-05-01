import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const AddMember = () => {
  const { addMember, loading, error } = useContext(AppContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmissionError(null);
      
      // Convert skills string to array
      if (data.skills) {
        data.skills = data.skills.split(',').map(skill => skill.trim());
      }
      
      // Add image to data if it exists
      if (data.image && data.image.length > 0) {
        data.image = data.image[0];
      }

      await addMember(data);
      setSubmissionSuccess(true);
      reset();
      setImagePreview(null);
      
      // Navigate to members page after short delay
      setTimeout(() => {
        navigate('/members');
      }, 2000);
    } catch (err) {
      setSubmissionError(err.message || 'Failed to add member. Please try again.');
    }
  };

  return (
    <motion.div 
      className="add-member-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Add Team Member</h1>
      
      {submissionSuccess && (
        <motion.div 
          className="success-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Member added successfully! Redirecting to members page...
        </motion.div>
      )}
      
      {(submissionError || error) && (
        <div className="error-message">
          {submissionError || error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="member-form">
        <div className="form-group">
          <label htmlFor="name">Full Name*</label>
          <input 
            type="text" 
            id="name" 
            {...register('name', { required: 'Name is required' })}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <span className="error-text">{errors.name.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role*</label>
          <input 
            type="text" 
            id="role" 
            {...register('role', { required: 'Role is required' })}
            className={`form-control ${errors.role ? 'is-invalid' : ''}`}
          />
          {errors.role && <span className="error-text">{errors.role.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input 
            type="email" 
            id="email" 
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <span className="error-text">{errors.email.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea 
            id="bio" 
            {...register('bio')}
            className="form-control"
            rows="4"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="skills">Skills (comma separated)</label>
          <input 
            type="text" 
            id="skills" 
            {...register('skills')}
            className="form-control"
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Profile Image</label>
          <input 
            type="file" 
            id="image" 
            accept="image/*"
            {...register('image')}
            onChange={handleImageChange}
            className="form-control"
          />
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/members')} 
            className="btn secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Member'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddMember;