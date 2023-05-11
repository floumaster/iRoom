import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getUsers = createAsyncThunk('getUsers', async function() {
    const response = await fetch(`http://localhost:3000/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

export const createUser = createAsyncThunk('createUser', async function(data) {
    const response = await fetch(`http://localhost:3000/user/addUsers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify([data])
    })
    const parsedResponse = await response.json()
    return data
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: []
    },
    reducers: {
        setUsers(state, action){
            state.users = action.payload
        },
        addUser(state, action){
            state.users.push(action.payload)
        }
    },
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload
        },
        [createUser.fulfilled]: (state, action) => {
            state.users.push(action.payload)
        },
    }
})

export default usersSlice.reducer
export const { setUsers, addUser } = usersSlice.actions