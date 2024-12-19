import React from 'react'

import {PostConferenceForm} from "@/components/forms";

const CreateConferencePage = () => {
    return (
        <div className={"container my-4 space-y-4 rounded-md pt-3 shadow-md"}>
            <h1 className={"text-2xl font-bold"}>Konferensiya yaratish</h1>
            <PostConferenceForm/>
        </div>
    )
}
export default CreateConferencePage
