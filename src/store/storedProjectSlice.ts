import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from '../types/types'

type storedProject = {
    data?: Project,
}

const initialState: storedProject = {
    data: undefined,
};

export const storedProjectSlice = createSlice({
    name: "storedProjectSlice",
    initialState,
    reducers: {
        storeProject: (state, action: PayloadAction<Project>) => {
            state.data = action.payload
        },
        removeProject: state => {
            state.data = undefined
        }
    }
})

export const { storeProject, removeProject } = storedProjectSlice.actions;