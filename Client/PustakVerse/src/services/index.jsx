import axios from "axios";

//axios.create ek custom instance banata hai mtlb-app axios ka apna personal version abanate ho jisme:--baseUrl,header, tokens,timeout, interceptors sab phele se set hote hai.
//baad m jab api call krna hoto -bar-bar settings nhi deni padti hai.
//baseUrl-- ye apke server ka common path set karta hai.
//header-- server ko batana hum json bhj rhe hai, body ko json ke format m read karna, har api call m automatically header add hojygha
const api = axios.create({
  baseURL: "http://localhost:8080/",
  // headers: {
   
  //   "Content-Type": "application/json",
  // },
});

export default api;
