import API_Routes from '../../constants/API_Route';
import ReactMarkdown from 'react-markdown';
import { useState } from "react";
import { toast } from 'sonner';
import axios from 'axios';


function Preparation_Plan_Page() {
    const [jd, setJd] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!jd.trim()) {
            toast.error("Please enter a Job Description.");
            return;
        }

        setLoading(true);
        setError("");
        setResponse("");

        try {
            const res = await axios.post(API_Routes.preparationPlan, {
                jobDescription: jd,
                time: new Date().toTimeString()
            });

            if (res.data.success) {
                toast.success(res.data.message || "Success");
                setResponse(res.data.data || "No plan generated");
            }
            else {
                toast.error(res.data.message);
            }

        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data.message || "Something went wrong. Please try again.");
            }
            else {
                toast.error("Something went wrong. Please try again.");
            }
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen text-white px-6 py-16 pt-32">
            <div className="max-w-4xl mx-auto">

                {/* Title */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-3">
                        📋 Preparation Plan Generator
                    </h1>
                    <p className="text-gray-400">
                        Paste the Job Description and generate a personalized preparation roadmap.
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">

                    <textarea
                        placeholder="Paste Job Description here..."
                        value={jd}
                        onChange={(e) => setJd(e.target.value)}
                        className="w-full h-40 bg-gray-950 border border-gray-700 rounded-lg p-4 text-gray-200 focus:outline-none focus:border-indigo-500"
                    />

                    <button
                        onClick={handleSubmit}
                        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-lg font-semibold"
                    >
                        Generate Preparation Plan
                    </button>

                </div>

                {/* Loading */}
                {loading && (
                    <div className="mt-10 text-center">
                        <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-gray-400 mt-3">
                            Generating your preparation roadmap...
                        </p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mt-8 bg-red-900/30 border border-red-700 text-red-400 p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Response */}
                {response && (
                    <div className="mt-10 bg-gray-900 border border-gray-800 rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
                            Your Preparation Plan
                        </h2>

                        <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                            <ReactMarkdown>{response}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Preparation_Plan_Page;
