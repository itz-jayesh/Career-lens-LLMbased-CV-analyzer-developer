import useScroll from "../../hooks/useScroll.hook";
import { Link } from "react-router-dom";

export default function Get_Started_Page() {
  useScroll();

  return (
    <div className="px-3 md:px-20 min-h-screen flex flex-col gap-10 md:gap-0 md:flex-row items-center justify-center text-white relative overflow-hidden">

      <div className="flex-1 pt-24 md:pt-0 md:flex justify-center items-center">
        <img src="/get-started-page-section.png" alt="Career Growth"
          className="w-240px h-[330px] md:h-[400px] md:w-[400px] hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.2)] rounded-3xl" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-start text-left md:mt-0 pl-20">
        <h1 className="text-[27px] md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">
          Shape Your Career Smartly
        </h1>

        <p className="text-gray-300 mb-8 max-w-md leading-relaxed mt-4">
          Start your journey towards success! Choose whether to analyze your
          resume for personalized insights or generate a professional one with
          our smart tools.
        </p>

        <div className="flex flex-col items-center sm:flex-row gap-6 mt-4 w-full">
          <Link to="/features/analyze-resume">
            <button className="flex items-center gap-2 bg-linear-to-r from-blue-500 to-teal-400 px-4 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-teal-400/40 transition-all">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4149/4149727.png"
                alt="Analyze"
                className="w-8 h-8" />
              <span>Analyze Resume</span>
              {/* <FaChartLine className="text-lg" /> */}
            </button>
          </Link>

          <Link to="/user/generate-resume">
            <button className="flex items-center gap-2 bg-linear-to-r from-teal-400 to-blue-600 px-4 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-blue-400/40 transition-all">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                alt="Generate" className="w-8 h-8" />
              <span>Generate Resume</span>
              {/* <FaFileAlt className="text-lg" /> */}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}