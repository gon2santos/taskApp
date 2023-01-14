import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projNum: 0,
    projects: [],
    taskQueue: []
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProject: (state, action) => {
            const newProject = { name: action.payload, tasks: [], id: state.projects.length }
            state.projects = [...state.projects, newProject]
            state.projNum += 1;
        },
        deleteProject: (state, action) => {
            var projName = state.projects[action.payload.id].name;
            var filtered = state.projects.filter(proj => {
                if (proj.name === projName) return false;
                else return true;
            });
            var id = 0;
            filtered = filtered.map(element => {
                element.id = id;
                id++;
                return element;
            });

            var e = 0;
            var i = 0;
            var haveTasksinlevel = true;
            state.taskQueue = [];
            while (haveTasksinlevel) {
                haveTasksinlevel = false;
                for (i = 0; i < (state.projNum - 1); i++) {
                    if (filtered[i].tasks[e]) {
                        state.taskQueue.push({ [i]: e });
                        haveTasksinlevel = true;
                    }
                }
                e++;
            }
            state.projects = filtered;
            state.projNum -= 1;
        },
        renameProject: (state, action) => {
            state.projects[action.payload.id].name = action.payload.name;
        },
        addTask: (state, action) => {
            state.projects[action.payload.id].tasks.push(action.payload.task);
            var e = 0;
            var i = 0;
            var haveTasksinlevel = true;
            state.taskQueue = [];
            while (haveTasksinlevel) {
                haveTasksinlevel = false;
                for (i = 0; i < state.projNum; i++) {
                    if (state.projects[i].tasks[e]) {
                        state.taskQueue.push({ [i]: e });
                        haveTasksinlevel = true;
                    }
                }
                e++;
            }
        },
        checkTask: (state) => {
            state.projects[Object.keys(state.taskQueue[0])[0]].tasks.shift();
            state.taskQueue.shift();
        },
    },
})

// Action creators are generated for each case reducer function
export const { addProject, deleteProject, renameProject, editProject, addTask, checkTask } = projectSlice.actions

export default projectSlice.reducer