export default function Status_Progress_Template_2({ stage }: { stage: number }) {
    return (
        <div className="flex justify-between items-center px-3 md:px-10">
            <p className={`bg-green-500 flex justify-center items-center rounded-md md:rounded-full text-xl h-10 w-10 md:h-12 md:w-12`}>1</p>
            <div className={`hidden md:block md:w-20 xl:w-36 h-1 ${stage >= 2 ? "bg-green-600" : "bg-rose-600"}`}></div>
            <p className={`${2 <= stage ? "bg-green-500" : "bg-rose-500"} flex items-center justify-center rounded-md md:rounded-full text-xl h-10 w-10 md:h-12 md:w-12`}>2</p>
            <div className={`hidden md:block md:w-20 xl:w-36 h-1 ${stage >= 3 ? "bg-green-600" : "bg-rose-600"}`}></div>
            <p className={`${3 <= stage ? "bg-green-500" : "bg-rose-500"} flex items-center justify-center rounded-md md:rounded-full text-xl h-10 w-10 md:h-12 md:w-12`}>3</p>
            <div className={`hidden md:block md:w-20 xl:w-36 h-1 ${stage >= 4 ? "bg-green-600" : "bg-rose-600"}`}></div>
            <p className={`${4 <= stage ? "bg-green-500" : "bg-rose-500"} flex items-center justify-center rounded-md md:rounded-full text-xl h-10 w-10 md:h-12 md:w-12`}>4</p>
            <div className={`hidden md:block md:w-20 xl:w-36 h-1 ${stage >= 5 ? "bg-green-600" : "bg-rose-600"}`}></div>
            <p className={`${5 <= stage ? "bg-green-500" : "bg-rose-500"} flex items-center justify-center rounded-md md:rounded-full text-xl h-10 w-10 md:h-12 md:w-12`}>5</p>
            <div className={`hidden md:block md:w-20 xl:w-36 h-1 ${stage >= 6 ? "bg-green-600" : "bg-rose-600"}`}></div>
            <p className={`${6 <= stage ? "bg-green-500" : "bg-rose-500"} flex items-center justify-center rounded-md md:rounded-full text-xl h-10 w-10 md:h-12 md:w-12`}>6</p>
        </div>
    )
}