"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, Input, Button, Link as HeroUILink } from "@heroui/react";
import { Mail, Lock, Eye, EyeOff, User, Image as ImageIcon, Github } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: image || undefined,
      });

      if (error) {
        toast.error(error.message || "Failed to create account");
      } else {
        toast.success("Account created! Please sign in.");
        router.push("/login");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md"
      >
        <Card className="p-4 shadow-2xl border-none bg-background/70 backdrop-blur-lg">
          <CardHeader className="flex flex-col gap-1 items-center pb-8">
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4 text-white font-bold text-3xl shadow-lg shadow-primary/20"
            >
              S
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight text-foreground">Create Account</motion.h1>
            <motion.p variants={itemVariants} className="text-sm text-default-500">Join SkillSphere to start learning</motion.p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <motion.div variants={itemVariants}>
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  variant="bordered"
                  startContent={<User className="text-default-400" size={18} />}
                  value={name}
                  onValueChange={setName}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  startContent={<Mail className="text-default-400" size={18} />}
                  value={email}
                  onValueChange={setEmail}
                  required
                  type="email"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input
                  label="Profile Image URL"
                  placeholder="https://example.com/photo.jpg"
                  variant="bordered"
                  startContent={<ImageIcon className="text-default-400" size={18} />}
                  value={image}
                  onValueChange={setImage}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input
                  label="Password"
                  placeholder="Create a password"
                  variant="bordered"
                  startContent={<Lock className="text-default-400" size={18} />}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? <EyeOff className="text-default-400" size={18} /> : <Eye className="text-default-400" size={18} />}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onValueChange={setPassword}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mt-2">
                <Button color="primary" type="submit" className="w-full font-bold h-12 shadow-lg shadow-primary/25" isLoading={loading}>
                  Get Started
                </Button>
              </motion.div>
              <motion.div variants={itemVariants} className="relative my-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-divider" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-default-400">Or join with</span></div>
              </motion.div>
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                <Button variant="flat" startContent={<Github size={18} />} className="font-medium">Github</Button>
                <Button variant="flat" startContent={<img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />} className="font-medium">Google</Button>
              </motion.div>
            </form>
            <motion.p variants={itemVariants} className="text-center text-sm text-default-500 mt-8">
              Already have an account? <HeroUILink as={Link} href="/login" size="sm" className="font-bold">Sign In</HeroUILink>
            </motion.p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}