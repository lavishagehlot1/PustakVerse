import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../redux/thunk/authThunk";

export default function Register() {
  const dispatch = useDispatch();
  //Local states for inputs
  const [photo, setPhoto] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 // const [err, setErr] = useState(null);

  //register button click
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register button clicked")

    // //basic validations
    // if (!photo || !fname || !lname || !userName || !email || !password) {
    //   setErr("All fields are required");
    //   return;
    // }

    // if (password.length < 6) {
    //   setErr("Password must be at least 6 characters");
    //   return;
    // }
    // setErr(null);

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("firstName", fname);
    formData.append("lastName", lname);
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);

    //dispatch thunk
    console.log("Dispatching registerUser", formData);
    dispatch(registerUser(formData));
  };

  const navigate = useNavigate();
  //redux state
  const { loading, error, registerMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (registerMessage) {
      //register succesfull-->redirect to login
      navigate("/login");
    }
  }, [registerMessage]);

  return (
    <div>
      <div className="px-lg-5" style={{ maxWidth: "500px", width: "100%" }}>
        {/* INPUTS */}
        <h3 className="fw-bold mb-4">Create an Account</h3>

        {/* Success message */}
        {registerMessage && <p className="text-success">{registerMessage}</p>}

        {/* Error message */}
        {error && <p className="text-danger">{error}</p>}

        {/* Photo Upload */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Profile Photo</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        {/* Name Inputs */}
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label fw-semibold">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="mb-3 col-md-6">
            <label className="form-label fw-semibold">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
        </div>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="choose a username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* CLICKABLE EYE ICON */}
            <span
              className="input-group-text bg-white"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
            </span>
          </div>
        </div>

        {/* Button */}
        
        <button
          className="btn btn-primary w-100 mt-2 py-2 d-flex justify-content-center align-items-center"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>

        {/* Footer */}
        <p className="mt-3 mb-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary fw-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
