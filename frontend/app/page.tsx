import Image from "next/image";
import MessageForm from "@/app/domain/home/message.form";
import {Suspense} from "react";


import logo from '../public/logo.png'

export default function Home() {


    return (
        <main>
            <div className={"flex justify-center"}>
                <Image src={logo} alt={"afbeelding van vliegtuig logo"}  className={"h-72 w-auto"}/>
            </div>
            <MessageForm/>
        </main>
    );
}
