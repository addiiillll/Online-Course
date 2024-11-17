import crypto from 'crypto';
import User from '@/models/Users';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, userId } = req.body;

        const secret = process.env.RAZORPAY_KEY_SECRET;
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature === razorpay_signature) {
            try {
                // Find the user and update their enrolled courses
                const user = await User.findById(userId);
                user.enrolledCourses.push({
                    courseId,
                    isPaid: true,
                    purchaseDate: new Date(),
                });
                await user.save();

                res.status(200).json({ success: true, message: 'Payment verified, course added to user.' });
            } catch (error) {
                res.status(500).json({ success: false, message: 'Error saving purchased course.', error });
            }
        } else {
            res.status(400).json({ success: false, message: 'Invalid payment signature.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
