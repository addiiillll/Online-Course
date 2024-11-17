import connectToDatabase from '@/lib/mongodb';
import User from '@/models/Users';

export default async function handler(req, res) {
    const { method } = req;
    const { slug } = req.query;

    if (method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    await connectToDatabase();

    try {
        // Find user by slug and populate enrolledCourses
        const user = await User.findOne({ slug })
            .select('-password') // Exclude sensitive fields
            .populate({
                path: 'enrolledCourses.courseId',
                select: '_id title price isPaid slug', // Select desired course fields
            });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Send back user data
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
