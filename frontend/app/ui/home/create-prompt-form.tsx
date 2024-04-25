"use client";

import {useFormState, useFormStatus} from "react-dom";



export default function AddForm() {
    // const [state, FormAction] = useFormState(FormSubmit, "");

    const FormAction = async (formdata : FormData) => {
        "use server";

        const message = formdata.get("message");

    }
    return (
        <>
            <form action={FormAction}>
                <div className="text-md text-green-500">
                </div>
                <label htmlFor="message">Enter Task</label>
                <textarea id="message" name="message" placeholder={"type here your description"} required/>
                <SubmitButton/>
                {/* voor screenreader*/}
                {/*<p aria-live="polite" hidden className="sr-only" role="status">*/}
                {/*    {state?.message}*/}
                {/*</p>*/}
            </form>
        </>
    );
}

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending}>
            Add
        </button>
    );
}