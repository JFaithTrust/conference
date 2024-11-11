import {Card} from "@/components/cards/conferences.card";


function ConferencesCards() {
    const conferenceCards = [
        {
            id: 0,
            images: "https://cdn.pixabay.com/photo/2015/05/15/02/07/computer-767781_640.jpg",
            name: "Sun'iy intelekt targ'iboti",
            description: "Sun’iy intellekt (SI) bugungi kunda turli sohalarda inqilobiy o'zgarishlarni amalga oshirishda muhim rol o'ynamoqda va konferensiyaning maqsadi SIning imkoniyatlari, qo'llanilish sohalari va uning kelajakdagi yo'nalishlari haqida.",
            address: "Toshkent shahar, Olmazor tumani",
            deadlineForThesis: "2024-11-31"
        },
        {
            id: 1,
            images: "https://cdn.pixabay.com/photo/2016/11/30/20/44/computer-1873831_1280.png",
            name: "Raqamli moliya va fintech",
            description: "Raqamli moliya sohasi va fintech texnologiyalari zamonaviy iqtisodiyotni qayta shakllantirmoqda. Bu konferensiyada moliyaviy innovatsiyalar va raqamli to'lovlar haqida so'z boradi.",
            address: "Toshkent shahar, Mirzo Ulug'bek tumani",
            deadlineForThesis: "2024-11-15"
        },
        {
            id: 2,
            images: "https://media.istockphoto.com/id/2151295139/photo/professional-online-gamer-hand-fingers.jpg?s=2048x2048&w=is&k=20&c=ZoyDd30pW40sgpxtg-zFypggmSfv9554TWhzpuha5FE=",
            name: "Katta ma'lumotlarni tahlil qilish",
            description: "Katta ma'lumotlarni tahlil qilish sohasidagi yangi imkoniyatlar va texnologiyalar bilan tanishtiruvchi ushbu anjuman tadbirkorlar va mutaxassislar uchun ajoyib imkoniyatdir.",
            address: "Toshkent shahar, Yashnobod tumani",
            deadlineForThesis: "2024-12-01"
        },
        {
            id: 3,
            images: "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_960_720.jpg",
            name: "Ta'limda raqamli texnologiyalar",
            description: "Ta'limda raqamli texnologiyalardan foydalanish orqali ta'lim tizimini rivojlantirish imkoniyatlari va kelajakdagi yondashuvlar haqida fikr almashiladi.",
            address: "Toshkent shahar, Shayxontohur tumani",
            deadlineForThesis: "2024-11-15"
        },
        {
            id: 4,
            images: "https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_640.jpg",
            name: "Yashil texnologiyalar va ekologiya",
            description: "Ekologiya va yashil texnologiyalar bo'yicha global masalalar va ularning yechimlari muhokama qilinadigan xalqaro konferensiya.",
            address: "Toshkent shahar, Chilonzor tumani",
            deadlineForThesis: "2024-11-20"
        },
        {
            id: 5,
            images: "https://cdn.pixabay.com/photo/2016/03/26/13/09/workspace-1280538_640.jpg",
            name: "Biotexnologiyalar va sog'liqni saqlash",
            description: "Biotexnologiya va sog'liqni saqlash sohasidagi innovatsion yutuqlarni o'rganishga bag'ishlangan konferensiya.",
            address: "Toshkent shahar, Yunusobod tumani",
            deadlineForThesis: "2024-11-10"
        },
        {
            id: 6,
            images: "https://cdn.pixabay.com/photo/2015/05/15/02/07/computer-767781_640.jpg",
            name: "Qishloq xo'jaligida raqamli texnologiyalar",
            description: "Qishloq xo'jaligida raqamli texnologiyalardan foydalanish orqali unumdorlikni oshirish va resurslarni tejash imkoniyatlari muhokama qilinadi.",
            address: "Toshkent shahar, Bektemir tumani",
            deadlineForThesis: "2024-11-14"
        }
    ];


    return (
        <div className={"space-y-6"}>
            <h2 className={"text-3xl"}>KONFERENSIYALAR</h2>
            <div className={"grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-center gap-6"}>
                {conferenceCards.map((card) => (
                    <Card key={card.id} data={card}/>
                ))}
            </div>
        </div>
    )
}

export default ConferencesCards