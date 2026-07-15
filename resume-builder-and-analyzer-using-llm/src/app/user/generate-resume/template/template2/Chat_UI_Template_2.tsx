import type Template_2_Type from "../../../../../types/Template_2_Type.type";
import StreamingMessage from "../../../../../components/StreamingMessage";
import API_Routes from "../../../../../constants/API_Route";
import SessionId from "../../../../../functions/SessionId";
import { useAuth } from "../../../../Auth_Context";
import ReactMarkdown from 'react-markdown';
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { toast } from "sonner";


type Chat_Message_type = { text: string; from: "ai" | "user" };

export default function Chat_UI_Template_2({ data, stage }: { data: Template_2_Type, stage: number }) {
    const [messages, setMessages] = useState<Chat_Message_type[]>([
        { text: "Hey, I'm the AI! Ask me something.", from: "ai" }
    ]);

    const [sessionId] = useState(() => SessionId());
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const { email } = useAuth();

    const section: { [key: number]: string } = {
        1: "Personal Information Details Section",
        2: "Skills Details Section",
        3: "Education Information Details Section",
        4: "Experience Details Section",
        5: "Project Details Section",
        6: "Profile Photo Upload Section",
    }

    const cDiv = useRef<HTMLDivElement | null>(null);

    const sendMessage = async () => {
        if (!input.trim()) {
            toast.info("Please add the relevent prompt.");
            return;
        }

        const userMessage: Chat_Message_type = { text: input, from: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setTimeout(() => {
            cDiv && cDiv.current?.scrollTo({ top: cDiv.current.scrollHeight, behavior: "smooth" });
        }, 100);

        let userdata = "";
        if (stage === 1) userdata = JSON.stringify({ summary: data.personalDetails.summary })
        if (stage === 2) userdata = JSON.stringify({ summary: data.skillsDetails })
        if (stage === 3) userdata = JSON.stringify({ summary: data.educationDetails })
        if (stage === 4) userdata = JSON.stringify({ summary: data.experienceDetails })
        if (stage === 5) userdata = JSON.stringify({ summary: data.projectDetails })
        if (stage === 6) userdata = "Here is the url of the uploaded image to come on the resume"

        const dataToSend = {
            template: "template2",
            section: section[stage] || "no section specified",
            data: userdata,
            userPrompt: "I am applying for : " + data.title + " User Prompt : " + input,
            sessionId,
            email
        }

        try {
            setLoading(true);
            const res = await axios.post(API_Routes.generateResumeSuggestions, {
                ...dataToSend
            });

            if (res.data.success) {
                const aiMessage: Chat_Message_type = { text: `AI Response to: "${res.data.text}"`, from: "ai" };
                setMessages((prev) => [...prev, aiMessage]);
                setTimeout(() => {
                    cDiv && cDiv.current?.scrollTo({
                        top: cDiv.current.scrollHeight,
                        behavior: "smooth"
                    });
                }, 1500);
                setInput("");
            } else {
                toast.info(res.data.message);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.info(error?.response?.data?.message);
            } else {
                toast.info("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-12 w-[900px] bg-[#040027] backdrop-blur-xl text-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex flex-col h-[600px] border border-white/10">
            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-gray-900/40 backdrop-blur-md rounded-t-2xl">
                <p className="ml-3 text-lg font-semibold text-gray-200">AI Resume Assistant</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar" ref={cDiv}>
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] px-5 py-3 rounded-2xl text-base leading-relaxed shadow-md ${m.from === "user" ? "bg-linear-to-br from-blue-600 to-blue-700 text-white rounded-br-none" : "bg-white/90 text-gray-900 border border-gray-300 rounded-bl-none"}`}>
                            {(i === messages.length - 1 && m.from === "ai")
                                ?
                                <div className="" autoFocus={true}>
                                    <StreamingMessage message={m.text} />
                                </div>
                                :
                                (m.from === "ai" ? <ReactMarkdown>{m.text}</ReactMarkdown> : m.text)
                            }
                        </div>
                    </div>
                ))}

                {loading && (<div className="text-gray-400 italic animate-pulse">AI is typing...</div>)}
            </div>

            <div className="flex items-center gap-3 p-4 border-t border-white/10 bg-gray-900/40 backdrop-blur-xl rounded-b-2xl">
                <input value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />

                <button onClick={sendMessage} className="p-3 rounded-xl bg-linear-to-r from-blue-500 to-blue-700 text-white hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-blue-500/30">
                    <FiSend size={22} />
                </button>
            </div>
        </div>
    );
}