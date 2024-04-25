import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    const formData = await req.formData()
    const desc = formData.get('message')

    if (!desc){
        return NextResponse.json({message:"Please provide a message"})
    } else {
        return NextResponse.json({message: "request is received"})
    }

}

