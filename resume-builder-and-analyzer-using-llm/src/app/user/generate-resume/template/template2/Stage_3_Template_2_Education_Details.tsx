import { useResume_Template_2 } from "./UI_Template_2_Stage_Component";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";


export default function Stage_3_Template_2_Education_Details() {
    const { resumeData, setResumeData, setStage } = useResume_Template_2();

    const handleChange = (index: number, field: string, value: string) => {
        setResumeData((prevData) => ({
            ...prevData,
            educationDetails: prevData.educationDetails.map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
            ),
        }));
    };

    const addEducation = () => {
        setResumeData((prevData) => ({
            ...prevData,
            educationDetails: [
                ...prevData.educationDetails,
                { institute: "", marks: "", timeline: "", learning: "" },
            ],
        }));
    };

    const deleteEducation = (index: number) => {
        setResumeData((prevData) => ({
            ...prevData,
            educationDetails: prevData.educationDetails.filter((_, i) => i !== index),
        }));
    };

    const handleNext = () => {
        toast.success("Education saved successfully!");
        setStage(4);
    };

    return (
        <div className="mt-5 md:p-6 rounded-xl shadow-lg text-white">
            <p className="font-semibold text-2xl text-teal-400 mb-4">3. Education Details</p>

            {resumeData.educationDetails.map((edu, index) => (
                <div key={index} className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 bg-[#0f172a] p-2 md:p-4 md:pt-7 rounded-lg border border-slate-700"               >
                    {index > 0 && (
                        <button onClick={() => deleteEducation(index)}
                            className="absolute top-0 right-0 text-red-500 hover:text-red-400 rounded-lg transition bg-black/30 px-2 py-1 flex justify-center items-center gap-2"
                            title="Remove this education entry">
                            Remove <FaTrash />
                        </button>
                    )}

                    <div>
                        <p className="font-semibold text-gray-200 mb-1">Institute</p>
                        <input
                            type="text"
                            value={edu.institute}
                            onChange={(e) => handleChange(index, "institute", e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-[#1e293b] border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g. MIT University" />
                    </div>

                    <div>
                        <p className="font-semibold text-gray-200 mb-1">Marks</p>
                        <input
                            type="text"
                            value={edu.marks}
                            onChange={(e) => handleChange(index, "marks", e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-[#1e293b] border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g. 80%" />
                    </div>

                    <div>
                        <p className="font-semibold text-gray-200 mb-1">Timeline</p>
                        <input
                            type="text"
                            value={edu.timeline}
                            onChange={(e) => handleChange(index, "timeline", e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-[#1e293b] border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g. 2019 - 2023" />
                    </div>

                    <div>
                        <p className="font-semibold text-gray-200 mb-1">Learning</p>
                        <input
                            type="text"
                            value={edu.learning}
                            onChange={(e) => handleChange(index, "learning", e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-[#1e293b] border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g. Learned software engineering principles" />
                    </div>
                </div>
            ))}

            <div className="flex justify-between mt-6">
                <button onClick={addEducation} className="px-4 py-2 bg-linear-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-teal-500/40 hover:scale-105 transition-all">
                    + Add More
                </button>

                <div className="flex gap-3 items-center">
                    <button onClick={() => setStage(2)}
                        className="px-5 py-2 bg-linear-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:shadow-blue-500/40 hover:scale-105 transition-all">
                        Back
                    </button>
                    <button onClick={handleNext}
                        className="px-5 py-2 bg-linear-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:shadow-blue-500/40 hover:scale-105 transition-all">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}