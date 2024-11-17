// import bcrypt from 'bcryptjs';
// import { IncomingForm } from 'formidable';
// import cloudinary from '@/lib/cloudinary';
// import connectToDatabase from '@/lib/mongodb';
// import User from '@/models/Users';
// import { generateToken } from '@/lib/jwt';
// import fs from 'fs/promises';
// import slugify from "slugify";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   await connectToDatabase();

//   const form = new IncomingForm();

//   try {
//     const [fields, files] = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) reject(err);
//         else resolve([fields, files]);
//       });
//     });
//     console.log('Form Fields:', fields);
//     console.log('Files:', files);

//     // Extract all fields from the form
//     const { name, username, email, phone, address, dob, gender } = fields;

//     const password = fields.password?.[0];
//     const profilePic = files.profilePic?.[0];

//     // Check if all required fields are present
//     if (!name || !username || !email || !phone || !password || !address || !dob || !gender || !profilePic) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Upload image to Cloudinary
//     let profilePicUrl;
//     try {
//       const fileContent = await fs.readFile(profilePic.filepath);
//       const uploadResult = await new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream(
//           { folder: 'user_profiles' },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         ).end(fileContent);
//       });
//       profilePicUrl = uploadResult.secure_url;
//     } catch (error) {
//       console.error('Cloudinary upload error:', error);
//       return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const newUser = await User.create({
//       name: name[0],
//       username: username[0],
//       email: email[0],
//       phone: phone[0],
//       password: hashedPassword,
//       address: address[0],
//       dob: new Date(dob[0]),
//       gender: gender[0],
//       profilePic: profilePicUrl,
//     });

//     // Generate JWT token
//     const token = generateToken(newUser);

//     // Send response
//     res.status(201).json({ message: 'User registered successfully', token });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'Error registering user', error: error.message });
//   }
// }


import bcrypt from 'bcryptjs';
import { IncomingForm } from 'formidable';
import cloudinary from '@/lib/cloudinary';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/Users';
import { generateToken } from '@/lib/jwt';
import fs from 'fs/promises';
import slugify from 'slugify';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await connectToDatabase();

  // CREATE a new user (POST)
  if (req.method === 'POST') {
    const form = new IncomingForm();

    try {
      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

      console.log('Form Fields:', fields);
      console.log('Files:', files);

      // Extract all fields from the form
      const { name, username, email, phone, address, dob, gender } = fields;
      const password = fields.password?.[0];
      const profilePic = files.profilePic?.[0];

      // Validate required fields
      if (!name || !username || !email || !phone || !password || !address || !dob || !gender || !profilePic) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email: email[0] });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Generate slug from the username
      const slug = slugify(username[0], { lower: true, strict: true });

      // Upload profile picture to Cloudinary
      let profilePicUrl;
      try {
        const fileContent = await fs.readFile(profilePic.filepath);
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'user_profiles' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(fileContent);
        });
        profilePicUrl = uploadResult.secure_url;
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = new User({
        name: name[0],
        slug, // Include slug based on username
        username: username[0],
        email: email[0],
        phone: phone[0],
        password: hashedPassword,
        address: address[0],
        dob: new Date(dob[0]),
        gender: gender[0],
        profilePic: profilePicUrl,
      });

      await newUser.save();

      // Generate JWT token
      const token = generateToken(newUser);

      // Send response
      return res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  } 
  // Handle other methods
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
