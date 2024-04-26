"use client"

import {MessageBox} from "@/app/ui/dashboard/message.box";

export default function Dashboard() {
    return (<div className="relative">
            <div>
                <div>
                    Main Content
                </div>
            </div>
            <MessageBox/>
        </div>
    );
};