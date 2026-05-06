// here loginServices send data to backend through post and store that data in response ok .
//now response will come in object form from server become we are using axois as we know axois also return promise object and from tyhis object we just want user data 
//-- so we write here response.data
import api from "./index";
import { API_URLS} from './apiConstant'
export const loginService= async(email,password)=>{
    const response= await api.post(API_URLS.login,{email,password});
    return response.data;
}


export const registerService=async(formData)=>{
    const response=await api.post(API_URLS.register,formData);
    return response.data;
}