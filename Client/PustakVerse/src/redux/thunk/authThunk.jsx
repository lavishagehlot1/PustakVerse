//loginServices bs api ke through data bhj  raha hai and response le raha hai backend se
//here createAsyncThunk iske errors ko manage krta hai+success or error return kregha redux ke slice ko.
//createAsyncThunk directly Redux store me data nahi bhejta
//✔️ createAsyncThunk → slice ke extraReducers ko data deta hai
//✔️ slice us data ko Redux store me save karta hai

//auth/loginUser ye bs ek base name hai,RTK is name se 3 automatic action generate krta hai --pending, fullfilled,rejected.

//async({email,password},{rejectWithValue})--ye fun login krta hai and iske pass 2 value ati hai-- (email,password)--user input,(rejectWithValue)--err bhjne ka tarika
//actual async work (api calling)

//try{ //const result=await loginService(email,password);
           // return result; yha result ke ander agar hmra data sahi se aagya to ye slice m jakr success ka action generate kregha.
           //catch m error aaygha--agr server down hai, email,pass glt hua to hum ek custom error create krte hai
           //(?)--optional chaining agr response null or undefined hai to js error throw krta hai but in optional chaining err nh throw krta blki undefined return krta hai.

import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../services/authService";
import { registerService } from "../../services/authService";

export const loginUser= createAsyncThunk(
    "auth/loginUser",
    async({email,password},{rejectWithValue})=>{
        try{
            const result=await loginService(email,password);
            return result;
        }catch(err){
            return rejectWithValue(err.response?.data ||"Login failed");
        }
    }



);

export const registerUser=createAsyncThunk(
    'auth/registerUser',
    async(formData,{rejectWithValue})=>{
        try{
            console.log("THUNK RUNNING");
            const result=await registerService(formData);
            return result;
        }catch(err){
            return rejectWithValue(err.response?.data||"Registration failed")
        }
    }
)