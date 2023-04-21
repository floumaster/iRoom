import { createSlice } from '@reduxjs/toolkit'

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        teams: [
            {
                id: 'fdsgdsg',
                name: 'Team Auditdata',
                color: '#eb4034'
            },
            {
                id: 'sdfgsdfg',
                name: 'Team Spin',
                color: '#f0cd32'
            },
            {
                id: 'fdghfdgh',
                name: 'Team Projector',
                color: '#5fed34'
            },
            {
                id: 'reyt',
                name: 'Team TV',
                color: '#34ceed'
            },
            {
                id: 'dfghfdgh',
                name: 'Team Operable walls',
                color: '#34eda3'
            },
            {
                id: 'cvbncvbn',
                name: 'Team Whiteboard',
                color: '#ed34c8'
            },
            {
                id: 'xzcvxzcv',
                name: 'Team Power outlets',
                color: '#3456ed'
            },
        ]
    },
    reducers: {
        addTeam(state, action) {
            console.log(action.payload)
            state.teams.push(action.payload)
        },
    }
})

export default teamsSlice.reducer
export const { addTeam } = teamsSlice.actions