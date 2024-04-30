import Image from "next/image";
import MessageForm from "@/app/ui/home/message.form";
import {Suspense} from "react";

export default function Home() {

    const logo = require("@/public/ToucanLogo.png");
    const background = require("@/public/background.png");
    return (
        <main>
            <div style={{
                zIndex: -1,
                position: "absolute",
                width: "100%",
                height: "100%",
            }}>
                <Image src={background} alt={"background image"} layout={"fill"}
                       objectFit={"cover"}/>
            </div>
            <div className={"flex justify-center"}>
                <Image src={logo} alt={"afbeelding van toucan logo"} className={"lg:object-scale-down h-72 w-72 md:"}/>
            </div>
            <MessageForm/>
        </main>
    );
}
