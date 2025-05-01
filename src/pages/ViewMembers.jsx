import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import MemberCard from '../components/MemberCard';

const ViewMembers = () => {
  const { members, loading, error, fetchMembers } = useContext(AppContext);

  useEffect(() => {
    fetchMembers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading team members...</p>
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
          onClick={fetchMembers}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="view-members-container">
      <div className="page-header">
        <h1>Team Members</h1>
        <Link to="/add-member" className="btn primary">
          Add New Member
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="empty-state">
          <h2>No team members yet</h2>
          <p>Add your first team member to get started</p>
          <Link to="/add-member" className="btn primary">
            Add Member
          </Link>
        </div>
      ) : (
        <motion.div 
          className="members-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {members.map(member => (
            <MemberCard key={member._id} member={member} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ViewMembers;