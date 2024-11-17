// In /pages/api/courses/[slug]/fetch.js
import connectToDatabase from '@/lib/mongodb'; // Your MongoDB connection helper
import Course from '@/models/Courses';

export default async function handler(req, res) {
    const { slug } = req.query;

    await connectToDatabase();

    try {
        const course = await Course.findOne({ slug });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
