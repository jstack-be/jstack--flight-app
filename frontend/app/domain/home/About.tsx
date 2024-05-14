export default function About() {
    return (
        <>
            <div className="text-start px-6 pt-6 text-7xl text-primary">
                About Us
            </div>
            <div className="grid grid-cols-2 place-items-stretch">
                <AboutUs/>
                <AboutPlanely/>
            </div>

        </>
    );
}


export function AboutUs() {
    return (
        <div className="bg-white rounded mr-3 ml-6">
            <div className="p-2 text-xl">
                <div className="text-secondary">
                    {` What is \"Planely\" ?`}
                </div>
                <div>
                    {`Its a flight booking assistant that allows you to find the best possible flights for all your
                    travelling needs. Don't worry its really easy to use, you just have to describe your flight plans to us
                    and we'll do our best to give you all the great options`}
                </div>
            </div>
        </div>
    );
}


export function AboutPlanely() {
    return (
        <>
            <div className="bg-white rounded min-h-32 mr-6 ml-3">
                <div className="p-2 text-xl"> {/*TODO vervangen door translateable string*/}
                    <div className="text-secondary">
                        {`How does it work ?`}
                    </div>
                    <div>
                        {`Easy just simply provide as much detail as possible about your travel plans.`}
                    </div>

                    <div className="text-secondary whitespace-pre-line">{
                        `1. where do you want to go? 
                        2. where are you taking off ?
                        3. when do you plan to leave ?
                        4. when (if at all) do you plan to return ?
                        5. How many others will fly along with you? (if blank its only you)
                        `}
                    </div>

                    <div className="text-xs text-end">
                        <div>
                            {` if you are still struggling look at the example below.`}
                        </div>
                        <div className="whitespace-pre-line justify">
                            {`Show me the routes from London to Paris on the 12th of December 2024 for 2 adults and 1 child. 
                            We plan to return between the 20th and 25th of December 2024.`}
                        </div>


                    </div>


                </div>

            </div>
            <p className="text-secondary">

            </p>
        </>
    );
}
