export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-neutral text-neutral-content rounded-t-xl mt-auto">
      <nav className="grid grid-flow-col gap-4 text-sm md:text-base">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact info</a>
        <a className="link link-hover">Terms & Conditions</a>
        <a className="link link-hover">Privacy Policy</a>
      </nav> 
      <nav>
        <div className="grid grid-flow-col gap-4 text-xl">
          <a href="#" className="link link-hover">🕊️ Twitter</a>
          <a href="#" className="link link-hover">💼 LinkedIn</a>
          <a href="#" className="link link-hover">🎥 YouTube</a>
        </div>
      </nav> 
      <aside>
        <p className="text-xs text-neutral-400">Copyright © 2026 - All rights reserved by SkillSphere Inc.</p>
      </aside>
    </footer>
  );
}