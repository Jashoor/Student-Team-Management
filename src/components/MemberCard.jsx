import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MemberCard = ({ member }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      y: -5,
      boxShadow: '0 12px 25px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="member-card"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="member-card-header">
        {member.imageUrl ? (
          <img 
            src={`http://localhost:5000${member.imageUrl}`} 
            alt={member.name} 
            className="member-image"
          />
        ) : (
          <div className="member-image-placeholder">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="member-card-body">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role}</p>
        
        {member.skills && member.skills.length > 0 && (
          <div className="member-skills">
            {member.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="skill-tag small">
                {skill}
              </span>
            ))}
            {member.skills.length > 3 && (
              <span className="skill-more">+{member.skills.length - 3}</span>
            )}
          </div>
        )}
      </div>
      
      <div className="member-card-footer">
        <Link to={`/members/${member._id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default MemberCard;