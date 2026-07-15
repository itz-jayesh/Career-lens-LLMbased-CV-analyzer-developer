import templateData from "../../../data/templateData.json";
import { Link } from "react-router-dom";


const Generate_Resume_Page = () => {
    return (
        <div className="py-28 bg-transparent px-3 md:px-20 lg:px-40">
            <div className="">
                <p className="text-center font-semibold text-5xl text-white" style={{ fontFamily: "'Averia Serif Libre', serif" }}>Choose the template</p>
                <p className="text-center text-gray-100 font-semibold mt-3">Simple to use and ready in minutes resume templates — give it a try for free now!</p>
            </div>
            <div className="grid grid-cols-3 gap-y-20 gap-10 items-center justify-center mt-14 flex-col md:flex-row">
                {templateData.map((item, i) => (
                    <div key={item.id} className="bg-white/10 group relative">
                        <div className="absolute top-0 left-0 h-full w-full bg-white/5 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-xs flex justify-center items-center transition-all">
                            <Link to={item.link} className="bg-blue-500 rounded-md px-6 py-3">
                                <button className="text-white font-semibold cursor-pointer">Use this template</button>
                            </Link>
                        </div>
                        <Link to={item.link} className="rounded-2xl p-4 flex justify-center flex-col gap-3 hover:scale-95 transition">
                            <img src={`/t/t${(i + 1) % 10}.png`} alt={item.name} className="rounded h-[400px] w-[300px] object-cover mx-auto" />
                            <p className="text-xl font-semibold text-white">{item.name}</p>
                            <p className="text-sm text-gray-300">{item.desc}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Generate_Resume_Page;