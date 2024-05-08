import Image from "next/image";
import MessageForm from "@/app/domain/home/message.form";

import logo from '../public/logo.png'

export default function Home() {
    return (
        <main>
            <div className={"flex-col flex items-center justify-between"}>
                <Image src={logo} alt={"afbeelding van vliegtuig logo"} className="h-72 w-auto "/>
                <h1 className="items-center justify-center text-primary text-6xl flex">
                    PLANELY
                </h1>
            </div>
            <MessageForm/>
        </main>
    );
}
