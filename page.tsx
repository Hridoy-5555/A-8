"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen, Users, Trophy } from "lucide-react";
import PopularCourses from "./PopularCourses";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-indigo-800 text-white py-24 md:py-32">
        {/* Animated background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full blur-[100px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/20 shadow-lg"
            >
              <Sparkles size={16} className="text-yellow-300" />
              <span>Next generation of learning</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
              Upgrade Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400">Skills</span> Today 🚀
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Access over 500+ world-class courses taught by industry veterans. Start your journey toward professional excellence today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  as={Link} 
                  href="/courses" 
                  size="lg" 
                  className="bg-white text-primary font-bold h-16 px-10 text-xl shadow-2xl hover:bg-gray-50"
                  endContent={<ArrowRight size={22} />}
                >
                  Explore Courses
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  as={Link} 
                  href="/register" 
                  size="lg" 
                  variant="bordered"
                  className="text-white border-white/40 hover:bg-white/10 font-bold h-16 px-10 text-xl backdrop-blur-sm"
                >
                  Create Account
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-background py-16 border-b border-divider">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-default-50 border border-divider shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">500+ Courses</h3>
              <p className="text-default-500">Expert-led content across all stacks</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-default-50 border border-divider shadow-sm">
              <div className="bg-success/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-success" />
              </div>
              <h3 className="text-2xl font-bold mb-2">10k+ Learners</h3>
              <p className="text-default-500">A global community of ambitious students</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-default-50 border border-divider shadow-sm">
              <div className="bg-warning/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-warning" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Certificates</h3>
              <p className="text-default-500">Industry-recognized verification</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <PopularCourses />
      
      {/* Final CTA Section */}
      <section className="py-24 bg-default-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-primary shadow-2xl text-white"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to unlock your potential?</h2>
            <p className="text-xl opacity-90 mb-10 font-light">
              Join 10,000+ developers learning and growing their careers on SkillSphere.
            </p>
            <Button as={Link} href="/register" size="lg" className="bg-white text-primary font-bold px-12 h-14 text-lg">
              Get Started for Free
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}