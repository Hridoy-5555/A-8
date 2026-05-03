"use client";

import { authClient } from "@/lib/auth-client";
import { Card, CardHeader, CardBody, Avatar, Button, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Edit, Mail, User as UserIcon } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Spinner size="lg" label="Loading your profile..." />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="p-8 shadow-2xl border-none bg-background/70 backdrop-blur-lg">
          <CardHeader className="flex flex-col items-center pb-0">
             <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
             >
                <Avatar
                  src={session.user.image || ""}
                  name={session.user.name}
                  className="w-32 h-32 text-large border-4 border-primary shadow-xl"
                />
             </motion.div>
          </CardHeader>
          <CardBody className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{session.user.name}</h1>
              <p className="text-default-500 flex items-center justify-center gap-2">
                <Mail size={16} /> {session.user.email}
              </p>
            </div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                as={Link} 
                href="/profile/update" 
                color="primary" 
                variant="shadow"
                size="lg"
                startContent={<Edit size={18} />}
                className="font-bold px-8"
              >
                Update Information
              </Button>
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}