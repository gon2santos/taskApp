import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    updatePrj: false
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        updateProjects: (state) => {
            state.updatePrj = !state.updatePrj; 
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateProjects } = projectSlice.actions

export default projectSlice.reducer