import { useResume_Template_2 } from "./UI_Template_2_Stage_Component";
import { toast } from "sonner";


export default function Stage_1_Template_2_Personal_Details() {
    const { resumeData, setResumeData, setStage } = useResume_Template_2();

    const handleNext = () => {
        toast.success("Personal details saved successfully!");
        setStage(2);
    };

    return (
        <div className="mt-5 md:p-6 text-white rounded-2xl">
            <p className="font-semibold text-2xl text-teal-400">1. Personal Information</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 mt-6">
                <div>
                    <p className="font-semibold text-slate-200">Full Name</p>
                    <input
                        type="text"
                        value={resumeData.personalDetails.fullName}
                        onChange={(e) =>
                            setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, fullName: e.target.value }, })
                        }
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter full name"
                    />
                </div>

                <div>
                    <p className="font-semibold text-slate-200">Email</p>
                    <input
                        type="email"
                        value={resumeData.personalDetails.email}
                        onChange={(e) => setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, email: e.target.value } })}
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter email"
                    />
                </div>

                <div>
                    <p className="font-semibold text-slate-200">Phone</p>
                    <input
                        type="tel"
                        value={resumeData.personalDetails.phoneNumber}
                        onChange={(e) => setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, phoneNumber: e.target.value } })}
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter phone number"
                    />
                </div>

                <div>
                    <p className="font-semibold text-slate-200">Learning/Platform</p>
                    <input
                        type="text"
                        value={resumeData.personalDetails.learning}
                        onChange={(e) => setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, learning: e.target.value } })}
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter learning platform or URL"
                    />
                </div>

                <div>
                    <p className="font-semibold text-slate-200">Address</p>
                    <input
                        type="text"
                        value={resumeData.personalDetails.address}
                        onChange={(e) => setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, address: e.target.value } })}
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter address"
                    />
                </div>

                <div>
                    <p className="font-semibold text-slate-200">Current Address</p>
                    <input
                        type="text"
                        value={resumeData.personalDetails.currentAddress}
                        onChange={(e) => setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, currentAddress: e.target.value } })}
                        className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter current address"
                    />
                </div>
            </div>

            <div className="mt-6">
                <p className="font-semibold text-slate-200">Summary about you</p>
                <textarea
                    rows={5}
                    value={resumeData.personalDetails.summary}
                    onChange={(e) => setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, summary: e.target.value } })}
                    className="border border-slate-600 rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Write a short professional summary..."
                />
            </div>

            <div className="mt-6">
                <p className="font-semibold text-slate-200">Gender</p>
                <input
                    type="text"
                    value={resumeData.personalDetails.gender}
                    onChange={(e) => setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, gender: e.target.value } })}
                    className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter gender"
                />
            </div>

            <div className="mt-6">
                <p className="font-semibold text-slate-200">Birth Date</p>
                <input
                    type="date"
                    value={resumeData.personalDetails.birthDate}
                    onChange={(e) => setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, birthDate: e.target.value } })}
                    className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
            </div>

            <div className="mt-6">
                <p className="font-semibold text-slate-200">Languages Known</p>
                <input
                    type="text"
                    value={resumeData.personalDetails.languagesKnown.join(', ')}
                    onChange={(e) =>
                        setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, languagesKnown: e.target.value.split(', ') }, })
                    }
                    className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter languages known (comma separated)"
                />
            </div>

            <div className="mt-6">
                <p className="font-semibold text-slate-200">Marital Status</p>
                <input
                    type="text"
                    value={resumeData.personalDetails.maritalStatus}
                    onChange={(e) =>
                        setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, maritalStatus: e.target.value }, })
                    }
                    className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter marital status"
                />
            </div>

            <div className="mt-6">
                <p className="font-semibold text-slate-200">Emails (Multiple)</p>
                <input
                    type="text"
                    value={resumeData.personalDetails.emails.join(', ')}
                    onChange={(e) =>
                        setResumeData({ ...resumeData, personalDetails: { ...resumeData.personalDetails, emails: e.target.value.split(', ') }, })
                    }
                    className="rounded-md mt-1 py-2 px-3 w-full bg-[#1e293b] text-white border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter multiple emails (comma separated)"
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