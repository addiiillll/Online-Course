import Razorpay from 'razorpay';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { amount, currency = 'INR', receipt } = req.body;

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100,  // Amount in paise
            currency,
            receipt,
        };

        try {
            const order = await razorpay.orders.create(options);
            res.status(200).json({ success: true, order });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error creating Razorpay order', error });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
