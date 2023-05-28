import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk('login', async function(data) {
    const response = await fetch(`http://localhost:3000/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

export const login = createAsyncThunk('login', async function(data) {
    const response = await fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

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

export const deleteUser = createAsyncThunk('deleteUser', async function(id) {
    const response = await fetch(`http://localhost:3000/user/deleteUser`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id})
    })
    const parsedResponse = await response.json()
    return id
})

export const editUser = createAsyncThunk('editUser', async function(data) {
    console.log(data)
    const response = await fetch(`http://localhost:3000/user/editUser`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const parsedResponse = await response.json()
    return data
})

export const setUsers = createAsyncThunk('setUsers', async function(data) {
    const response = await fetch(`http://localhost:3000/user/addUsers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const parsedResponse = await response.json()
    return data
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
        users: [],
        currentUser: null,
        error: null
    },
    reducers: {
        addUser(state, action){
            state.users.push(action.payload)
        },
        logout(state, action){
            state.currentUser = null
        }
    },
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload
        },
        [createUser.fulfilled]: (state, action) => {
            state.users.push(action.payload)
        },
        [setUsers.fulfilled]: (state, action) => {
            state.users = [...state.users, ...action.payload]
        },
        [editUser.fulfilled]: (state, action) => {
            state.users = state.users.map(user => {
                if(user.id === action.payload.id)
                    return action.payload
                else
                    return user
            })
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        [login.fulfilled]: (state, action) => {
            const result = action.payload
            if(result.error){
                state.error = result.error
            }
            else{
                state.error = null
            }
            state.currentUser = result
        },
        [register.fulfilled]: (state, action) => {
            const result = action.payload
            if(result.error){
                state.error = result.error
            }
            else{
                state.error = null
            }
            state.currentUser = result
        },
    }
})

export default usersSlice.reducer
export const { addUser, logout } = usersSlice.actions