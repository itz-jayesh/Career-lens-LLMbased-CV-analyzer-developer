import Stage_4_Template_2_Experience_Details from './Stage_4_Template_2_Experience_Details';
import Stage_3_Template_2_Education_Details from './Stage_3_Template_2_Education_Details';
import Stage_1_Template_2_Personal_Details from './Stage_1_Template_2_Personal_Details';
import Stage_5_Template_2_Projects_Details from './Stage_5_Template_2_Projects_Details';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Stage_2_Template_2_Skills_Details from './Stage_2_Template_2_Skills_Details';
import Stage_6_Template_2_Upload_Photo from './Stage_6_Template_2_Upload_Photo';
import type Template_2_Type from '../../../../../types/Template_2_Type.type';
import Status_Progress_Template_2 from './Status_Progress_Template_2';
import API_Routes from '../../../../../constants/API_Route';
import Template2 from '../../../../../templates/Template2';
import Chat_UI_Template_2 from './Chat_UI_Template_2';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { useAuth } from '../../../../Auth_Context';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { createPortal } from 'react-dom';
import { saveAs } from "file-saver";
import { toast } from 'sonner';


type Resume_Context_Type = {
    resumeData: Template_2_Type;
    setResumeData: React.Dispatch<React.SetStateAction<Template_2_Type>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
};

const Resume_Context = createContext<Resume_Context_Type | null>(null);

export default function UI_Template_2_Stage_Component({ data, operation, resumeId }: {
    data?: Template_2_Type,
    resumeId: string,
    operation: "create" | "update"
}) {
    const modalRoot = document.getElementById("modal-root") as HTMLElement;
    const [preview, setPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(1);
    const navigate = useNavigate();
    const { email } = useAuth();

    const [resumeData, setResumeData] = useState<Template_2_Type>({
        email: email,
        title: "Full Stack Developer",

        personalDetails: {
            imageUrl: "",
            fullName: "John Doe",
            learning: "Computer Science",
            phoneNumber: "9876543210",
            email: "johndoe@example.com",
            address: "123 Main St, Springfield, IL",
            summary:
                "Full Stack Developer with 5+ years of experience building scalable web applications, REST APIs, and cloud-integrated systems. Skilled in JavaScript, React, Node.js, and modern architectures. Strong focus on performance, clean code, and delivering high-quality features end-to-end. Adept at collaborating with cross-functional teams and continuously learning new technologies.",
            gender: "Male",
            birthDate: "1990-05-15",
            languagesKnown: ["English", "Spanish"],
            maritalStatus: "Single",
            currentAddress: "456 Elm St, Springfield, IL",
            emails: ["johndoe@example.com", "john.doe.work@example.com"],
        },

        skillsDetails: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Express",
            "MongoDB",
            "PostgreSQL",
            "Docker",
            "AWS",
            "Git"
        ],

        experienceDetails: [
            {
                company: "TechCorp Inc.",
                timeline: "2021-2024",
                position: "Full Stack Developer",
                keySkills: ["React", "Node.js", "MongoDB", "AWS"],
                description: [
                    "Developed and maintained end-to-end features for enterprise-grade web applications using React and Node.js.",
                    "Built scalable REST APIs, optimized database queries, and implemented authentication & authorization using JWT.",
                    "Improved API performance by 40% through query optimization, caching, and code refactoring.",
                    "Worked closely with designers and PMs to translate business requirements into technical tasks.",
                    "Led code reviews, mentored junior developers, and contributed to architectural decisions."
                ],
            },
            {
                company: "WebSolutions LLC",
                timeline: "2018-2021",
                position: "Frontend Developer",
                keySkills: ["React", "JavaScript", "HTML", "CSS"],
                description: [
                    "Built responsive UI components using React and modern JavaScript best practices.",
                    "Improved page load performance by reducing bundle size and optimizing component rendering.",
                    "Collaborated with backend team to integrate REST APIs smoothly.",
                    "Participated in sprint planning, UI/UX discussions, and client presentations."
                ],
            },
        ],

        educationDetails: [
            {
                institute: "University of Springfield",
                marks: "3.8 GPA",
                timeline: "2012-2016",
                learning:
                    "B.Sc. in Computer Science – Specialized in software engineering, database systems, and algorithms.",
            },
            {
                institute: "Springfield High School",
                marks: "90%",
                timeline: "2008-2012",
                learning:
                    "High School Diploma with strong academic performance in mathematics and computer science.",
            },
        ],

        projectDetails: [
            {
                title: "Task Manager App",
                keySkills: ["React", "Node.js", "MongoDB"],
                description: [
                    "A full-stack task management app allowing users to create, update, track and categorize tasks.",
                    "Implemented JWT-based authentication, real-time updates, and advanced filtering features.",
                    "Designed REST APIs using Node.js and improved database performance using aggregation queries.",
                    "Created responsive UI with React, custom hooks, and reusable components."
                ],
                link: "https://github.com/johndoe/task-manager",
            },
            {
                title: "Portfolio Website",
                keySkills: ["React", "Tailwind", "JavaScript"],
                description: [
                    "Built a modern, responsive portfolio to showcase personal projects and experience.",
                    "Used Tailwind CSS for fast development and component-driven UI.",
                    "Added contact form, animations, and integrated GitHub/LinkedIn sections.",
                    "Deployed on Vercel with optimized images and SEO metadata."
                ],
                link: "https://johndoe.dev",
            },
        ],
    });


    useEffect(() => {
        if (data) setResumeData(data);
    }, [])

    const Stages_Components: { [key: number]: ReactNode } = {
        1: <Stage_1_Template_2_Personal_Details />,
        2: <Stage_2_Template_2_Skills_Details />,
        3: <Stage_3_Template_2_Education_Details />,
        4: <Stage_4_Template_2_Experience_Details />,
        5: <Stage_5_Template_2_Projects_Details />,
        6: <Stage_6_Template_2_Upload_Photo />,
    };

    async function handleGenerate(data: Template_2_Type) {
        try {
            setLoading(true);
            const res = await axios.post(API_Routes.addGeneratedResume, {
                ...resumeData, template: "template2"
            });

            if (res.data.success) {
                setTimeout(async () => {
                    const blob = await pdf(<Template2 data={data} />).toBlob();
                    saveAs(blob, `${resumeData.personalDetails.fullName.replaceAll(" ", "_")}_${resumeData.title.replaceAll(" ", "_")}.pdf`);
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

    async function handleUpdate(data: Template_2_Type) {
        try {
            setLoading(true);
            const res = await axios.patch(API_Routes.updateResume(resumeId), {
                ...data, template: "template2"
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
                                <Template2 data={resumeData} />
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
                    {(operation === "create" && stage === 6) || (operation === "update") ? <button onClick={() => {
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

            <div className="py-6 rounded-xl border border-slate-700 mt-7 h-full">
                <Status_Progress_Template_2 stage={stage} />
                <Resume_Context.Provider value={{ resumeData, setResumeData, setStage }}>
                    <div className="px-2 flex items-start justify-between h-full">
                        <div className="w-[700px]">
                            {Stages_Components[stage]}
                        </div>
                        <Chat_UI_Template_2 data={resumeData} stage={stage} />
                    </div>
                </Resume_Context.Provider>
            </div>
        </div>
    );
}

export const useResume_Template_2 = () => {
    const context = useContext(Resume_Context);
    if (!context) throw new Error("useResume2 must be used within ResumeProvider");
    return context;
};