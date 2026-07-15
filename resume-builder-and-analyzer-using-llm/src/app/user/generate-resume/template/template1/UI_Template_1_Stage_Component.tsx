import Stage_7_Template_1_Extra_Curricular_Details from './Stage_7_Template_1_Extra_Curricular_Details';
import Stage_6_Template_1_Certification_Details from './Stage_6_Template_1_Certification_Details';
import Stage_4_Template_1_Experience_Details from './Stage_4_Template_1_Experience_Details';
import Stage_3_Template_1_Education_Details from './Stage_3_Template_1_Education_Details';
import Stage_1_Template_1_Personal_Details from './Stage_1_Template_1_Personal_Details';
import Stage_5_Template_1_Projects_Details from './Stage_5_Template_1_Projects_Details';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Stage_2_Template_1_Skills_Details from './Stage_2_Template_1_Skills_Details';
import type Template_1_Type from '../../../../../types/Template_1_Type.type';
import Status_Progress_Template_1 from './Status_Progress_Template_1';
import API_Routes from '../../../../../constants/API_Route';
import Template1 from '../../../../../templates/Template1';
import Chat_UI_Template_1 from './Chat_UI_Template_1';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { useAuth } from '../../../../Auth_Context';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { createPortal } from 'react-dom';
import { saveAs } from "file-saver";
import { toast } from 'sonner';


type Resume_Context_Type = {
    resumeData: Template_1_Type;
    setResumeData: React.Dispatch<React.SetStateAction<Template_1_Type>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
};

const Resume_Context = createContext<Resume_Context_Type | null>(null);

export default function UI_Template_1_Stage_Component({ data, operation, resumeId }: {
    data?: Template_1_Type,
    resumeId: string,
    operation: "create" | "update"
}) {
    const modalRoot = document.getElementById("modal-root") as HTMLElement;
    const [preview, setPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(1);
    const navigate = useNavigate();
    const { email } = useAuth();

    const [resumeData, setResumeData] = useState<Template_1_Type>({
        email: email,
        title: "Full Stack Developer",

        personalDetails: {
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "9876543210",
            linkedin: "https://linkedin.com/in/johndoe",
            github: "https://github.com/johndoe",
            address: "Pune, Maharashtra",
            summary:
                "Full Stack Developer skilled in building scalable, responsive, and user-centric web applications. Proficient in React, Node.js, MongoDB, and modern frameworks. Passionate about solving real-world problems with clean code, optimized performance, and seamless UI/UX across devices.",
        },

        educationDetails: [
            {
                title: "Bachelor of Computer Applications",
                institution: "Savitribai Phule Pune University",
                year: "2023",
            },
            {
                title: "Master of Computer Applications",
                institution: "Savitribai Phule Pune University",
                year: "2028",
            },
        ],

        skillDetails: [
            {
                title: "Frontend",
                details: "HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS",
            },
            {
                title: "Backend",
                details: "Node.js, Express.js, MongoDB, Firebase, REST APIs",
            },
            {
                title: "Tools",
                details: "Git, GitHub, Postman, Docker, Vercel, Netlify",
            },
        ],

        projectDetails: [
            {
                title: "Full Stack Task Manager",
                link: "https://github.com/johndoe/task-manager",
                description: [
                    "Developed a complete MERN-based task management system with authentication, CRUD features, and filtering.",
                    "Built secure Node.js APIs with JWT authentication and integrated MongoDB for persistent data storage.",
                    "Created a responsive dashboard UI using React, Tailwind, and reusable component architecture.",
                    "Implemented role-based access control and optimized API performance.",
                ],
            },
            {
                title: "Portfolio Website",
                link: "https://portfolio-john.vercel.app",
                description: [
                    "Created a modern, responsive portfolio website to showcase projects, certifications, and achievements.",
                    "Developed using React and Tailwind CSS with subtle animations and component-based structure.",
                ],
            },
        ],

        certificationDetails: [
            {
                timeline: "2024",
                title: "AWS Cloud Practitioner - Build Instances using AWS",
            },
            {
                timeline: "2023",
                title: "Google Developer Student Club - Web Development Bootcamp",
            },
        ],

        extraCurricularDetails: [
            "NSS Volunteer",
            "Class Representative (CR)",
            "Hackathon Finalist - CodeFiesta 2024",
        ],

        experienceDetails: [
            {
                company: "TechNova Solutions",
                role: "Full Stack Developer Intern",
                duration: "Jan 2024 - May 2024",
                description: [
                    "Developed reusable UI components using React, TypeScript, and Tailwind CSS.",
                    "Built backend APIs using Node.js and Express, integrating them with frontend components.",
                    "Worked with MongoDB to design schemas, perform queries, and manage application data.",
                    "Contributed to debugging, unit testing, and improving overall application performance.",
                ],
            },
        ],
    });

    useEffect(() => {
        if (data) setResumeData(data);
    }, [])

    const Stages_Components: { [key: number]: ReactNode } = {
        1: <Stage_1_Template_1_Personal_Details />,
        2: <Stage_2_Template_1_Skills_Details />,
        3: <Stage_3_Template_1_Education_Details />,
        4: <Stage_4_Template_1_Experience_Details />,
        5: <Stage_5_Template_1_Projects_Details />,
        6: <Stage_6_Template_1_Certification_Details />,
        7: <Stage_7_Template_1_Extra_Curricular_Details />,
    };

    async function handleGenerate(data: Template_1_Type) {
        try {
            setLoading(true);
            const res = await axios.post(API_Routes.addGeneratedResume, {
                ...resumeData, template: "template1"
            });

            if (res.data.success) {
                setTimeout(async () => {
                    const blob = await pdf(<Template1 data={data} />).toBlob();
                    saveAs(blob, `${resumeData.personalDetails.name.replaceAll(" ", "_")}_${resumeData.title.replaceAll(" ", "_")}.pdf`);
                    toast.success(res.data.message);
                    navigate("/user/generated-resumes");
                }, 200);
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error: any) {
            if (error instanceof AxiosError)
                toast.error(error?.response?.data.message);
            else
                toast.error(error.message);
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }

    async function handleUpdate(data: Template_1_Type) {
        try {
            setLoading(true);
            const res = await axios.patch(API_Routes.updateResume(resumeId), {
                ...data, template: "template1"
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/user/generated-resumes");
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error: any) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message);
                navigate("/user/generated-resumes");
            }
            else
                toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="text-white h-fit px-3 md:px-10">
            {
                preview ?
                    createPortal(
                        <div className="fixed inset-0 top-0 px-4 md:px-40 left-0 h-screen w-screen bg-black bg-opacity-40 z-100">
                            <div className="py-4"
                                onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => setPreview(false)} className="px-6 py-2 font-semibold bg-red-500 text-white rounded hover:bg-red-600">
                                    Close
                                </button>
                            </div>
                            <PDFViewer width="100%" height="700">
                                <Template1 data={resumeData} />
                            </PDFViewer>
                        </div>, modalRoot
                    ) : null
            }

            <div className="flex justify-between md:items-center px-1 flex-col md:flex-row gap-2">
                <p className="font-semibold text-lg text-teal-400">{operation === "create" ? "Build" : "Update"} Resume in the following steps</p>
                <div className="flex gap-3 items-center">
                    <button onClick={() => setPreview(!preview)} type="button" className="hidden md:flex py-2.5 md:py-2 md:px-5 rounded-md bg-sky-500 font-semibold">
                        Preview
                    </button>
                    {(operation === "create" && stage === 7) || (operation === "update") ? <button onClick={() => {
                        if (operation === "create")
                            handleGenerate(resumeData)
                        else
                            handleUpdate(resumeData)
                    }} type='button' className="py-2.5 md:py-2 md:px-5 w-full rounded-md bg-green-500 font-semibold text-center">
                        {loading ?
                            (operation === "create" ? "Generating your resume..." : "Updating your resume...")
                            : (operation === "create" ? "Generate" : "Update")}
                    </button> : ""}
                </div>
            </div>

            <div className='bg-white/5 mt-4'>
                <input className='border border-slate-500 rounded-md w-full p-2'
                    placeholder='Enter the title for your resume' value={resumeData.title} onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })} />
            </div>

            <div className="py-4 rounded-xl border border-slate-700 mt-3 h-full">
                <Status_Progress_Template_1 stage={stage} />
                <Resume_Context.Provider value={{ resumeData, setResumeData, setStage }}>
                    <div className="px-2 flex items-start justify-between h-full">
                        <div className="w-[700px]">
                            {Stages_Components[stage]}
                        </div>
                        <Chat_UI_Template_1 data={resumeData} stage={stage} />
                    </div>
                </Resume_Context.Provider>
            </div>
        </div>
    );
}

export const useResume_Template_1 = () => {
    const context = useContext(Resume_Context);
    if (!context) throw new Error("useResume1 must be used within ResumeProvider");
    return context;
};