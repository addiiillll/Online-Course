import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import connectToDatabase from "@/lib/mongodb";
import GoogleUsers from "@/models/GoogleUsers"; // Import the GoogleUsers model

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;
        await connectToDatabase() 
        const user = await User.findOne({ email: username });
        
        if (!user) {
          return null;
        }
        
        const inputHash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");
        if (inputHash === user.hash) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session 
    },
    async signIn({ user, account }) {
      await connectToDatabase()
      
      if (account.provider === "google") {
        const googleUser = await GoogleUsers.findOne({ email: user.email });
        if (!googleUser) {
          const newGoogleUser = new GoogleUsers({
            email: user.email,
            profile: {
              firstName: user.name.split(' ')[0],
              lastName: user.name.split(' ')[1] || '',
              image: user.image
            }
          });
          await newGoogleUser.save();
        }
      } else {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            profile: {
              firstName: user.name
            }
          });
          await newUser.save();
        }
      }
      return true
    }
  },
  
  pages: {
    signIn: '/auth/signin',
  },
}

export default NextAuth(authOptions)