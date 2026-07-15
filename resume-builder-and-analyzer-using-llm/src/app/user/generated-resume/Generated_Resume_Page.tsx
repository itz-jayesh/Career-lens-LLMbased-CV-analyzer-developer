import { FaBars, FaBox, FaCloudDownloadAlt, FaUserCircle } from "react-icons/fa";
import type Template_2_Type from "../../../types/Template_2_Type.type";
import type Template_1_Type from "../../../types/Template_1_Type.type";
import useScroll from "../../../hooks/useScroll.hook";
import API_Routes from "../../../constants/API_Route";
import Template1 from "../../../templates/Template1";
import Template2 from "../../../templates/Template2";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { useAuth } from "../../Auth_Context";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { saveAs } from "file-saver";
import { toast } from "sonner";

type Page_Resume_Type = {
    email: string;
    title: string;
    template: string;
    data: any;
    resumeId: string;
    createdAt: string;
    updatedAt: string;
}

export default function Generated_Resumes_Page() {
    useScroll();
    const [selectedResume, setSelectedResume] = useState<Page_Resume_Type | null>(null);
    const [resumes, setResumes] = useState<Page_Resume_Type[]>([]);
    const [userView, setUserView] = useState<"col" | "row">("col");
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const { email } = useAuth();
    useEffect(() => {
        fetchResumes();
    }, []);

    const Template_1_Box = ({ data }: { data: Page_Resume_Type }) => {
        return <div key={data.resumeId} onClick={() => {
            setSelectedResume(data);
            setModalOpen(true);
        }} className={`p-6 ${userView === "col" ? "" : "pt-14"} rounded-xl shadow-lg cursor-pointer bg-gray-900/70 backdrop-blur-lg border border-gray-700 hover:border-blue-500 hover:shadow-blue-500/20 transition relative`}>
            <div className="absolute top-2 right-2 flex gap-5 flex-row">
                <p className="cursor-pointer p-2 bg-white/10 rounded-full">
                    <Link to={`/user/generated-resumes/edit/${data.resumeId}`}>
                        <BiEdit size={20} />
                    </Link>
                </p>
                <p onClick={(e) => {
                    e.stopPropagation();
                    downloadResume1(data);
                }} className="cursor-pointer p-2 bg-white/10 rounded-full">
                    <FaCloudDownloadAlt size={20} />
                </p>
            </div>
            <div className="flex justify-start items-center gap-4">
                <FaUserCircle size={45} className="text-blue-400" />
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold">
                        {data.title}
                    </h3>
                    <div className="flex-col flex gap-0.5">
                        <p className="text-gray-500 text-xs">
                            Created: {new Date(data.createdAt || Date.now()).toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-xs">
                            Last Updated: {new Date(data.updatedAt || Date.now()).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    }

    const Template_2_Box = ({ data }: { data: Page_Resume_Type }) => {
        return <div key={data.resumeId} onClick={() => {
            setSelectedResume(data);
            setModalOpen(true);
        }} className={`p-6 ${userView === "col" ? "" : "pt-14"} rounded-xl shadow-lg cursor-pointer bg-gray-900/70 backdrop-blur-lg border border-gray-700 hover:border-blue-500 hover:shadow-blue-500/20 transition relative`}>
            <div className="absolute top-2 right-2 flex gap-5 flex-row">
                <p className="cursor-pointer p-2 bg-white/10 rounded-full">
                    <Link to={`/user/generated-resumes/edit/${data.resumeId}`}>
                        <BiEdit size={20} />
                    </Link>
                </p>
                <p onClick={(e) => {
                    e.stopPropagation();
                    downloadResume2(data);
                }} className="cursor-pointer p-2 bg-white/10 rounded-full">
                    <FaCloudDownloadAlt size={20} />
                </p>
            </div>
            <div className="flex justify-start items-center gap-4">
                <FaUserCircle size={45} className="text-blue-400" />
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold">
                        {data.title}
                    </h3>
                    <div className="flex-col flex gap-0.5">
                        <p className="text-gray-500 text-xs">
                            Created: {new Date(data.createdAt || Date.now()).toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-xs">
                            Last Updated: {new Date(data.updatedAt || Date.now()).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    }

    const fetchResumes = async () => {
        try {
            const res = await axios.get(API_Routes.getGeneratedResume(email));
            if (res.data.success)
                setResumes(res.data.data as Page_Resume_Type[]);
            else toast.success(res.data.message);
        } catch (err) {
            if (err instanceof AxiosError)
                toast.success(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const downloadResume1 = async (data: Page_Resume_Type) => {
        setTimeout(async () => {
            toast.success("Resume downloaded");
            const blob = await pdf(<Template1 data={data.data as Template_1_Type} />).toBlob();
            saveAs(blob, `${data?.data?.personalDetails.name.replaceAll(" ", "_")}_${data.title.replaceAll(" ", "_")}.pdf`);
        }, 1000);
    }

    const downloadResume2 = async (data: Page_Resume_Type) => {
        setTimeout(async () => {
            toast.success("Resume downloaded");
            const blob = await pdf(<Template2 data={data.data as Template_2_Type} />).toBlob();
            saveAs(blob, `${data?.data?.personalDetails.fullName.replaceAll(" ", "_")}_${data.title.replaceAll(" ", "_")}.pdf`);
        }, 1000);
    }


    if (loading)
        return <div className="h-screen flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
                <div className="h-8 w-8 border-4 border-white animate-spin rounded-full border-b-blue-500"></div>
                <p className="text-xl text-white">Fetching your resumes</p>
            </div>
        </div>

    return (
        <div className="min-h-screen py-26 text-white px-3 md:px-20 lg:px-40">
            <div className="">
                <h2 className="text-2xl md:text-2xl font-bold mb-2 text-left">
                    My Generated <span className="text-blue-400">Resumes</span>
                </h2>
                {
                    resumes.length === 0 ?
                        <div className="py-10">
                            <p className="text-xl text-white">No resumes present</p>
                        </div> :
                        <div className="flex justify-between items-center h-10 gap-3">
                            <input type="text" className="border w-full border-gray-700 rounded-md p-2" placeholder="Search resume..."
                                value={search} onChange={(e) => setSearch(e.target.value)} />
                            <div onClick={() => setUserView((a) => a === "col" ? "row" : "col")}
                                className="h-10 w-10 cursor-pointer bg-white/10 hover:bg-white/20 hidden md:flex justify-center items-center rounded-md">
                                {userView === "col" ? <FaBars /> : <FaBox />}
                            </div>
                        </div>
                }
            </div>

            <div className={`${userView === "col" ? "flex flex-col gap-5" : "grid md:grid-cols-3 gap-8"} mt-5`}>
                {
                    resumes.filter((a) => {
                        const n = a.title.toLowerCase().includes(search.toLowerCase());
                        return n;
                    }).map((item, i) => {
                        if (item.template === "template1")
                            return (<Template_1_Box data={item} key={i} />)
                        if (item.template === "template2")
                            return (<Template_2_Box data={item} key={i} />)
                    })
                }
            </div>

            {modalOpen && selectedResume && (
                <div className="fixed inset-0 h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 flex-col px-3 md:px-40 pb-10">                    <div className="w-full py-4">
                    <button onClick={() => setModalOpen(false)}
                        className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white">
                        Close
                    </button>
                </div>
                    <div className="w-full h-full">
                        <PDFViewer className="hidden md:block w-full h-[85vh]">
                            {
                                selectedResume.template === "template1" ?
                                    <Template1 data={selectedResume.data} /> :
                                    <Template2 data={selectedResume.data} />
                            }
                        </PDFViewer>
                        <div className="md:hidden">
                            <p className="font-semibold text-lg">Preview is not available for MOBILE</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}