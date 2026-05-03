"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, CardHeader, CardBody, Input, Button, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      setName(session.user.name);
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name,
        image,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="p-4 shadow-xl border-none bg-background/70 backdrop-blur-lg">
          <CardHeader className="flex flex-col items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Update Information</h1>
            <p className="text-sm text-default-500">Edit your public profile details</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <Input
                label="Full Name"
                placeholder="Enter your name"
                variant="bordered"
                startContent={<User size={18} className="text-default-400" />}
                value={name}
                onValueChange={setName}
                required
              />
              <Input
                label="Profile Image URL"
                placeholder="https://example.com/photo.jpg"
                variant="bordered"
                startContent={<ImageIcon size={18} className="text-default-400" />}
                value={image}
                onValueChange={setImage}
              />
              <Button color="primary" type="submit" isLoading={loading} className="font-bold mt-4" fullWidth variant="shadow">
                Update Information
              </Button>
            </form>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}