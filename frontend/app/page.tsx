import Image from "next/image";
import AddForm from "@/app/ui/home/addForm";

export default function Home() {

    const logo = require("@/public/ToucanLogo.png");
    return (
        <main>
            <div className={"flex justify-center"}>
                <Image src={logo} alt={"afbeelding van toucan logo"} className={"lg:object-scale-down h-72 w72 md:"}/>
            </div>
            <AddForm/>
        </main>
    );
}
