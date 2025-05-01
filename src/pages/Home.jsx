import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const { teamName } = useContext(AppContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="hero-section" variants={itemVariants}>
        <h1>{teamName}</h1>
        <p className="hero-subtitle">
          A platform to manage and showcase our talented team members
        </p>
      </motion.div>

      <motion.div className="features-section" variants={itemVariants}>
        <h2>Team Management Platform</h2>
        <p>
          Our team management platform helps you organize, showcase, and collaborate with 
          your team members effectively. Add new members, view their profiles, and keep 
          everyone connected.
        </p>
      </motion.div>

      <motion.div className="cta-buttons" variants={itemVariants}>
        <Link to="/add-member" className="cta-button primary">
          Add New Member
        </Link>
        <Link to="/members" className="cta-button secondary">
          View Team Members
        </Link>
      </motion.div>

      <motion.div className="info-cards" variants={containerVariants}>
        <motion.div className="info-card" variants={itemVariants}>
          <h3>Easy Management</h3>
          <p>
            Quickly add new team members and update their information with our
            intuitive interface.
          </p>
        </motion.div>
        <motion.div className="info-card" variants={itemVariants}>
          <h3>Team Showcase</h3>
          <p>
            Present your team in an elegant layout with profiles that highlight
            each member's skills and contributions.
          </p>
        </motion.div>
        <motion.div className="info-card" variants={itemVariants}>
          <h3>Organized Information</h3>
          <p>
            Keep all team member details in one place for easy access and
            reference.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;