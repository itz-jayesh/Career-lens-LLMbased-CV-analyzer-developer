import { FaChartPie, FaMagic, FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Resume_Features({ callAi }: { callAi: (_: "missing-skills" | "ats-match" | "improve-my-resume") => void }) {
  return (
    <section id="features" className="py-16 text-center">
      <h3 className="text-[27px] md:text-3xl font-bold mb-10 text-white">
        Resume <span className="text-blue-400">Insights</span>
      </h3>

      <div className="flex justify-center items-center gap-10 md:gap-8 px-6 flex-wrap">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => callAi("missing-skills")}
          className="p-6 w-60 bg-linear-to-br from-gray-800/70 to-gray-900/50 backdrop-blur-lg rounded-2xl border border-blue-900 shadow-lg hover:shadow-blue-800/30 transition">
          <FaTools size={30} className="text-blue-400 mb-4 mx-auto" />
          <h4 className="text-lg font-semibold mt-1 text-blue-400">Missing Skills</h4>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => callAi("ats-match")}
          className="p-6 w-60 bg-linear-to-br from-gray-800/70 to-gray-900/50 backdrop-blur-lg rounded-2xl border border-blue-900 shadow-lg hover:shadow-blue-800/30 transition">
          <FaChartPie size={30} className="text-blue-400 mb-4 mx-auto" />
          <h4 className="text-lg font-semibold mt-1 text-blue-400">ATS Match %</h4>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => callAi("improve-my-resume")}
          className="p-6 w-60 bg-linear-to-br from-gray-800/70 to-gray-900/50 backdrop-blur-lg rounded-2xl border border-blue-900 shadow-lg hover:shadow-blue-800/30 transition">
          <FaMagic size={30} className="text-blue-400 mb-4 mx-auto" />
          <h4 className="text-lg font-semibold mt-1 text-blue-400">Improve My Resume</h4>
        </motion.div>
      </div>
      <div className="mt-16">
        <Link to={"/user/generate-resume"} className="bg-blue-500 hover:bg-blue-600 font-semibold px-5 py-3 rounded-md">
          Create resume with Career Lens 👉
        </Link>
      </div>
    </section>
  );
}
