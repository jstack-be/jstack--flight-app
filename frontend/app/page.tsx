import Image from "next/image";
import MessageForm from "@/app/domain/home/message.form";

import logo from '../public/logo.png'
import {ClientOnly} from "@/app/client.only";
import {Footer} from "@/app/domain/home/footer";

export default function Home() {
    return (
        <main>
            <section className="h-screen">
                <div className={"  flex-col flex items-center justify-between"}>
                    <Image src={logo} alt={"afbeelding van vliegtuig logo"} className="h-72 w-auto "/>
                    <h1 className="items-center justify-center text-primary text-6xl flex">
                        PLANELY
                    </h1>
                </div>
                <ClientOnly>
                    <MessageForm/>
                </ClientOnly>
            </section>
            <section className="h-screen">
                <div className="h-4/6">
                    <h2 className="items-center justify-center text-primary text-6xl flex">
                        About us
                    </h2>
                </div>
                <Footer/>
            </section>
        </main>
    );
}
