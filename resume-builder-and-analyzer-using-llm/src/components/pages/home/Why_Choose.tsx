import { FaArrowRight, FaFileAlt, FaMagic } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Why_Choose() {
    const data = [
        {
            title: "AI-Powered Suggestions",
            desc: "Generate optimized resume content based on your skills and experience.",
            icon: <FaMagic size={30} className="text-blue-400 mb-4 mx-auto" />,
        },
        {
            title: "Tailored for Each Job",
            desc: "Easily adapt your resume for specific roles and industries.",
            icon: <FaFileAlt size={30} className="text-blue-400 mb-4 mx-auto" />,
        },
        {
            title: "Modern Templates",
            desc: "Choose from elegant and professional resume designs.",
            icon: <FaArrowRight size={30} className="text-blue-400 mb-4 mx-auto" />,
        }
    ]

    return (
        <div className='pt-16 pb-24'>
            <section id="features" className="pb-20 text-center">
                <h3 className="text-[27px] md:text-3xl font-bold mb-10 text-white">
                    Why Choose <span className="text-blue-400">Career Lens?</span>
                </h3>
                <div className="grid md:grid-cols-3 gap-10 md:gap-8 px-6 ">
                    {data.map((f, i) => (
                        <motion.div key={i}
                            className="p-6 bg-linear-to-br from-gray-800/70 to-gray-900/50 backdrop-blur-lg rounded-2xl border border-blue-900 shadow-lg hover:shadow-blue-800/30 transition">
                            {f.icon}
                            <h4 className="text-xl font-semibold mb-2 text-blue-400">{f.title}</h4>
                            <p className="text-gray-300">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
