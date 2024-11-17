// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Cookies from 'js-cookie';
// import Head from 'next/head';
// import { signIn } from 'next-auth/react';
// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();




//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Start loading
//     const data = { username, email, password };

//     try {
//       let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await res.json();
//       setLoading(false); // Stop loading

//       if (res.status === 200 && result.success) {
//         console.log('User logged in successfully');
//         setEmail('');
//         setPassword('');
//         localStorage.setItem('token', result.token); // Store the token in localStorage
//         Cookies.set('token', result.token);
//         toast.success('Logged in successfully!', {
//           position: "top-center",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//         setTimeout(() => {
//           router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/courses`);
//         }, 1000);
//         window.location.reload;
//       } else {
//         console.log('Failed to log in');
//         toast.error(result.error || 'Failed to log in', {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//       }
//     } catch (error) {
//       console.log('Failed to log in');
//       setLoading(false); // Stop loading
//       toast.error('Failed to log in. Please try again later.', {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     }
//   };

//   const handleGoogleSignIn = () => {
//     signIn('google', { callbackUrl: '/' });
//   };


//   return (
//     <>
//       <Head>
//         <title>Login</title>
//         <meta property="og:title" content="PENS - Login" key="title" />
//         <meta name="description" content="Login to start your new career." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>


//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />


//       <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] p-6">
//         <div className="flex items-center justify-center py-12">
//           <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
//             <div className="space-y-6">
//               <div className="text-center">
//                 <h1 className="text-3xl font-bold">Login</h1>
//                 <p className="text-muted-foreground mt-3">
//                   Enter your email below to login to your account
//                 </p>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <Label className="text-lg" htmlFor="username">Username</Label>
//                   <Input
//                     id="username"
//                     type="text"
//                     value={username}
//                      className="text-base"
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="username@example.com"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label className="text-lg" htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={email}
//                      className="text-base"
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="m@example.com"
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <Label className="text-lg" htmlFor="password">Password</Label>
//                   <Link
//                     href="/forgot-password"
//                     className="absolute right-0 top-1 text-sm underline"
//                   >
//                     Forgot your password?
//                   </Link>
//                   <Input
//                     type="password"
//                     id="password"
//                     value={password}
//                      className="text-base"
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="....."
//                     required
//                   />
//                 </div>
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full text-lg flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <svg
//                       className="animate-spin h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v8z"
//                       />
//                     </svg>
//                   ) : (
//                     'Login'
//                   )}
//                 </Button>
//                 <Button onClick={handleGoogleSignIn} className="w-full">
//                   Sign in with Google
//                 </Button>
//               </div>
//               <div className="text-center text-sm">
//                 Don&apos;t have an account?{" "}
//                 <Link href={'/register'} className="underline">
//                   Register
//                 </Link>
//               </div>
//             </div>
//           </form>
//         </div>

//         <div className="hidden lg:flex items-center justify-center p-8 lg:p-16">
//           <video
//             src='Student Login.webm'
//             className="object-contain h-fit w-full max-w-sm lg:max-w-md rounded-md"
//             autoPlay
//             loop
//             muted
//             playsInline
//           />
//         </div>
//       </div>
//     </>
//   );
// }


import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Cookies from 'js-cookie'
import { signIn } from 'next-auth/react'
import { Loader2, Mail } from 'lucide-react'
import Container from '@/components/container'

export default function Login() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = { username, email, password }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      setLoading(false)

      if (res.ok && result.success) {
        localStorage.setItem('token', result.token)
        Cookies.set('token', result.token)
        toast.success('Logged in successfully!')
        setTimeout(() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/courses`), 1000)
      } else {
        toast.error(result.error || 'Failed to log in')
      }
    } catch (error) {
      setLoading(false)
      toast.error('Failed to log in. Please try again later.')
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <Container>
      <div className="min-h-screen">
        <Toaster richColors />
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold tracking-tight ">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <Button
                    onClick={handleGoogleSignIn}
                    variant="outline"
                    className="w-full"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
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
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Sign in with Google
                  </Button>
                </div>

                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="username" className="block text-sm font-medium ">
                      Username
                    </Label>
                    <div className="mt-1">
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:border-gray-700  dark:placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium ">
                      Email address
                    </Label>
                    <div className="mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:border-gray-700  dark:placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="password" className="block text-sm font-medium ">
                      Password
                    </Label>
                    <div className="mt-1">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:border-gray-700  dark:placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-900"
                      />
                      <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        Remember me
                      </Label>
                    </div>

                    <div className="text-sm">
                      <Link href="/forgot-password" className="font-medium text-primary hover:text-primary/80">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-primary dark:hover:bg-primary/80 dark:focus:ring-offset-gray-900"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        'Sign in'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}