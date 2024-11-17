import { verify } from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Course from '@/models/Courses';
import User from '@/models/Users';

export default async function handler(req, res) {
  // Connect to the database
  await connectToDatabase();

  // Get the JWT token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];

  // Get the course slug from the query
  const { slug } = req.query;

  try {
    // Verify the JWT token
    const decoded = verify(token, process.env.JWT_SECRET);

    // Find the user in the database
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Find the course using the slug from the request
    const course = await Course.findOne({ slug });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check if the user has access to the course
    const hasAccess = user.enrolledCourses.some(
      enrolledCourse => enrolledCourse.courseId.toString() === course._id.toString() && enrolledCourse.isPaid
    );

    return res.status(200).json({ success: true, hasAccess });
  } catch (error) {
    console.error('Error checking access:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}