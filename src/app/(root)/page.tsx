import {Suspense} from "react";

import {ConferenceSection} from "@/components/sections";

export default function Home() {

    return (
        <div className={"flex flex-col"}>
            <div className="bg-primary-50 bg-dotted-pattern bg-contain py-40">
            </div>
            <div className="container my-10">
                <Suspense>
                    <ConferenceSection/>
                </Suspense>
            </div>
        </div>
    );
}