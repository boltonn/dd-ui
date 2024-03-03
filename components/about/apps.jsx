export default function Apps({ collabApps }) {
    const degree = 360 / collabApps.length;
    return (
        <div className="w-[22rem] aspect-square border border-n-6 rounded-full scale:50 md:scale-75">
            <ul>
                {collabApps.map((app, index) => (
                    <li
                        key={app.title}
                        className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${index * degree}`}
                    >
                        <div
                            className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${index * degree}`}
                        >
                            <app.icon
                                className="m-auto text-white"
                                size={32}
                                alt={app.title}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};