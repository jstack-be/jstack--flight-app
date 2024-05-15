export default function About() {
    return (
        <div className="pt-12 min-h-[85vh]">

            <div className="grid grid-cols-7 grid-rows-3 gap-4">
                <div className="grid grid-cols-4 col-start-2 col-span-4 row-start-1 row-end-1 border-r border-dotted">
                    <div className="col-start-1 col-span-3">
                        <AboutPlanely/>
                    </div>
                </div>
                <div className="grid grid-cols-4 col-start-3 col-span-4 row-start-2 row-end-2 border-l border-dotted">
                   <div className="col-start-2 col-span-3">
                       <HowToUse/>
                   </div>

                </div>
                <div className="col-start-2 col-span-3 row-start-3 row-end-3">
                    <Examples/>
                </div>
            </div>
        </div>
    );
}


export function AboutPlanely() {
    return (
        <div className="col-start-2 col-span-3">
            <div className="text-start px-6 pt-6 text-7xl text-primary font-sans">
                About Planely
            </div>
            <div className="p-2 text-xl leading-relaxed">
                <div className="text-background-dark pb-3">
                    Consider Planely to be the friend that always finds the best flight.
                    Not only do we tend to find the best flights based on your date and location,
                    we also allow to specify exactly what you want.
                </div>
                <div className="text-background-dark">
                    Maybe you want to travel to London,
                    but if Paris is a lot cheaper, that would have the preference?
                    Don’t worry, simply state your specific needs and we will take care of it!
                </div>
            </div>
        </div>
    );
}


export function HowToUse() {
    return (
        <div>
            <div className="text-start px-6 pt-6 text-7xl text-primary font-sans ">
                How to use Planely
            </div>
            <div className="p-2 text-xl"> {/*TODO vervangen door translateable string*/}
                <div className="font-bold text-background-dark pb-3 leading-relaxed">
                    Speak planely, travel planely!
                </div>

                <div className="text-background-dark ">
                    1. State the obvious. <span className="font-bold">From</span> where to where do you want to go?<br/>
                    2. What’s the<span className="font-bold"> depart</span> and <span
                    className="font-bold">return </span>
                    date (if any).<br/>
                    3. State <span className="font-bold">whatever you find important</span>.
                    How many people are you flying with? What luggage are you bringing with you?
                    Are you flexible with the dates if this would mean that you can save money? Etc.
                </div>
            </div>
        </div>
    );
}

export function Examples() {
    return(
        <div>
            <div className="text-start px-6 pt-6 text-7xl text-primary font-sans">
                Examples
            </div>
            <div className="p-2 text-xl">
                <div className="text-background-dark pb-3 font-bold">
                    Here are some examples of what you could ask:
                </div>
                <div className="text-background-dark leading-relaxed">
                    1. Show me the routes from London to Paris on the 12th of December 2024 for 2 adults and 1 child returning between the 20th and 25th of December 2024.<br/>
                    2. I want to fly from Amsterdam to New York on the 1st of January 2025 for 1 adult and 1 child. I want to return on the 10th of January 2025. I want to bring 2 suitcases with me.<br/>
                    3. I want to fly from London to Paris on the 12th of December 2024 for 2 adults and 1 child. I want to return on the 25th of December 2024. I want to bring 1 suitcase with me.<br/>
                </div>
            </div>
        </div>
    );
}
