import { useResume_Template_2 } from "./UI_Template_2_Stage_Component";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

export default function Stage_2_Template_2_Skills_Details() {
    const { resumeData, setResumeData, setStage } = useResume_Template_2();

    const handleChange = (index: number, value: string) => {
        setResumeData((prevData) => ({
            ...prevData,
            skillsDetails: prevData.skillsDetails.map((skill, i) =>
                i === index ? value : skill
            ),
        }));
    };

    const addSkill = () => {
        const lastSkill = resumeData.skillsDetails.at(-1);
        if (lastSkill && !lastSkill.trim()) {
            toast.error("Please complete the current skill before adding another!");
            return;
        }

        setResumeData((prevData) => ({
            ...prevData,
            skillsDetails: [...prevData.skillsDetails, ""],
        }));
    };

    const deleteSkill = (index: number) => {
        if (resumeData.skillsDetails.length === 1) {
            toast.error("At least one skill entry is required!");
            return;
        }

        setResumeData((prevData) => ({
            ...prevData,
            skillsDetails: prevData.skillsDetails.filter((_, i) => i !== index),
        }));
    };

    const handleNext = () => {
        toast.success("Skills saved successfully!");
        setStage(3);
    };

    return (
        <div className="mt-5 md:p-6 rounded-xl text-white">
            <p className="font-semibold text-2xl text-teal-400 mb-6">2. Skills</p>

            {resumeData.skillsDetails.map((skill, index) => (
                <div key={index} className="relative gap-6 mb-6 bg-[#0f172a] p-2 md:p-4 pt-4 md:pt-7 rounded-lg border border-slate-700 shadow-md shadow-slate-800">
                    {index > 0 && (
                        <button
                            onClick={() => deleteSkill(index)}
                            className="absolute top-0 right-0 text-red-500 hover:text-red-400 rounded-lg transition bg-black/30 px-2 py-1 flex justify-center items-center gap-2"
                            title="Remove this skill">
                            Remove <FaTrash />
                        </button>
                    )}

                    <div>
                        <p className="font-semibold text-gray-200 mb-1">Skill</p>
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-[#1e293b] border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g. Frontend Development"
                        />
                    </div>
                </div>
            ))}

            <div className="flex justify-between mt-6">
                <button onClick={addSkill} className="px-4 py-2 bg-linear-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-teal-500/40 hover:scale-105 transition-all">
                    + Add More
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
        </div>
    );
}