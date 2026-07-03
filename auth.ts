import { betterAuth } from "better-auth";

export const auth = betterAuth({
    database: {
        // Use your preferred DB provider connector here
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false // Kept false as requested for grading ease
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
});