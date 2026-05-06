import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../redux/thunk/authThunk";

export default function Login() {
  const dispatch=useDispatch();
  const {loading,error}=useSelector((state)=>state.auth)
  //useSelector --redux store se data nikalne vala hook
  //(state)=>state.auth--auth slice ka pura state le aao
  //yha pr humne loading or error hi bs dis.. krvya hai kyuki hum loading pr bs vohi dikhate hai user ka data nh 

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");//they are local state not redux state jab input fileds ko control ke liye hai
  //Y we are not storing in redux because form ke value temporary hote hai , or redux m bs global state store hota hai--server response/authenticated user
 const[showPassword,setShowPassword]=useState(false); //toogle state
  const handelLogin=()=>{
    dispatch(loginUser({email,password}))      //RTK call
  }
  return (
    <div>
      <div className="px-lg-5" style={{ maxWidth: "450px", width: "100%" }}>
       {/* INPUTS */}
        <div className="mb-3">
           <h3 className="fw-bold mb-4">Login </h3>
          <label className="form-label fw-semibold">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="example@email.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <div className="input-group">
        {/* PASSWORD INPUT */}
        <input
          type={showPassword ? "text" : "password"} // 👈 changes dynamically
          className="form-control"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* EYE ICON (clickable) */}
        <span
          className="input-group-text bg-white"
          style={{ cursor: "pointer" }}
          onClick={() => setShowPassword(!showPassword)} // 👈 toggles visibility
        >
          <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
        </span>
      </div>
        </div>
         <div className="mt-3">
          <a href="#" className="text-primary">
            Forgot password?
          </a>
        </div>

        {error&&<p className="text-danger">{error}</p>} 
        {/* //backend se error aya jese ki wrong pass,wrong email ase erroe hua to ye show hoga nh hua to nh hoga */}
        {/* {loading &&<p>Loading...</p>} api se data fetch krte tym UI blank nh hona chahiye iske liye text dikhaya  ,ab yee hum button m lgayghe*/}

        <button 
        className="btn btn-primary w-100 mt-2 py-2"
        onClick={handelLogin}
        disabled={loading}            //Hum disabled={loading} isliye use karte hain taaki API chal rahi ho tab user multiple clicks na kare
        >
          {loading ? (
            <><span className="spinner-border spinner-border-sm me-2"></span>
            Logging in...
          </>):(
            "Login"
          )}
          
        </button>

       

         {/* Logo */}
        <p className="mb-4">
          Don’t have an account?{" "}
         
          <Link to="/register" className="text-primary fw-semibold">
             Register
          </Link>
        </p>

      </div>
    </div>
  );
}
