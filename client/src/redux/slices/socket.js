import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket : null,
    allOnlineUsers : []
}

export const socketSlice = createSlice({
    name:"Socketio",
    initialState,
    reducers:{
        
        setAllOnlineUsers : (state, value)=>{
            state.allOnlineUsers = value.payload;
        }
    }
});

export const {setAllOnlineUsers} = socketSlice.actions;
export default socketSlice.reducer;