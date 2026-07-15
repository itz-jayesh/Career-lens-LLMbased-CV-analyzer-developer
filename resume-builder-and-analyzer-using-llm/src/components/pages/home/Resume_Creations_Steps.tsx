import { FaRegFile, FaEdit, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Resume_Creations_Steps() {
    return (
        <section className="flex flex-col lg:flex-row items-center justify-between px-6 gap-10 pb-28">
            <div className="flex justify-start lg:w-1/2">
                <img src="/get-started-page-section.png" alt="Resume template example"
                    className="w-[360px] h-[360px] rounded-lg shadow-lg"
                />
            </div>

            <div className="lg:w-1/2">
                <h2 className="text-2xl font-bold text-gray-100 mb-4">
                    Build Your CV in 3 Easy Steps
                </h2>

                <div className="space-y-10">
                    <div className="flex items-start space-x-4">
                        <div className="p-4 bg-blue-500 text-white rounded-full">
                            <FaRegFile size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-300">Step 1: Choose a template</h3>
                            <p className="text-gray-300">
                                Pick a sleek, recruiter-approved template that stands out.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start space-x-4">
                        <div className="p-4 bg-green-500 text-white rounded-full">
                            <FaEdit size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-300">Step 2: Customize your CV</h3>
                            <p className="text-gray-300">
                                Easily add your experience, skills, and education with just a few clicks.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start space-x-4">
                        <div className="p-4 bg-red-500 text-white rounded-full">
                            <FaDownload size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-300">Step 3: Download in seconds</h3>
                            <p className="text-gray-300">
                                Download your polished CV and start applying right away.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <Link to="/user/generate-resume" className="inline-block bg-blue-600 text-white py-2.5 px-5 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                        Create My Resume Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
