
const contacts= [
    {
        id: 1,
        name: 'Jean Paul',
        phoneNumber: '0780661813',
        address: 'Address 1'
    },
    {
        id: 2,
        name: 'Diane Ishimwe',
        phoneNumber: '0780661812',
        address: 'Address 2'
    },
    {
        id: 3,
        name: 'Cristiano Ronaldo',
        phoneNumber: '0280661812',
        address: 'Port 67 St'
    },
    {
        id: 4,
        name: 'Mason Mount',
        phoneNumber: '0280661811',
        address: 'London 67 St'
    }
];

export const getContacts = () => contacts;

export const getContact = (id) => contacts.find(m => m.id === id);