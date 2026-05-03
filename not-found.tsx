"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] px-4 text-center">
      <motion.h1 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-9xl font-bold text-primary"
      >
        404
      </motion.h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-default-500 mt-2 mb-8 max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button as={Link} href="/" color="primary" variant="shadow" size="lg">
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
}