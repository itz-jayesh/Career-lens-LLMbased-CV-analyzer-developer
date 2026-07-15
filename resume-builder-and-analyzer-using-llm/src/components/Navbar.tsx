import { FaChevronDown, FaChevronUp, FaFileAlt, FaSignOutAlt, } from "react-icons/fa";
import clearStorage from "../hooks/clearStorage.hook";
import { useState, useEffect, useRef } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { useAuth } from "../app/Auth_Context";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [color, setColor] = useState<string>("");
  const { name, email, token } = useAuth();
  const [open, setOpen] = useState(false);

  const generateRandomColor = () => {
    const colors = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    if (token) setColor(generateRandomColor());
  }, [token]);

  const handleLogout = () => {
    clearStorage.clear();
    window.location.pathname = "/";
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="flex justify-between items-center h-[82px] text-gray-100 w-screen fixed top-0 left-0 backdrop-blur-lg z-50 px-3 md:px-20 lg:px-40">
      <h1 className="text-2xl font-bold tracking-wide">
        <a href="/">
          <span className="text-blue-500">Career</span> Lens
        </a>
      </h1>

      <div className="flex items-center relative" ref={dropdownRef}>
        {token ? (
          <>
            <div className={`${token ? "bg-blue-950/60" : "bg-transparent"} flex items-center gap-3 cursor-pointer select-none px-4 py-2 rounded-md`}
              onClick={() => setOpen(!open)}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: color }}>
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-semibold text-sm">{name}</span>
                <span className="text-xs text-gray-400">{email}</span>
              </div>

              <p className="hidden sm:block">
                {open ? <FaChevronUp className="text-gray-300 text-xs" /> : <FaChevronDown className="text-gray-300 text-xs" />}
              </p>
            </div>

            {open && (
              <div className="absolute top-16 right-0 w-fit min-w-56 bg-gray-800 text-white rounded-md shadow-lg text-sm overflow-hidden">
                <p onClick={() => setOpen(false)} className="md:hidden flex items-center gap-2 px-4 py-3 hover:bg-gray-700 transition">
                  <CgProfile className="text-amber-400 text-lg" />
                  <span className="hover:bg-gray-700 transition">{name}</span>
                </p>
                <p onClick={() => setOpen(false)} className="md:hidden flex items-center gap-2 px-4 py-3 hover:bg-gray-700 transition">
                  <HiOutlineMail className="text-emerald-700 text-lg" />
                  <span className="hover:bg-gray-700 transition">{email}</span>
                </p>
                <Link to="/user/generated-resumes"
                  onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-3 hover:bg-gray-700 transition">
                  <FaFileAlt className="text-blue-400 text-base" />
                  My Generated Resumes
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-700 transition">
                  <FaSignOutAlt className="text-red-400 text-base" />
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to="/user/generate-resume" className="bg-white rounded-lg font-semibold transition text-black px-7 py-2">
            Login
          </Link>
        )}
      </div>
    </div >
  );
}