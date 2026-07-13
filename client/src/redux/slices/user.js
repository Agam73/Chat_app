import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails :  localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null,
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUserDetails : (state, action)=>{
            state.userDetails = action.payload;
            localStorage.setItem("userDetails",JSON.stringify(action.payload));
        }
        
        }
    }
);

export const {setUserDetails} = userSlice.actions;
export default userSlice.reducer;