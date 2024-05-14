export default function About() {
    return (
        <div>

            <div className="grid grid-cols-7 grid-rows-2 place-items-stretch">
                <div className="col-start-2 col-span-3 row-start-1 row-end-1">
                    <AboutUs/>
                </div>
                <div className="col-start-4 col-span-3 row-start-2 row-end-2">
                    <AboutPlanely/>
                </div>
            </div>

        </div>
    );
}


export function AboutUs() {
    return (
        <div>
        <div className="text-start px-6 pt-6 text-7xl text-primary font-Jua">
                About Planely
            </div>
            <div className="p-2 text-xl">
                <div className="text-background-dark">
                    {` Consider Planely to be the friend that always finds the best flight. 
                    Not only do we tend to find the best flights based on your date and location, 
                    we also allow to specify exactly what you want. Maybe you want to travel to London, 
                    but if Paris is a lot cheaper, that would have the preference? 
                    Don’t worry, simply state your specific needs and we will take care of it!`}
                </div>
            </div>
        </div>
    );
}


export function AboutPlanely() {
    return (
        <div>
            <div className="text-start px-6 pt-6 text-7xl text-primary font-Jua">
                How to use Planely
            </div>
            <div className="p-2 text-xl"> {/*TODO vervangen door translateable string*/}
                <div className="font-bold text-background-dark">
                    Speak planely, travel planely!
                </div>

                <div className="text-background-dark ">
                    1. State the obvious. <span className="font-bold">From</span> where to where do you want to go?<br/>
                    2. What’s the<span className="font-bold"> depart</span> and <span
                    className="font-bold">return </span>
                    date (if any).<br/>
                    3. State <span className="font-bold">whatever you find important</span>.
                    How many people are you flying with?
                    What luggage are you bringing with you?
                    Are you flexible with the dates if this would mean that you can save money? Etc.
                </div>
            </div>
        </div>
    );
}
