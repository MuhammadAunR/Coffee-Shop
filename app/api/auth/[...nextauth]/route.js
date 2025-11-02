import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/app/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const client = await clientPromise;
                const db = client.db("CoffeeShop")
                const collection = db.collection("Users")
                const user = await collection.findOne({ email: credentials.email })

                if (!user) {
                    throw new Error("No user found with this email.");
                }
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
                if (!isPasswordValid) {
                    throw new Error("Incorrect password,");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                }
            }
        }),
    ],

    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt"
    },

    secret: process.env.NEXTAUTH_SECRET,

})

export { handler as GET, handler as POST }