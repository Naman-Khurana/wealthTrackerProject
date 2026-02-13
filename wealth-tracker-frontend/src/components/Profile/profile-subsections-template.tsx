type ProfileSubsectionDateType = {
    heading : string,
    attribute1: {
        key: string;
        value: string;
    };
    attribute2: {
        key: string;
        value: string;
    };
    attribute3: {
        key: string;
        value: string; // or Date if you prefer
    };
};

export default function ProfileSubSectoinsTemplate(props: ProfileSubsectionDateType) {
    return (
        <main className="flex flex-col bg-black/30 border border-transparent shadow-lg rounded-lg p-4 gap-2">
            <h1 className="text-white">{props.heading}</h1>
            <div className="flex justify-between text-white/60 text-sm">
                <div>{props.attribute1.key} </div>
                <div>{props.attribute1.value}</div>
            </div>
            <div className="flex justify-between text-white/60 text-sm">
                <div>{props.attribute2.key} </div>
                <div>{props.attribute2.value}</div>
            </div>
            <div className="flex justify-between text-white/60 text-sm">
                <div>{props.attribute3.key} </div>
                <div>{props.attribute3.value}</div>
            </div>

        </main>

    )
}