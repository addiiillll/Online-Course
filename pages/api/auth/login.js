import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/Users';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await connectToDatabase();
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    // Find the user by username and email
    const user = await User.findOne({ username, email }).populate('enrolledCourses.courseId');

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT with user details, including enrolled courses
    const token = jwt.sign(
      { 
        id: user._id,
        name: user.name, 
        username: user.username, 
        slug: user.slug,
        email: user.email, 
        phone: user.phone, 
        address: user.address,
        dob: user.dob,
        gender: user.gender,
        profilePic: user.profilePic,
        enrolledCourses: user.enrolledCourses, // Include enrolled courses
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    );

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
