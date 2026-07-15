import { useResume_Template_1 } from "./UI_Template_1_Stage_Component";
import { toast } from "sonner";

export default function Stage_1_Template_1_Personal_Details() {
    const { resumeData, setResumeData, setStage } = useResume_Template_1();

    const handleNext = () => {
        toast.success("Personal details added successfully!");
        setStage(2);
    };

    return (
        <div className="mt-5 md:p-6 text-white rounded-2xl">
            <p className="font-semibold text-2xl text-teal-400">1. Personal Information</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 mt-6">
                <div>
                    <p className="font-semibold text-slate-200">Name</p>
                    <input
                        type="text"
                        value={resumeData.personalDetails.name}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData,
                                personalDetails: { ...resumeData.personalDetails, name: e.target.value },
                            })
                        }
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter name"
                    />
                </div>

                <div>
                    <p className="font-semibold text-slate-200">Email</p>
                    <input
                        type="email"
                        value={resumeData.personalDetails.email}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData, personalDetails: { ...resumeData.personalDetails, email: e.target.value },
                            })
                        }
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter email"
                    />
                </div>

                <div>
                    <p className="font-semibold text-slate-200">Phone</p>
                    <input
                        type="tel"
                        value={resumeData.personalDetails.phone}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData, personalDetails: { ...resumeData.personalDetails, phone: e.target.value },
                            })
                        }
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter phone number"
                    />
                </div>

                <div>
                    <p className="font-semibold text-slate-200">LinkedIn</p>
                    <input
                        type="text"
                        value={resumeData.personalDetails.linkedin}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData, personalDetails: { ...resumeData.personalDetails, linkedin: e.target.value },
                            })
                        }
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="LinkedIn profile link"
                    />
                </div>

                <div>
                    <p className="font-semibold text-slate-200">GitHub</p>
                    <input
                        type="text"
                        value={resumeData.personalDetails.github}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData, personalDetails: { ...resumeData.personalDetails, github: e.target.value },
                            })
                        }
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="GitHub profile link"
                    />
                </div>

                <div>
                    <p className="font-semibold text-slate-200">Address</p>
                    <input
                        type="text"
                        value={resumeData.personalDetails.address}
                        onChange={(e) =>
                            setResumeData({
                                ...resumeData, personalDetails: { ...resumeData.personalDetails, address: e.target.value },
                            })
                        }
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter your address"
                    />
                </div>
            </div>

            <div className="mt-6">
                <p className="font-semibold text-slate-200">Summary about you</p>
                <textarea
                    rows={5}
                    value={resumeData.personalDetails.summary}
                    onChange={(e) =>
                        setResumeData({
                            ...resumeData, personalDetails: { ...resumeData.personalDetails, summary: e.target.value },
                        })
                    }
                    className="border border-slate-600 rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Write a short professional summary..."
                />
            </div>

            <div className="mt-6 flex justify-end">
                <button onClick={handleNext} className="bg-linear-to-r from-blue-500 to-teal-500 px-8 py-2 rounded-md text-white font-semibold shadow-lg hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300">
                    Next
                </button>
            </div>
        </div>
    );
}