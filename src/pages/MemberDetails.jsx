import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMemberById, loading, error } = useContext(AppContext);
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await getMemberById(id);
        setMember(data);
      } catch (err) {
        console.error('Error in component:', err);
      }
    };

    fetchMember();
  }, [id, getMemberById]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading member details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button 
          className="btn primary"
          onClick={() => navigate('/members')}
        >
          Back to Members
        </button>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="not-found-container">
        <h2>Member not found</h2>
        <p>The member you're looking for doesn't exist or has been removed.</p>
        <button 
          className="btn primary"
          onClick={() => navigate('/members')}
        >
          Back to Members
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div 
      className="member-details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button 
        className="back-button"
        onClick={() => navigate('/members')}
      >
        ← Back to Members
      </button>

      <div className="member-profile">
        <div className="profile-header">
          <div className="profile-image-container">
            {member.imageUrl ? (
              <img 
                src={`http://localhost:5000${member.imageUrl}`} 
                alt={member.name} 
                className="profile-image"
              />
            ) : (
              <div className="profile-image-placeholder">
                {member.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="profile-info">
            <h1 className="member-name">{member.name}</h1>
            <h2 className="member-role">{member.role}</h2>
            <p className="member-email">{member.email}</p>
            <p className="member-join-date">Joined: {formatDate(member.joinDate)}</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3>About</h3>
            <p className="member-bio">{member.bio || 'No bio provided'}</p>
          </div>

          {member.skills && member.skills.length > 0 && (
            <div className="profile-section">
              <h3>Skills</h3>
              <div className="skills-list">
                {member.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MemberDetails;