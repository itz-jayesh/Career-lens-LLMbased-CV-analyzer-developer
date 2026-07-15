import Resume_Creations_Steps from "../components/pages/home/Resume_Creations_Steps";
import HomePage_NewFeatures from "../components/pages/home/HomePage_NewFeatures";
import TypeWriterEffect from "../components/ui/TypeWriterEffect";
import Why_Choose from "../components/pages/home/Why_Choose";
import useScroll from "../hooks/useScroll.hook";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home_Page() {
    useScroll();

    return (
        <div className="text-gray-100 flex flex-col pt-32 md:pt-0 px-3 md:px-20 lg:px-40" style={{ fontFamily: "'PT Serif Caption', serif" }}>
            <div className="h-screen flex flex-col md:flex-row items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-center md:text-left space-y-6">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        Smart <span className="text-blue-400">CV Analyzer</span>
                        <br /> and Builder
                    </h2>

                    <p className="text-gray-300 text-lg md:text-xl max-w-md">Step into your career with resume that speaks before you do.</p>

                    <div className="mt-8 mb-12">
                        <TypeWriterEffect />
                    </div>

                    <div className="flex justify-center md:justify-start gap-4">
                        <Link to={"/get-started"}>
                            <button className="bg-linear-to-r from-teal-400 via-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-md font-bold shadow-lg shadow-blue-500/40 transition-all duration-300 flex gap-3 items-center cursor-pointer">
                                <span>Get Started</span> <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 md:mt-0 flex justify-center">
                    <div className="relative flex justify-center items-center w-full">
                        <img src="/home-page-section.jpg" alt="Home Page Section Resume Image"
                            className="h-[250px] w-64 md:w-[350px] md:h-[370px] rounded-xl shadow-2xl border border-gray-700" />
                    </div>
                </motion.div>
            </div>

            <HomePage_NewFeatures />

            <Resume_Creations_Steps />

            <Why_Choose />
        </div>
    );
}