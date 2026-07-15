import useScroll from '../hooks/useScroll.hook';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Not_Found_Page() {
    useScroll();

    return (
        <div className="h-screen flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-600 animate-pulse">
                404
            </h1>
            <p className="mt-4 text-2xl md:text-3xl font-semibold text-gray-300">
                Oops! The page you're looking for doesn&apos;t exist.
            </p>
            <p className="mt-2 text-gray-500 text-lg">
                Maybe it was moved, deleted, or never existed in the first place.
            </p>

            <div className="mt-8">
                <Link to="/"
                    className="inline-flex items-center gap-2 bg-linear-to-r from-teal-500 to-blue-600 hover:from-blue-600 hover:to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                    <FaArrowLeft />
                    Go Home
                </Link>
            </div>

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl absolute -top-40 -left-40 animate-pulse"></div>
                <div className="w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl absolute bottom-0 right-0 animate-pulse"></div>
            </div>
        </div>
    );
}
