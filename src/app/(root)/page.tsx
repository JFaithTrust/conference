import {Card} from "@/components/cards/conferences.card";
import {getAllConferences} from "@/lib/actions/conference.action";
import {ConferenceType} from "@/types";

export default async function Home() {
    const conferenceCards = (await getAllConferences()) as ConferenceType[] || [];
    const placeholderImage = "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const filteredConferenceCards = conferenceCards.filter(card => {
        const currentDate = new Date();
        const deadlineDate = new Date(card.deadlineForThesis);
        return deadlineDate >= currentDate;
    });

    return (
        <div className="bg-primary-50 bg-dotted-pattern bg-contain py-40">
            <div className="container">
                <div className={"space-y-6"}>
                    <h2 className={"text-3xl"}>KONFERENSIYALAR</h2>
                    <div
                        className={"grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
                        {filteredConferenceCards.map((card) => {
                            const newCard = {...card, images: placeholderImage};
                            return (
                                <Card key={card.id} data={newCard}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}