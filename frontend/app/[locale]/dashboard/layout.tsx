import {ClientOnly} from "@/app/client.only";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className=" min-h-screen md:flex-row">
            <ClientOnly>
                {children}
            </ClientOnly>
        </div>
    );
}