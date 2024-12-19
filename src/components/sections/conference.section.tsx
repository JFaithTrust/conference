import React from 'react'

import {Card} from "@/components/cards/conferences.card";
import {getLandingConference} from "@/lib/actions/conference.action";

const ConferenceSection = async () => {
    const conferenceCards = await getLandingConference();

    return (
        <div className={"space-y-6"}>
            <h2 className={"text-3xl"}>KONFERENSIYALAR</h2>
            {
                (!conferenceCards || conferenceCards.length === 0) ? (
                    <div>
                        <p>Hozircha konferensiyalar mavjud emas</p>
                    </div>
                ) : (
                    <div
                        className={"grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
                        {conferenceCards.map((card) => (
                            <Card key={card.id} data={card}/>
                        ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default ConferenceSection

// if (conferenceCards) {
//     const filteredConferenceCards = conferenceCards.filter(card => {
//         const currentDate = new Date();
//         const deadlineDate = new Date(card.deadlineForThesis);
//         return deadlineDate >= currentDate;
//     });
// }