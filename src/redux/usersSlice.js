import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [
            {
                id: 'fkjsdfl',
                name: 'Maryna',
                surname: 'Muzychuk',
                email: 'marm@gmail.com',
                businessUnitId: 'fdsgdsg'
            },
            {
                id: 'fkjsdfl',
                name: 'Dmytro',
                surname: 'Hero',
                email: 'dmyh@gmail.com',
                businessUnitId: 'sdfgsdfg'
            },
            {
                id: 'fkjsdfl',
                name: 'Illya',
                surname: 'Lvov',
                email: 'il@gmail.com',
                businessUnitId: 'fdghfdgh'
            },
            {
                id: 'fkjsdfl',
                name: 'Ivan',
                surname: 'Ivanov',
                email: 'iviv@gmail.com',
                businessUnitId: 'reyt'
            }
        ]
    },
    reducers: {
        setUsers(state, action){
            state.users = action.payload
        },
        addUser(state, action){
            state.users.push(action.payload)
        }
    }
})

export default usersSlice.reducer
export const { setUsers, addUser } = usersSlice.actions