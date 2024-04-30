import Image from "next/image";
import MessageForm from "@/app/ui/home/message.form";

export default function Home() {

    const logo = require("@/public/ToucanLogo.png");
    return (
        <main>
            <div className={"flex justify-center"}>
                <Image src={logo} alt={"afbeelding van toucan logo"} className={"lg:object-scale-down h-72 w-72 md:"}/>
            </div>
            <MessageForm/>
        </main>
    );
}
