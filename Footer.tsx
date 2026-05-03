"use client";
import { Link } from "@heroui/react";
import { Facebook, Twitter, Instagram, Github, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <footer className="bg-default-50 border-t border-divider py-12">
      <motion.div 
        className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
          <motion.h3 
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-primary mb-4 inline-block cursor-pointer"
          >
            SkillSphere
          </motion.h3>
          <p className="text-default-500 text-sm">Empowering learners worldwide with industry-leading courses and expert instructors.</p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h4 className="font-bold mb-4">Contact Info</h4>
          <div className="space-y-2 text-sm text-default-600">
            <p className="flex items-center gap-2"><Mail size={16}/> support@skillsphere.com</p>
            <p className="flex items-center gap-2"><Phone size={16}/> +1 (555) 000-1234</p>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h4 className="font-bold mb-4">Social Links</h4>
          <div className="flex gap-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Github, href: "#" },
            ].map((social, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href={social.href} color="foreground">
                  <social.icon size={20}/>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-default-600">
            <motion.li whileHover={{ x: 5 }}><Link href="#" size="sm" color="foreground">Terms & Conditions</Link></motion.li>
            <motion.li whileHover={{ x: 5 }}><Link href="#" size="sm" color="foreground">Privacy Policy</Link></motion.li>
          </ul>
        </motion.div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-divider text-center text-default-400 text-sm"
      >
        © {new Date().getFullYear()} SkillSphere. All rights reserved.
      </motion.div>
    </footer>
  );
}