import { FaCode, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HomePage_NewFeatures() {
    const features = [
        {
            title: "Technical Questions",
            description:
                "Practice curated technical interview questions across multiple domains and strengthen your problem-solving skills.",
            icon: <FaCode className="text-4xl text-blue-400" />,
            link: "/technical-questions"
        },
        {
            title: "Preparation Plan (Based on JD)",
            description:
                "Provide a Job Description and get a personalized preparation roadmap with skills, topics, and learning resources.",
            icon: <FaClipboardList className="text-4xl text-purple-400" />,
            link: "/preparation-plan"
        }
    ];

    return (
        <section className="pb-40">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">
                        🚀 New Features
                    </h2>
                    <p className="text-gray-400 mt-3">
                        Powerful tools to enhance your interview preparation.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 transition duration-300">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 mb-6">
                                {feature.description}
                            </p>
                            <Link to={feature.link} className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                                Explore Feature
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}