// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { jwtVerify } from 'jose';
// import Container from '@/components/container';

// export default function Checkout({ user, cart }) {
//     const router = useRouter();
//     const [formData, setFormData] = useState({
//         name: user?.name || '',
//         email: user?.email || '',
//         address: user?.address || '',
//     });



//     const cartItems = Object.values(cart);
//     const cartTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Here you would typically send the order to your backend
//         console.log('Order submitted:', { ...formData, items: cartItems, total: cartTotal });

//         // Clear the cart
//         localStorage.removeItem('cart');

//         // Redirect to order confirmation page
//         router.push('/order-confirmation');
//     };


//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.async = true;
//         document.body.appendChild(script);
//     }, []);
    

//     return (
//         <>
//             <Container>
//                 <div className="container mx-auto p-4">
//                     <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Order Summary</CardTitle>
//                                 <CardDescription>Review your items before placing the order.</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 {cartItems.map((item) => (
//                                     <div key={item.id} className="flex justify-between items-center mb-2">
//                                         <span>{item.title}</span>
//                                         <span>₹{(item.price * item.qty).toFixed(2)}</span>
//                                     </div>
//                                 ))}
//                                 <div className="font-bold mt-4">
//                                     Total: ₹{cartTotal.toFixed(2)}
//                                 </div>
//                             </CardContent>
//                         </Card>

//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Your Details</CardTitle>
//                                 <CardDescription>Please confirm your shipping information.</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="grid w-full items-center gap-4">
//                                         <div className="flex flex-col space-y-1.5">
//                                             <Label htmlFor="name">Name</Label>
//                                             <Input
//                                                 id="name"
//                                                 name="name"
//                                                 value={formData.name}
//                                                 onChange={handleInputChange}
//                                                 required
//                                             />
//                                         </div>
//                                         <div className="flex flex-col space-y-1.5">
//                                             <Label htmlFor="email">Email</Label>
//                                             <Input
//                                                 id="email"
//                                                 name="email"
//                                                 type="email"
//                                                 value={formData.email}
//                                                 onChange={handleInputChange}
//                                                 required
//                                             />
//                                         </div>
//                                         <div className="flex flex-col space-y-1.5">
//                                             <Label htmlFor="address">Address</Label>
//                                             <Input
//                                                 id="address"
//                                                 name="address"
//                                                 value={formData.address}
//                                                 onChange={handleInputChange}
//                                                 required
//                                             />
//                                         </div>
//                                     </div>
//                                     <CardFooter className="flex justify-between mt-4">
//                                         <Button variant="outline" onClick={() => router.push('/')}>Cancel</Button>
//                                         <Button type="submit">Place Order</Button>
//                                     </CardFooter>
//                                 </form>
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>
//             </Container>
//         </>
//     );
// }

// export async function getServerSideProps(context) {
//     const { req } = context;
//     const token = req.cookies.token;

//     if (!token) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             },
//         };
//     }

//     try {
//         const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
//         const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

//         return {
//             props: {
//                 user: payload,
//                 cart: {},
//             },
//         };
//     } catch (error) {
//         console.error('Failed to verify JWT:', error);
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             },
//         };
//     }
// }


import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Container from '@/components/container';
import { jwtVerify } from 'jose';

export default function Checkout({ user, cart }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: user?.address || '',
    });

    const cartItems = Object.values(cart);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a Razorpay order
            const orderResponse = await fetch('/api/payment/razorpay/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: cartTotal, // amount in INR
                    currency: 'INR',
                    receipt: `receipt_${Date.now()}`,
                }),
            });

            const { order } = await orderResponse.json();

            if (order) {
                // Proceed with Razorpay payment
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay key
                    amount: order.amount,
                    currency: order.currency,
                    name: 'Course Checkout',
                    description: 'Complete your purchase',
                    order_id: order.id, // Order ID from Razorpay
                    handler: async function (response) {
                        // Send payment details to the server for verification
                        const verifyResponse = await fetch('/api/payment/razorpay/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                courseId: cartItems[0].id, // Assuming a single course purchase
                                userId: user.id, // Logged-in user ID
                            }),
                        });

                        const { success } = await verifyResponse.json();
                        if (success) {
                            alert('Payment successful! Course added to your account.');
                            router.push('/order-confirmation');
                        } else {
                            alert('Payment verification failed.');
                        }
                    },
                    prefill: {
                        name: formData.name,
                        email: formData.email,
                        contact: '9999999999', // Can be dynamic
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('There was an issue processing the payment.');
        }
    };

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <Container>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                            <CardDescription>Review your items before placing the order.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center mb-2">
                                    <span>{item.title}</span>
                                    <span>₹{(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="font-bold mt-4">Total: ₹{cartTotal.toFixed(2)}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Your Details</CardTitle>
                            <CardDescription>Please confirm your shipping information.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <CardFooter className="flex justify-between mt-4">
                                    <Button variant="outline" onClick={() => router.push('/')}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Place Order</Button>
                                </CardFooter>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Container>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const token = req.cookies.token;

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

        return {
            props: {
                user: payload,
                cart: {}, // Provide actual cart data
            },
        };
    } catch (error) {
        console.error('Failed to verify JWT:', error);
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
}
