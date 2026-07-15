import Resume_Features from "../../../components/analyze-resume/Resume_Features";
import StreamingMessage from "../../../components/StreamingMessage";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Custom_Date from "../../../functions/Custom_Date";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import useScroll from "../../../hooks/useScroll.hook";
import API_Routes from "../../../constants/API_Route";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAuth } from "../../Auth_Context";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";
import { toast } from "sonner";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function Analyze_Resume_Page() {
    useScroll();

    const [resumeData, setResumeData] = useState<string | null>(null);
    const [section, setSection] = useState<null | "missing-skills" | "ats-match" | "improve-my-resume">(null);
    const [aiResponse, setAIResponse] = useState<string>("Generating response ...");
    const [jobDescription, setJobDescription] = useState<string>("");
    const [hideForm, setHideForm] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const { email } = useAuth();

    const fileUrl = file ? URL.createObjectURL(file) : null;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
        } else {
            toast.info("Only pdf file accepted");
            e.target.value = "";
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!jobDescription) return toast.info("Please enter the job description");
        if (!file) return toast.info("Please choose the resume");
        setLoading(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            let extractedText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(" ");
                extractedText += `\n--- Page ${i} ---\n${pageText}`;
            }
            setResumeData(extractedText);
        } catch (error) {
            toast.error("Error while reading PDF");
        } finally {
            setLoading(false);
        }
    };

    const analyzeResume_AI = async (section: "missing-skills" | "ats-match" | "improve-my-resume") => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setAIResponse("AI is thinking...")
        setHideForm(true);
        try {
            toast.info("Please wait for the response to get generated");
            setSection(section);
            const res = await axios.post(API_Routes.analyzeResume, { jobDescription, resumeData, time: Custom_Date(), email, section });

            if (res.data.success) {
                setAIResponse(res.data.text as string);
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message)
                setAIResponse(error.response?.data.message || "Error")
            }
            else {
                toast.error("Some error occured. Please try later.")
            }
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center py-24 text-gray-100">
            <div className="flex justify-center items-center flex-col">
                <div className="flex justify-center items-center gap-10">
                    {
                        fileUrl &&
                        <div className="h-[600px] w-[400px] bg-transparent overflow-hidden rounded-2xl border">
                            <iframe src={fileUrl} width="100%" height="100%" style={{ border: "none" }} />
                        </div>
                    }
                    {
                        hideForm ||
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-[450px] relative z-10 bg-blue-950/35 backdrop-blur-xl rounded-xl shadow-2xl p-5 md:p-6">
                            <motion.div initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-center mb-8">
                                <h2 className="text-3xl font-extrabold bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                    Analyze Resume
                                </h2>
                                <p className="text-gray-300 mt-2">
                                    Upload your resume and paste the job description. Let AI optimize it for you.
                                </p>
                            </motion.div>

                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <div>
                                    <label className="block text-gray-200 font-medium mb-2">
                                        Job Description <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        rows={5}
                                        className="w-full p-3 bg-white/5 backdrop-blur border border-white/20 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Paste the job description here..."
                                    />
                                </div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="border-2 border-dashed border-cyan-400 rounded-xl text-center bg-white/5 backdrop-blur-xl hover:bg-white/10 transition cursor-pointer group">
                                    <label className="flex flex-col items-center space-y-3 py-5">
                                        <motion.div initial={{ rotate: -8 }} animate={{ rotate: 0 }} transition={{ type: "spring", stiffness: 200 }}>
                                            <FaCloudUploadAlt className="text-5xl text-cyan-300 group-hover:text-cyan-200 transition" />
                                        </motion.div>
                                        <p className="text-gray-200 font-medium">
                                            {file ? file.name : "Click to upload your resume (PDF only)"}
                                        </p>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.07 }}
                                    whileTap={{ scale: 0.93 }}
                                    className="w-full py-3 mt-4 font-semibold rounded-xl bg-linear-to-r from-teal-400 via-blue-500 to-indigo-600 shadow-lg shadow-blue-600/40 text-white tracking-wide transition-all"
                                >
                                    {loading ? "Processing..." : "Continue"}
                                </motion.button>
                            </motion.form>
                        </motion.div>
                    }
                    {
                        section &&
                        <div className="h-[600px] w-[900px] rounded-2xl bg-[#050036] p-8 flex flex-col gap-5">
                            {section === "missing-skills" && <p className="font-bold text-3xl text-center mb-4">🤔 <span className='bg-linear-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent'>Missing Skills</span> 🤔</p>}
                            {section === "improve-my-resume" && <p className="font-bold text-3xl text-center mb-4">🔧 <span className='bg-linear-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>Improve my Resume</span> 🔧</p>}
                            {section === "ats-match" && <p className="font-bold text-3xl text-center mb-4">✅ <span className='bg-linear-to-r from-emerald-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent'>ATS match</span> ✅</p>}
                            <div className="h-full overflow-y-scroll text-base">
                                <StreamingMessage message={aiResponse} />
                            </div>
                        </div>
                    }
                </div>

                {resumeData && jobDescription ? (
                    <div>
                        <Resume_Features callAi={(a: "missing-skills" | "ats-match" | "improve-my-resume") => {
                            analyzeResume_AI(a);
                        }} />
                    </div>
                ) : null}
            </div>
        </section>
    );
}
