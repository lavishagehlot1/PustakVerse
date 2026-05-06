//sirf sare api path yha rakhe hote hai
//taki agr kabhi end-points of url (/login) ko change karna hoto bs yha change krna pde.✔ Yeh kya karta hai?

//Tumhari application me jitne bhi API endpoints hote hain,
//unko ek place par store kar deta hai.
//✔ Kyun use karte hain?
//Centralized control
//Agar kal tumhara /login endpoint change ho jaye →
//bas is file me 1 line change karna padega.
//Clean code
//Har jagah string likhne ki zaroorat nahi.
//Eg: API_URLS.login
//Avoid mistakes
//Endpoint spelling mistake ka chance kam.


export const API_URLS={
    login:"/api/auth/login",
    register:'/api/auth/register'
}