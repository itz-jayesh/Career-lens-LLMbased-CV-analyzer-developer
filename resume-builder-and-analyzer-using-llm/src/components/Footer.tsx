import { CgCopyright } from "react-icons/cg";

export default function Footer() {
  return (
    <footer className="w-full py-8 md:px-20 lg:px-40">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-sm text-white">

        <p className="text-gray-200 font-semibold flex gap-1 items-center">
          <CgCopyright size={22} />
          <span>{new Date().getFullYear()} Career Lens. All rights reserved.</span>
        </p>

        <div className="flex items-center gap-6 font-semibold">
          <a href="/about-career-lens" className="hover:text-gray-300">About</a>
          <a href="/user/generate-resume" className="hover:text-gray-300">Create Resume</a>
          <a href="/features/analyze-resume" className="hover:text-gray-300">Analyze Resume</a>
        </div>
      </div>
    </footer>
  );
}
