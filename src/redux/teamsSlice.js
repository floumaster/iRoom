import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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
        addTeam(state, action) {
            state.teams.push(action.payload)
        },
    },
    extraReducers: {
        [getTeams.fulfilled]: (state, action) => {
            state.teams = action.payload
        },
    }
})

export default teamsSlice.reducer
export const { addTeam } = teamsSlice.actions