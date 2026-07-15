import { useResume_Template_1 } from "./UI_Template_1_Stage_Component";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

export default function Stage_2_Template_1_Skills_Details() {
    const { resumeData, setResumeData, setStage } = useResume_Template_1();

    const handleChange = (index: number, field: string, value: string) => {
        setResumeData((prevData) => ({
            ...prevData,
            skillDetails: prevData.skillDetails.map((skill, i) =>
                i === index ? { ...skill, [field]: value } : skill
            ),
        }));
    };

    const addSkill = () => {
        const last = resumeData.skillDetails.at(-1);
        if (last && (!last.title || !last.details)) {
            toast.error("Please complete the current skill before adding another!");
            return;
        }

        setResumeData((prevData) => ({
            ...prevData,
            skillDetails: [...prevData.skillDetails, { title: "", details: "" }],
        }));
    };

    const deleteSkill = (index: number) => {
        if (resumeData.skillDetails.length === 1) {
            toast.error("At least one skill entry is required!");
            return;
        }

        setResumeData((prevData) => ({
            ...prevData,
            skillDetails: prevData.skillDetails.filter((_, i) => i !== index),
        }));
    };

    const handleNext = () => {
        toast.success("Skills saved successfully!");
        setStage(3);
    };

    return (
        <div className="mt-5 md:p-6 rounded-xl text-white">
            <p className="font-semibold text-2xl text-teal-400 mb-6">2. Skills</p>

            {resumeData.skillDetails.map((skill, index) => (
                <div key={index} className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 bg-[#0f172a] p-2 md:p-4 pt-4 md:pt-7 rounded-lg border border-slate-700 shadow-md shadow-slate-800">
                    {index > 0 && (
                        <button
                            onClick={() => deleteSkill(index)}
                            className="absolute top-0 right-0 text-red-500 hover:text-red-400 rounded-lg transition bg-black/30 px-2 py-1 flex justify-center items-center gap-2"
                            title="Remove this skill"
                        >
                            Remove <FaTrash />
                        </button>
                    )}

                    <div>
                        <p className="font-semibold text-gray-200 mb-1">Skill Title</p>
                        <input
                            type="text"
                            value={skill.title}
                            onChange={(e) => handleChange(index, "title", e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-[#1e293b] border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g. Frontend Development"
                        />
                    </div>

                    <div>
                        <p className="font-semibold text-gray-200 mb-1">Details / Tools</p>
                        <input
                            type="text"
                            value={skill.details}
                            onChange={(e) => handleChange(index, "details", e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-[#1e293b] border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g. HTML, CSS, JavaScript, React, Next.js"
                        />
                    </div>
                </div>
            ))}

            <div className="flex justify-between mt-6">
                <button onClick={addSkill} className="px-4 py-2 bg-linear-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-teal-500/40 hover:scale-105 transition-all"
                >+ Add More
                </button>
                <div className="flex gap-1 md:gap-3">
                    <button onClick={() => setStage(1)} className="px-6 py-2 bg-linear-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:shadow-blue-500/40 hover:scale-105 transition-all">
                        Back
                    </button>
                    <button onClick={handleNext} className="px-7 py-2 bg-linear-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:shadow-blue-500/40 hover:scale-105 transition-all">
                        Next
                    </button>
                </div>
            </div>
        </div >
    );
}