import { useResume_Template_1 } from "./UI_Template_1_Stage_Component";
import { type ChangeEvent } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

export default function Stage_7_Template_1_Extra_Curricular_Details() {
    const { resumeData, setResumeData, setStage } = useResume_Template_1();

    const handleChange = (index: number, value: string) => {
        setResumeData((prevData) => ({
            ...prevData,
            extraCurricularDetails: prevData.extraCurricularDetails.map((activity, i) =>
                i === index ? value : activity
            ),
        }));
    };

    const addActivity = () => {
        const lastActivity = resumeData.extraCurricularDetails.at(-1);
        if (lastActivity?.trim() === "") {
            toast.error("Please complete the current activity before adding another!");
            return;
        }

        setResumeData((prevData) => ({
            ...prevData,
            extraCurricularDetails: [...prevData.extraCurricularDetails, ""],
        }));
    };

    const deleteActivity = (index: number) => {
        setResumeData((prevData) => ({
            ...prevData,
            extraCurricularDetails: prevData.extraCurricularDetails.filter((_, i) => i !== index),
        }));
        toast.info("Activity removed.");
    };

    return (
        <div className="mt-5 md:p-6 rounded-xl text-white">
            <p className="font-semibold text-2xl text-teal-400 mb-6">
                7. Extra-Curricular Activities
            </p>

            <div className="w-full space-y-6">
                {resumeData.extraCurricularDetails.map((activity, index) => (
                    <div key={index}
                        className="flex items-center gap-3 bg-[#0f151e] md:p-4 rounded-xl md:border border-gray-700 shadow-md">
                        <input
                            type="text"
                            placeholder="Activity Title (e.g., Volunteer at NGO, College Event Organizer)"
                            value={activity}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleChange(index, e.target.value)
                            }
                            className="flex-1 bg-[#0f172a] text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-teal-500 outline-none"
                        />

                        {index > 0 && (
                            <button
                                onClick={() => deleteActivity(index)}
                                className="text-red-400 hover:text-red-500 text-sm transition-all whitespace-nowrap border p-2 rounded-md">
                                <FaTrash size={25} />
                            </button>
                        )}
                    </div>
                ))}

                <div className="flex justify-between mt-6">
                    <button onClick={addActivity} className="px-4 py-2 bg-linear-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-teal-500/40 hover:scale-105 transition-all">
                        + Add More
                    </button>

                    <div className="flex gap-3">
                        <button onClick={() => setStage(6)} className="bg-linear-to-r from-blue-500 via-teal-500 to-blue-600 hover:from-teal-600 hover:via-blue-500 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
