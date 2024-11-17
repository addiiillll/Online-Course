// pages/api/auth/verify-token.js
import * as jose from 'jose';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ isValid: false });
  }

  try {
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
    res.status(200).json({ isValid: true, user: payload });
  } catch (error) {
    res.status(401).json({ isValid: false });
  }
}
