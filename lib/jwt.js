// import jwt from 'jsonwebtoken';

// export const generateToken = (user) => {
//   try {  
//     if (!process.env.JWT_SECRET) {
//       throw new Error('JWT_SECRET is not defined in environment variables');
//     }

//     const payload = {
//       id: user._id,
//       name: user.name,
//       username: user.username,
//       email: user.email,
//       phone: user.phone,
//       profilePic: user.profilePic
//     };

//     // Check if all required fields are present
//     const requiredFields = ['_id', 'name', 'username', 'email', 'phone', 'profilePic'];
//     for (const field of requiredFields) {
//       if (!user[field]) {
//         throw new Error(`User object is missing required field: ${field}`);
//       }
//     }

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    
//     return token;
//   } catch (error) {
//     throw error; // Re-throw the error to be handled by the caller
//   }
// };

import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Ensure the user has all the required fields
    const requiredFields = ['_id', 'name', 'username', 'email', 'phone', 'profilePic'];
    for (const field of requiredFields) {
      if (!user[field]) {
        throw new Error(`User object is missing required field: ${field}`);
      }
    }

    // Create the payload for the JWT
    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
      enrolledCourses: user.enrolledCourses.map(course => ({
        courseId: course.courseId, 
        isPaid: course.isPaid,
        purchaseDate: course.purchaseDate
      }))
    };

    // Generate and sign the JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return token;
  } catch (error) {
    throw error; // Re-throw the error to be handled by the caller
  }
};
