import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from '@/components/ui/textarea';
import Container from '@/components/container';
import { signIn } from 'next-auth/react';

const subjectsList = [
  'Hindi',
  'English',
  'Science & Technology',
  'History',
  'Geography',
  'Political Science',
  'Maths',
  'Algebra',
  'Geometry'
];

const StudentRegister = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(sub => sub !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('profilePic', profilePic);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert('Registration successful!');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      setLoading(false);
      alert('An error occurred during registration');
      console.error('Registration error:', error);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <>
    <Container>
      <div className="grid gap-4">
        <Card className="w-full ">
          <CardHeader>
            <CardTitle className="text-2xl">Student Registration</CardTitle>
            <CardDescription className="text-base">
              Fill in the details to register a new student
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid gap-6">
                {/* Personal Details */}
                <div className="grid gap-4 border-b pb-4">
                  <h2 className="text-xl">Personal Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Unique username"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Phone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                         placeholder="Your password to login"
                        required
                      />
                    </div>
                  </div>
                  <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                         placeholder="Your address"
                        required
                      />
                    </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="border rounded p-2 w-full"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Profile Picture */}
                <div className="grid gap-2">
                  <Label htmlFor="profilePic">Profile Pic</Label>
                  <Input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                {/* Submit */}
                <Button type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Register Student'}
                </Button>
              </div>
            </form>
            <div className="mt-4">
            <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </Container>
      </>
  );
};

export default StudentRegister;


// import React, { useEffect, useState } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/dist/client/router";
// import axios from "axios";
// import Link from "next/link";

// export default function signup() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const { data: session } = useSession();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (confirmPassword == password) {
//       await axios.post("../api/auth/signup", {
//         username,
//         password,
//         firstName,
//         lastName,
//       });

//       await signIn("credentials", {
//         redirect: false,
//         username: username,
//         password,
//       });
//     } else {
//       setError("password and confirm password does not match");
//     }
//   };

//   return (
//     <div className="min-h-screen ">
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <div>
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//               Create a account
//             </h2>
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <input type="hidden" name="remember" value="true" />
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div>
//                 <label htmlFor="firstName" className="sr-only">
//                   First Name
//                 </label>
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   // autoComplete="email"
//                   required
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="First Name"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   // autoComplete="email"
//                   required
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Last Name"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="email"
//                   name="Username"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Email address"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Password"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="confirmPassword" className="sr-only">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Confirm Password"
//                 />
//               </div>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign Up
//               </button>
//             </div>
//             <p className="text-red-500">{error}</p>
//             <button
//               onClick={() => signIn("google")}
//               className="bg-green-600 text-white rounded p-2 "
//             >
//               Sign in google
//             </button>
//             <button
//               onClick={() => signOut()}
//               className="bg-red-600 text-white rounded p-2 mx-10 "
//             >
//               Sign out
//             </button>{" "}
//           </form>
//           <Link href="/auth/LoginPage" className="underline ">
//             Already a user ? Login{" "}
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Container from '@/components/container';
// import { signIn } from 'next-auth/react';
// import { Loader2, Upload } from 'lucide-react';

// const StudentRegister = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     email: '',
//     password: '',
//     phone: '',
//     address: '',
//     dob: '',
//     gender: '',
//     profilePic: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'file' ? files[0] : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       formDataToSend.append(key, value);
//     });

//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (res.ok) {
//         alert('Registration successful!');
//         router.push('/login');
//       } else {
//         alert(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       setLoading(false);
//       alert('An error occurred during registration');
//       console.error('Registration error:', error);
//     }
//   };

//   const handleGoogleSignIn = () => {
//     signIn('google', { callbackUrl: '/' });
//   };

//   return (
//     <Container>
//       <Card className="w-full max-w-4xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold">Student Registration</CardTitle>
//           <CardDescription className="text-lg">
//             Join our learning community by filling out the form below
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <Tabs defaultValue="personal" className="w-full">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="personal">Personal Details</TabsTrigger>
//                 <TabsTrigger value="account">Account Details</TabsTrigger>
//               </TabsList>
//               <TabsContent value="personal">
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="name">Full Name</Label>
//                       <Input
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="John Doe"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="phone">Phone Number</Label>
//                       <Input
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         placeholder="+1 (555) 000-0000"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="address">Address</Label>
//                     <Textarea
//                       id="address"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       placeholder="Your full address"
//                       required
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="dob">Date of Birth</Label>
//                       <Input
//                         id="dob"
//                         name="dob"
//                         type="date"
//                         value={formData.dob}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="gender">Gender</Label>
//                       <Select name="gender" onValueChange={(value) => handleChange({ target: { name: 'gender', value } })}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select gender" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="male">Male</SelectItem>
//                           <SelectItem value="female">Female</SelectItem>
//                           <SelectItem value="other">Other</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//               <TabsContent value="account">
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="username">Username</Label>
//                       <Input
//                         id="username"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         placeholder="johndoe123"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="john@example.com"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="password">Password</Label>
//                     <Input
//                       id="password"
//                       name="password"
//                       type="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="••••••••"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="profilePic">Profile Picture</Label>
//                     <div className="flex items-center space-x-4">
//                       <Avatar className="w-16 h-16">
//                         <AvatarImage src={formData.profilePic ? URL.createObjectURL(formData.profilePic) : ''} />
//                         <AvatarFallback>
//                           {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
//                         </AvatarFallback>
//                       </Avatar>
//                       <Input
//                         id="profilePic"
//                         name="profilePic"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleChange}
//                         className="flex-1"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col space-y-4">
//           <Button 
//             onClick={handleSubmit} 
//             disabled={loading} 
//             className="w-full"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Registering...
//               </>
//             ) : (
//               'Register Student'
//             )}
//           </Button>
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <span className="w-full border-t" />
//             </div>
//             <div className="relative flex justify-center text-xs uppercase">
//               <span className="bg-background px-2 text-muted-foreground">
//                 Or continue with
//               </span>
//             </div>
//           </div>
          // <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
          //   <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          //     <path
          //       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          //       fill="#4285F4"
          //     />
          //     <path
          //       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          //       fill="#34A853"
          //     />
          //     <path
          //       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          //       fill="#FBBC05"
          //     />
          //     <path
          //       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          //       fill="#EA4335"
          //     />
          //   </svg>
          //   Sign up with Google
          // </Button>
//         </CardFooter>
//       </Card>
//     </Container>
//   );
// };

// export default StudentRegister;