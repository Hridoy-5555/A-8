"use client";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import data from "@/data.json";
import { Flame } from "lucide-react";

export default function PopularCourses() {
  // Filter or sort the top 3 rated courses from your data
  const popularCourses = [...data]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <div className="bg-orange-500/10 p-3 rounded-2xl">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame className="text-orange-500 w-8 h-8" />
          </motion.div>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight">Popular Courses</h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {popularCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </motion.div>
    </section>
  );
}