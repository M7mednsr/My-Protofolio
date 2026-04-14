import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-12 px-6 pb-8">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex justify-between items-center flex-wrap gap-6 border-b border-white/5 pb-8 mb-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[38px] rounded-[11px] bg-linear-to-br from-[#4f8ef7] to-[#a855f7] flex items-center justify-center text-[16px] font-extrabold text-white font-['Inter',sans-serif] shadow-[0_0_20px_rgba(79,142,247,0.35)]">M</div>
            <div>
              <div className="text-[1rem] font-bold font-['Inter',sans-serif] bg-linear-to-br from-[#4f8ef7] to-[#a855f7] text-transparent bg-clip-text">Mohamed Nasr</div>
              <div className="text-[0.75rem] text-[#6b6b80] font-['Inter',sans-serif]">Frontend Developer</div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex gap-2 flex-wrap">
            {links.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="bg-transparent border-none cursor-pointer text-[0.85rem] font-['Inter',sans-serif] text-[#6b6b80] py-1 px-3 rounded-full transition-all duration-200 hover:text-[#4f8ef7]"
              >
                {link}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="text-[0.82rem] text-[#6b6b80] font-['Inter',sans-serif]">
            © {year} Mohamed Nasr. Built with{' '}
            <span className="text-[#4f8ef7] font-semibold">React</span> &{' '}
            <span className="text-[#a855f7] font-semibold">passion</span>.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/M7mednsr"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-github"
              className="text-[#6b6b80] transition-colors duration-200 no-underline hover:text-[#f8f8ff]"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-nasr-7730a7296"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin"
              className="text-[#6b6b80] transition-colors duration-200 no-underline hover:text-[#0077b5]"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
