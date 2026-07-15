import { useResume_Template_1 } from "./UI_Template_1_Stage_Component";
import { type ChangeEvent } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string[];
}

export default function Stage_4_Template_1_Experience_Details() {
    const { resumeData, setResumeData, setStage } = useResume_Template_1();

    const handleChange = (index: number, field: keyof Experience, value: string) => {
        let myValue: string[] | string = value;
        if (field === "description") myValue = value.split("\n");

        setResumeData((prevData) => ({
            ...prevData,
            experienceDetails: prevData.experienceDetails.map((exp, i) =>
                i === index ? { ...exp, [field]: myValue } : exp
            ),
        }));
    };

    const addExperience = () => {
        const last = resumeData.experienceDetails.at(-1);
        if (last && (!last.company || !last.role || !last.duration || last.description.length === 0)) {
            toast.error("Please complete the current experience before adding another!");
            return;
        }

        setResumeData((prevData) => ({
            ...prevData,
            experienceDetails: [
                ...prevData.experienceDetails,
                { company: "", role: "", duration: "", description: [] },
            ],
        }));
    };

    const deleteExperience = (index: number) => {
        if (resumeData.experienceDetails.length === 1) {
            toast.error("At least one experience entry is required!");
            return;
        }

        setResumeData((prevData) => ({
            ...prevData,
            experienceDetails: prevData.experienceDetails.filter((_, i) => i !== index),
        }));
    };

    const handleNext = () => {
        toast.success("Experience saved successfully!");
        setStage(5);
    };

    return (
        <div className="mt-5 md:p-6 rounded-xl text-white">
            <p className="font-semibold text-2xl text-teal-400 mb-6">
                4. Experience Details
            </p>

            <div className="w-full space-y-8">
                {resumeData.experienceDetails.map((exp, index) => (
                    <div
                        key={index}
                        className="relative bg-[#0f151e] p-2 md:p-6 rounded-xl shadow-md space-y-4 border border-gray-700"
                    >
                        {index > 0 && (
                            <button
                                onClick={() => deleteExperience(index)}
                                className="md:absolute top-0 right-0 text-red-500 hover:text-red-400 rounded-lg transition bg-black/30 px-2 py-1 flex justify-center items-center gap-2"
                                title="Remove this experience"
                            >
                                Remove <FaTrash />
                            </button>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Company Name"
                                value={exp.company}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleChange(index, "company", e.target.value)
                                }
                                className="bg-[#0f172a] text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Role / Position"
                                value={exp.role}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleChange(index, "role", e.target.value)
                                }
                                className="bg-[#0f172a] text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Duration (e.g. Jan 2022 - Dec 2023)"
                                value={exp.duration}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleChange(index, "duration", e.target.value)
                                }
                                className="bg-[#0f172a] text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-teal-500 outline-none"
                            />
                        </div>

                        <textarea
                            placeholder="Work Description..."
                            value={exp.description.join("\n")}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                handleChange(index, "description", e.target.value)
                            }
                            className="w-full bg-[#0f172a] text-white p-4 rounded-lg border border-gray-600 focus:ring-2 focus:ring-teal-500 outline-none h-32"
                        />
                    </div>
                ))}

                <div className="flex justify-between mt-6">
                    <button onClick={addExperience} className="px-4 py-2 bg-linear-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-teal-500/40 hover:scale-105 transition-all">
                        + Add More
                    </button>

                    <div className="flex gap-1 md:gap-3">
                        <button onClick={() => setStage(3)}
                            className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-blue-500/40 hover:scale-105 transition-all">
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
