import UI_Template_1_Stage_Component from "../../../generate-resume/template/template1/UI_Template_1_Stage_Component";
import UI_Template_2_Stage_Component from "../../../generate-resume/template/template2/UI_Template_2_Stage_Component";
import type Template_1_Type from "../../../../../types/Template_1_Type.type";
import type Template_2_Type from "../../../../../types/Template_2_Type.type";
import useScroll from "../../../../../hooks/useScroll.hook";
import API_Routes from "../../../../../constants/API_Route";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios, { AxiosError } from "axios";
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

export default function Edit_Resume_Page() {
    useScroll();
    const [data, setData] = useState<Page_Resume_Type | null>(null);
    const [loading, setLoading] = useState(true);
    const { resumeId } = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await axios.get(API_Routes.getResume(resumeId || ""));
            setData(res.data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    toast.error(error.response?.data.message)
                    navigate("/user/generated-resumes");
                }
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div className="h-screen flex justify-center items-center gap-5">
            <div className="h-9 w-9 border-4 border-slate-100 border-b-blue-500 animate-spin rounded-full"></div>
            <p className="text-white font-semibold text-2xl">Getting Resume data ...</p>
        </div>
    }

    if (data !== null)
        return (
            <div className='min-h-screen py-24 text-white'>
                <div>
                    {
                        data.template === "template1" ?
                            <UI_Template_1_Stage_Component operation='update' resumeId={resumeId || ""} data={{ ...data.data, title: data.title, email: data.email } as Template_1_Type} />
                            :
                            <UI_Template_2_Stage_Component operation='update' resumeId={resumeId || ""} data={{ ...data.data, title: data.title, email: data.email } as Template_2_Type} />
                    }
                </div>
            </div>
        )
}