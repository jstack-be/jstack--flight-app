"use client"
import React from "react";
import {addForm} from "@/app/lib/actions";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"

export default function AddForm() {
    return (
        <form action={addForm}>
            <div className="flex justify-center m-2">
                <Label htmlFor="message">Enter Task</Label>
            </div>

            <div className="flex justify-center m-2">
                <Textarea className="w-8/12" id="message" name="message"
                          placeholder={"Please type your description here"} required/>
            </div>
            <div className="flex justify-center m-2">
                <Button type="submit" className="">Add Task</Button>
            </div>
        </form>
    );
}