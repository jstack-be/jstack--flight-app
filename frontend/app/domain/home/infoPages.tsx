import Image from "next/image";
import logo from "@/public/logo-big.svg";

interface ContentBlockProps {
    titel: string;
    children: React.ReactNode;
    className?: string; // Add this line
}

function ContentBlock({titel, children, className}: ContentBlockProps) {
    return (
        <div className={`flex flex-col lg:flex-row justify-around items-center ${className}`}>
            <div className="flex flex-col lg:w-3/6 p-6">
                <h2 className="text-5xl md:text-7xl text-primary font-sans">
                    {titel}
                </h2>
                <div className="text-background-dark py-3">
                    {children}
                </div>
            </div>
            <Image src={logo} alt={"The logo of the application"}
                   className="max-h-[40vh] md:max-h-[60vh] w-auto mb-14 hidden lg:block"/>
        </div>
    );
}


export function AboutPlanely() {
    return (
        <ContentBlock titel={"About Planely"} className={"h-full text-lg"}>
            <p className="text-background-dark pb-3">
                Consider Planely to be the friend that always finds the best flight.
                Not only do we tend to find the best flights based on your date and location,
                we also allow to specify exactly what you want.
            </p>
            <p className="text-background-dark">
                Maybe you want to travel to London,
                but if Paris is a lot cheaper, that would have the preference?
                Don’t worry, simply state your specific needs and we will take care of it!
            </p>
        </ContentBlock>
    );
}


export function HowToUse() {
    return (
        <ContentBlock titel={"How to use Planely"} className={"h-full"}>
            <p className="font-bold leading-relaxed text-xl">
                Speak planely, travel planely!
            </p>

            <ol className="my-3 text-lg space-y-1 list-decimal list-inside">
                <li>State the obvious. <span className="font-bold">From</span> where to where do you want to
                    go?
                </li>
                <li>What’s the<span className="font-bold"> depart</span> and <span
                    className="font-bold">return </span>
                    date (if any).
                </li>
                <li>
                    State <span className="font-bold">whatever you find important</span>.
                    How many people are you flying with? What luggage are you bringing with you?
                    Are you flexible with the dates if this would mean that you can save money? Etc.
                </li>
            </ol>
        </ContentBlock>
    );
}

export function Examples() {
    return (
        <ContentBlock titel={"Examples"} className={"mt-10"}>
            <p className="text-background-dark pb-3 font-bold text-xl">
                Here are some examples of what you could ask:
            </p>
            <ol className="text-background-dark leading-relaxed text-lg space-y-1 list-decimal list-inside">
                <li>
                    Show me the routes from London to Paris on the 12th of December 2024 for 2 adults and 1
                    child returning between the 20th and 25th of December 2024.
                </li>
                <li>
                    I want to fly from Amsterdam to New York on the 1st of January 2025 for 1 adult and 1
                    child. I want to return on the 10th of January 2025. I want to bring 2 suitcases with me.
                </li>
                <li>
                    I want to fly from London to Paris on the 12th of December 2024 for 2 adults and 1 child.
                    I want to return on the 25th of December 2024. I want to bring 1 suitcase with me.
                </li>
            </ol>
        </ContentBlock>
    )
}
