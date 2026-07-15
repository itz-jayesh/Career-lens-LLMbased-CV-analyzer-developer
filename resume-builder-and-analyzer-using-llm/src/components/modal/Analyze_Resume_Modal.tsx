import { useSearchParams } from 'react-router-dom';
import StreamingMessage from '../StreamingMessage';
import { CgClose } from 'react-icons/cg';

interface ModalProps {
    section: "missing-skills" | "ats-match" | "improve-my-resume";
    text: string;
    onClose: () => void;
}

export default function Analyze_Resume_Modal({ onClose, section, text }: ModalProps) {
    const [_, setParams] = useSearchParams();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
            <div className={`relative p-2 bg-linear-to-b ${section === "missing-skills" ? "from-purple-600 via-blue-500 to-cyan-500" : (section === "ats-match" ? "from-emerald-600 via-cyan-500 to-blue-500" : (section === "improve-my-resume" ? "from-red-600 via-orange-500 to-yellow-500" : ""))} rounded-lg w-[700px] min-h-fit max-h-full text-black overflow-hidden transform transition-all duration-500 ease-in-out`}>
                <button className="absolute top-4 right-4 text-black hover:bg-black/10 transition-all duration-300 p-2 rounded-full transform hover:rotate-180 cursor-pointer"
                    onClick={() => {
                        setParams({});
                        onClose();
                    }}>
                    <CgClose size={24} />
                </button>

                <div className="bg-white rounded-md p-8 flex flex-col gap-5">
                    {section === "missing-skills" && <p className="font-bold text-3xl text-center mb-4">🤔 <span className='bg-linear-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent'>Missing Skills</span> 🤔</p>}
                    {section === "improve-my-resume" && <p className="font-bold text-3xl text-center mb-4">🔧 <span className='bg-linear-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>Improve my Resume</span> 🔧</p>}
                    {section === "ats-match" && <p className="font-bold text-3xl text-center mb-4">✅ <span className='bg-linear-to-r from-emerald-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent'>ATS match</span> ✅</p>}

                    <div className="">

                        <div className="">
                            <div className="">
                                <StreamingMessage message={text} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};