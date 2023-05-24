import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const addTeam = createAsyncThunk('addTeam', async function(team) {
    const response = await fetch(`http://localhost:3000/team/addTeam`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify(team)
        },
    })
    const parsedResponse = await response.json()
    return team
})

export const editTeam = createAsyncThunk('editTeam', async function(team) {
    console.log(team)
    const response = await fetch(`http://localhost:3000/team/editTeam`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify(team)
        },
    })
    const parsedResponse = await response.json()
    return team
})

export const deleteTeam = createAsyncThunk('deleteTeam', async function(id) {
    const response = await fetch(`http://localhost:3000/team/deleteTeam`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id})
    })
    const parsedResponse = await response.json()
    return id
})

export const getTeams = createAsyncThunk('getTeams', async function() {
    const response = await fetch(`http://localhost:3000/team`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        teams: []
    },
    reducers: {
    },
    extraReducers: {
        [getTeams.fulfilled]: (state, action) => {
            state.teams = action.payload
        },
        [addTeam.fulfilled]: (state, action) => {
            state.teams.push(action.payload)
        },
        [deleteTeam.fulfilled]: (state, action) => {
            state.teams = state.teams.filter(team => team.id !== action.payload)
        },
        [editTeam.fulfilled]: (state, action) => {
            state.teams = state.teams.map(team => {
                if(team.id === action.payload.id)
                    return action.payload
                else
                    return team
            })
        },
    }
})

export default teamsSlice.reducer