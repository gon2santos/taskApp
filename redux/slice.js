import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projNum: 0,
    projects: []
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProject: (state, action) => {
            const newProject = {name: action.payload, tasks: [""]}
            state.projects = [...state.projects, newProject]
            state.projNum += 1;
        },
        deleteProject: (state, action) => {
            state[action.payload.slot] = "";
        },
        editProject: (state, action) => {
            state[action.payload.slot] = action.payload.name;
        },
    },
})

// Action creators are generated for each case reducer function
export const { addProject, deleteProject, editProject } = projectSlice.actions

export default projectSlice.reducer