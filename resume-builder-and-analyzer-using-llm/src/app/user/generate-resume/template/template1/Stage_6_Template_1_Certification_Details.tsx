import { useResume_Template_1 } from "./UI_Template_1_Stage_Component";
import { type ChangeEvent } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

interface Certification {
    title: string;
    timeline: string;
}

export default function Stage_6_Template_1_Certification_Details() {
    const { resumeData, setResumeData, setStage } = useResume_Template_1();

    const handleChange = (index: number, field: keyof Certification, value: string) => {
        setResumeData((prevData) => ({
            ...prevData,
            certificationDetails: prevData.certificationDetails.map((cert, i) =>
                i === index ? { ...cert, [field]: value } : cert
            ),
        }));
    };

    const addCertification = () => {
        const lastCert = resumeData.certificationDetails.at(-1);
        if (lastCert && (!lastCert.title || !lastCert.timeline)) {
            toast.error("Please complete the current certification before adding another!");
            return;
        }

        setResumeData((prevData) => ({
            ...prevData,
            certificationDetails: [
                ...prevData.certificationDetails,
                { title: "", timeline: "" },
            ],
        }));
    };

    const deleteCertification = (index: number) => {
        setResumeData((prevData) => ({
            ...prevData,
            certificationDetails: prevData.certificationDetails.filter((_, i) => i !== index),
        }));
    };

    const handleNext = () => {
        toast.success("Certification details saved successfully!");
        setStage(7);
    };

    return (
        <div className="mt-5 md:p-6 rounded-xl text-white">
            <p className="font-semibold text-2xl text-teal-400 mb-6">
                6. Certification Details
            </p>

            <div className="w-full space-y-8">
                {resumeData.certificationDetails.map((cert, index) => (
                    <div key={index} className="p-2 md:p-4 rounded-lg shadow-md space-y-4 border border-gray-700 bg-[#0f151e]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Certification Title"
                                value={cert.title}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleChange(index, "title", e.target.value)
                                }
                                className="bg-[#0f172a] text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Timeline (e.g., Dec 2024 - May 2025)"
                                value={cert.timeline}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleChange(index, "timeline", e.target.value)
                                }
                                className="bg-[#0f172a] text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {index > 0 && (
                            <div className="flex justify-end">
                                <button
                                    onClick={() => deleteCertification(index)}
                                    className="text-red-500 hover:text-red-400 rounded-lg transition bg-black/30 px-2 py-1 flex justify-center items-center gap-2"
                                    title="Remove this certification"
                                >
                                    Remove <FaTrash />
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                <div className="flex justify-between mt-6">
                    <button onClick={addCertification}
                        className="px-4 py-2 bg-linear-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-teal-500/40 hover:scale-105 transition-all">
                        + Add More
                    </button>

                    <div className="flex gap-1 md:gap-3">
                        <button
                            onClick={() => setStage(5)}
                            className="bg-linear-to-r from-blue-500 via-teal-500 to-blue-600 hover:from-teal-600 hover:via-blue-500 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                        >
                            Back
                        </button>
                        <button onClick={handleNext}
                            className="bg-linear-to-r from-blue-500 via-teal-500 to-blue-600 hover:from-teal-600 hover:via-blue-500 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}