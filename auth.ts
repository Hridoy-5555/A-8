// src/lib/auth.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

// Target feature function explicitly required by your documentation link:
export const updateUserProfile = async (newName: string, newImage: string) => {
    return await authClient.user.update({
        name: newName,
        image: newImage,
    });
};