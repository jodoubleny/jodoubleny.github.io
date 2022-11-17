import { configureStore } from "@reduxjs/toolkit"
import { storedProjectSlice } from "./storedProjectSlice"

export const store = configureStore({
    reducer: {
        storedProject: storedProjectSlice.reducer,
    }
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>