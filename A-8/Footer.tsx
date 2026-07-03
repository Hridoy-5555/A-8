export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-neutral text-neutral-content rounded-t-xl mt-12">
      <nav className="grid grid-flow-col gap-4 text-base font-medium">
        <a className="link link-hover">Terms & Conditions</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Contact Support</a>
      </nav> 
      <nav>
        <div className="grid grid-flow-col gap-4 text-2xl">
          <a className="cursor-pointer hover:text-primary transition-colors">🌐</a>
          <a className="cursor-pointer hover:text-primary transition-colors">💼</a>
          <a className="cursor-pointer hover:text-primary transition-colors">🐙</a>
        </div>
      </nav> 
      <aside>
        <p className="text-sm opacity-70">Copyright © 2026 - All rights reserved by SkillSphere platform Inc.</p>
      </aside>
    </footer>
  );
}