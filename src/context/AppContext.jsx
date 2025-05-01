import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [teamName, setTeamName] = useState('Student Innovation Team');

  const apiUrl = 'http://localhost:5000/api';

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/members`);
      setMembers(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to fetch members. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (memberData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Append member data to form
      Object.keys(memberData).forEach(key => {
        if (key === 'image') {
          if (memberData[key]) formData.append(key, memberData[key]);
        } else if (key === 'skills' && Array.isArray(memberData[key])) {
          formData.append(key, memberData[key].join(','));
        } else {
          formData.append(key, memberData[key]);
        }
      });
      
      const response = await axios.post(`${apiUrl}/members`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setMembers([response.data, ...members]);
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Error adding member:', error);
      setError('Failed to add member. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getMemberById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/members/${id}`);
      setError(null);
      return response.data;
    } catch (error) {
      console.error('Error fetching member:', error);
      setError('Failed to fetch member details. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    members,
    loading,
    error,
    teamName,
    fetchMembers,
    addMember,
    getMemberById,
    setTeamName
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};