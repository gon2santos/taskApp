import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    project1: "",
    project2: "",
    project3: "",
    project4: "",
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.project1 = "Castle Drawing";
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