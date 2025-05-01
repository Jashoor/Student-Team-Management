import Member from '../models/Member.js';

// Get all members
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error: error.message });
  }
};

// Get a single member by ID
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching member', error: error.message });
  }
};

// Create a new member
export const createMember = async (req, res) => {
  try {
    const { name, role, email, bio, skills } = req.body;
    
    // Handle file upload
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    
    // Parse skills if they come as a string
    const parsedSkills = typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : skills;
    
    const newMember = new Member({
      name,
      role,
      email,
      bio,
      skills: parsedSkills,
      imageUrl
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: 'Error creating member', error: error.message });
  }
};