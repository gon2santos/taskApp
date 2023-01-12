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
            const newProject = {name: action.payload, tasks: [], id: state.projects.length}
            state.projects = [...state.projects, newProject]
            state.projNum += 1;
        },
        deleteProject: (state, action) => {
            state[action.payload.slot] = "";
        },
        editProject: (state, action) => {
            state[action.payload.slot] = action.payload.name;
        },
        addTask: (state, action) => {
            state.projects[action.payload.id].tasks.push(action.payload.task);
        },
    },
})

// Action creators are generated for each case reducer function
export const { addProject, deleteProject, editProject, addTask } = projectSlice.actions

export default projectSlice.reducer