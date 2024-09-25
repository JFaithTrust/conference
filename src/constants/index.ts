export const headerLinks = [
    {
        label: 'Bosh sahifa',
        route: '/',
    },
    {
        label: 'Konferensiyalar',
        route: '#',
    },
    {
        label: 'Biz haqimizda',
        route: '#',
    },
]

export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
}