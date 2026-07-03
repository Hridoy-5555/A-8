import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content flex flex-col md:flex-row justify-between">
      <div>
        <span className="footer-title">Contact</span> 
        <p>Email: support@skillsphere.com</p>
        <p>Phone: +1 (555) 0199</p>
      </div> 
      <div>
        <span className="footer-title">Legal</span> 
        <Link to="#" className="link link-hover">Terms & Conditions</Link>
        <Link to="#" className="link link-hover">Privacy Policy</Link>
      </div> 
      <div>
        <span className="footer-title">Social Links</span> 
        <div className="grid grid-flow-col gap-4">
          <Link to="#" className="link link-hover">Twitter</Link>
          <Link to="#" className="link link-hover">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}