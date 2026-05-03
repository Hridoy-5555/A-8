"use client";

import { motion } from "framer-motion";
import { Button, Card, CardBody, Image } from "@heroui/react";
import { Star, Clock, User, PlayCircle, Lock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import data from "@/data.json";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const course = data.find((c) => c.id === parseInt(params.id));

  if (!course) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Button 
          as={Link} 
          href="/courses" 
          variant="light" 
          startContent={<ChevronLeft size={18} />}
          className="hover:gap-2 transition-all"
        >
          Back to Courses
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <motion.div 
          className="lg:col-span-2"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="relative overflow-hidden rounded-3xl shadow-2xl mb-8">
            <Image
              src={course.image}
              alt={course.title}
              className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold mb-4">
            {course.title}
          </motion.h1>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 mb-8 text-default-500">
            <span className="flex items-center gap-2"><User size={20} className="text-primary" /> {course.instructor}</span>
            <span className="flex items-center gap-2"><Clock size={20} className="text-primary" /> {course.duration}</span>
            <span className="flex items-center gap-2">
              <Star size={20} className="text-yellow-500 fill-current" /> 
              <span className="font-bold text-foreground">{course.rating}</span> Rating
            </span>
          </motion.div>

          <motion.div variants={fadeInUp} className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">About this course</h2>
            <p className="text-lg text-default-600 leading-relaxed">
              {course.description}
            </p>
            <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="font-semibold">Level: <span className="text-primary">{course.level}</span></p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="lg:col-span-1"
        >
          <Card className="p-6 sticky top-24 border-none bg-background/60 backdrop-blur-xl shadow-2xl">
            <CardBody>
              <h3 className="text-xl font-bold mb-6">Course Curriculum</h3>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3">
                {[
                  { title: "1. Introduction", duration: "10:00", locked: false },
                  { title: "2. Setting up Workspace", duration: "15:45", locked: true },
                  { title: "3. Fundamental Concepts", duration: "45:20", locked: true },
                  { title: "4. Building Project", duration: "1:20:10", locked: true },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    whileHover={{ x: 5, backgroundColor: "rgba(0,0,0,0.02)" }}
                    className="p-4 rounded-xl border border-divider flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {item.locked ? <Lock size={18} className="text-default-400" /> : <PlayCircle size={18} className="text-primary" />}
                      <span className={`font-medium ${item.locked ? 'text-default-400' : 'text-foreground'}`}>
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs text-default-400">{item.duration}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="mt-8"
              >
                <Button color="primary" size="lg" fullWidth className="font-bold shadow-lg shadow-primary/30">
                  Enroll Now
                </Button>
              </motion.div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}