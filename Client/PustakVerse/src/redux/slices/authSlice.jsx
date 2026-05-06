import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunk/authThunk";


//action-- redux ka obj jo data lekr ata hai
//action.type-- kis type ka data hai(login,success,fail)
//action.payload--server se jo data mila
const authSlice=createSlice(
   { name:'auth',                              //ye slice ka name hai
    initialState:{
        user:null,                                   // start m user null hai
        loading:false,                              // koi api call nhi chal rha hai
        error:null ,                                      //koi error nahi hai
        registerMessage:null                    //register ke liye separate message
    },
    reducers:{},                               // ye empty hai because humne normal action nahi banay kyuki sb ahyncthunk handle kr rha hai.
    extraReducers:(builder)=>{                          //ye async action ko handle krta hai , when we use createAsyncThunk
        builder

                            //LOGIN STATES
        .addCase(loginUser.pending,(state)=>{
            state.loading=true;                    //loader on
            state.error=null;                    //error reset
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;                                    //loader off
            state.user=action.payload;                      //server se jo data aya (action.payload)-->user m store hoga, (action.payload)-- vo data jo async thunk ne return kia hai
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;                                  //loader off hai
            state.error = action.payload?.message || action.error.message;                 //error msg store hoga
        })

                    //REGISTRATION STATE
        .addCase(registerUser.pending,(state)=>{
            state.loading=true;       //Loader on
            state.error=null;      //older error clear
            state.registerMessage=null;     //older register msg clear

        })

        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.registerMessage=action.payload.message; // NOTE: Register ke baad user login nahi hota 
                                                 // isliye user = null hi reheta hai (jab tak login na ho)
        })
        
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload?.message || "Registration failed";        
        })

    }

                         

   }
)

export default authSlice.reducer;