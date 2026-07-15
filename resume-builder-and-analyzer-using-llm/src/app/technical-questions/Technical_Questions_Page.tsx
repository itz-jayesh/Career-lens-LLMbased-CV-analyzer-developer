import { BiDownload, BiRightArrow } from 'react-icons/bi';
import API_Routes from '../../constants/API_Route';
import ReactMarkdown from 'react-markdown';
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { toast } from 'sonner';
import axios from 'axios';
import jsPDF from "jspdf";


export default function Technical_Questions_Page() {
    const [jobDescription, setJobDescription] = useState("");
    const [questions, setQuestions] = useState<{ title: string, answer: string }[]>([])

    const [loading, setLoading] = useState(false);

    const pdfRef = useRef<HTMLDivElement | null>(null);

    const downloadPDF = async () => {
        if (!pdfRef.current) return;

        const canvas = await html2canvas(pdfRef.current, {
            scale: 2, backgroundColor: "#111827"
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210;
        const pageHeight = 295;

        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        pdf.save(`Technical-Questions-${new Date().toDateString()}_${new Date().getMilliseconds()}.pdf`);
    };

    const handleSubmit = async () => {
        if (!jobDescription.trim()) {
            toast.info("Please enter a Job Description.");
            return;
        }
        setLoading(true);

        try {
            const res = await axios.post(API_Routes.technicalQuestions, {
                jobDescription: jobDescription.trim(),
                time: new Date().toTimeString()
            });

            if (res.data.success) {
                if (Array.isArray(res.data.data)) {
                    const fData = res.data.data.filter((item: any) => item.title && item.answer)
                    setQuestions(fData);
                }
                else {
                    toast.info("Invalid data received from server.")
                }
            }
            else {
                toast.error(res.data.message || "Failed to generate questions");
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
                        📋 Technical Questions Generator
                    </h1>
                    <p className="text-gray-400">
                        Paste the Job Description and generate a personalized technical questions.
                    </p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
                    <textarea
                        placeholder="Paste Job Description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="w-full h-40 bg-gray-950 border border-gray-700 rounded-lg p-4 text-gray-200 focus:outline-none focus:border-indigo-500"
                    />
                    <button onClick={handleSubmit} className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-lg font-semibold">
                        Generate Preparation Plan
                    </button>
                </div>

                {
                    loading && (
                        <div className="mt-10 text-center">
                            <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
                            <p className="text-gray-400 mt-3">
                                Generating your preparation roadmap...
                            </p>
                        </div>
                    )
                }

                {
                    questions.length > 0 && (
                        <div className="mt-10 border rounded-2xl p-6 pdf-container">
                            <div className="text-2xl font-semibold mb-4 flex items-center justify-between pdf-header">
                                <p>Your Technical Questions</p>
                                <p onClick={downloadPDF} className="text-sm cursor-pointer flex items-center gap-2 border py-2 px-4 rounded-lg pdf-download-btn"                                >
                                    <BiDownload size={20} />
                                    <span>Download PDF</span>
                                </p>
                            </div>
                            <div className="whitespace-pre-wrap leading-relaxed pdf-text" style={{ backgroundColor: "#111827" }} ref={pdfRef}>
                                {questions.map((question, index) => (
                                    <div key={index} className="mb-10 border rounded-xl transition delay-75 cursor-pointer p-2 pdf-question-card"                                    >
                                        <div className="text-lg font-semibold mb-2">
                                            <ReactMarkdown>
                                                {`${index + 1}. ${question.title}`}
                                            </ReactMarkdown>
                                        </div>
                                        <div className="flex gap-2 items-start justify-start pdf-answer">
                                            <div className="mt-0.5">
                                                <BiRightArrow size={20} />
                                            </div>
                                            <ReactMarkdown>
                                                {question.answer}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
} 