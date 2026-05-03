"use client";
import { Link } from "@heroui/react";
import { Facebook, Twitter, Instagram, Github, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-default-50 border-t border-divider py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-xl font-bold text-primary mb-4">SkillSphere</h3>
          <p className="text-default-500 text-sm">Empowering learners worldwide with industry-leading courses and expert instructors.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact Info</h4>
          <div className="space-y-2 text-sm text-default-600">
            <p className="flex items-center gap-2"><Mail size={16}/> support@skillsphere.com</p>
            <p className="flex items-center gap-2"><Phone size={16}/> +1 (555) 000-1234</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4">Social Links</h4>
          <div className="flex gap-4">
            <Link href="#" color="foreground"><Facebook size={20}/></Link>
            <Link href="#" color="foreground"><Twitter size={20}/></Link>
            <Link href="#" color="foreground"><Instagram size={20}/></Link>
            <Link href="#" color="foreground"><Github size={20}/></Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-default-600">
            <li><Link href="#" size="sm" color="foreground">Terms & Conditions</Link></li>
            <li><Link href="#" size="sm" color="foreground">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-divider text-center text-default-400 text-sm">
        © {new Date().getFullYear()} SkillSphere. All rights reserved.
      </div>
    </footer>
  );
}