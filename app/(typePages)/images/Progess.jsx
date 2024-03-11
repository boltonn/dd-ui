export default function Progress({ text, progress }) {
    const value = progress === undefined ? 0 : progress.toFixed(2);
    return (
        <div className="flex bg-gray-200 rounded-full justify-left dark:bg-gray-700">
            <div 
                className="bg-violet-950 text-sm font-medium text-violet-100 text-center p-0.5 leading-none rounded-full" 
                style={{ width: `${value}%` }}
            >
                <div className="flex justify-left">
                    {text} {value}%
                </div>
            </div>
        </div>
    )
}
