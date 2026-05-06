// import React from 'react'
// import { Col, Container, Row } from 'react-bootstrap'

// export default function AuthLayout() {
//   return (
//     <div>
//       <Container className='bg-danger'>
//         <Row>
//     <Col lg={6}>
//     <h3>Login here...</h3>
//     </Col>
//         <Col lg={6}>
//     <h3>Brand Image...</h3>
//     </Col>
//         </Row>
//         </Container>
//     {/* </div>
//   )

// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import { Outlet } from "react-router-dom";
// import PustakVerselogo from "../../assets/PustakVerselogo.png"

// export default function AuthLayout() {
//   return (
//     <div className="min-vh-100 d-flex align-items-center bg-light">
//       <Container fluid>
//         <Row className="min-vh-100">

//           {/* LEFT PANEL */}
//           <Col
//             lg={7}
//             className="d-flex flex-column justify-content-center p-5 bg-white border-end"
//             style={{ backgroundColor: '#212f3d', color: '#fcfcfc' }} // Dark blue-grey background, white text
//           >
//            <div className="px-lg-5 text-center">
//               {/* PustakVerse Logo */}
//               <img src="" alt="PustakVerse Logo" className="mb-4" style={{ height: '80px' }} /> {/* Adjust path and height as needed */}
//               <h1 className="fw-bold mb-3" style={{ color: '#f39c12' }}>PustakVerse</h1> {/* Gold color for title */}
//               <p className="text-muted mb-4" style={{ color: '#bdc3c7' }}>
//                 Your universe of stories, knowledge, and endless possibilities.
//               </p>
//             </div>
//           </Col>

//           {/* RIGHT PANEL */}
//           <Col
//             lg={5}
//             className="d-flex flex-column justify-content-center p-5 bg-white"
//           >
//             <Outlet/>
//           </Col>

//         </Row>
//       </Container>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"; // Assumed import for Container, Row, Col
import { Snowfall } from "react-snowfall";
//import logo from "../../assets/logo.png";
import tlogo from "../../assets/tlogo.png";
import bookStore from "../../assets/bookStore.png"
// Correct relative path

export default function AuthLayout() {
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container fluid>
        <Row className="min-vh-100">
          {/* LEFT PANEL */}
          <Col
            lg={7}
            className="d-flex flex-column justify-content-center p-5 border-end position-relative"
            
            style={{
              backgroundImage:`url(${bookStore})`,
              backgroundSize:'cover',
               backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            //backgroundColor: "#0d2645",
              color: "#fcfcfc",
              overflow: "hidden",
            }}
          >
            {/* Background Overlay */}
<div
  style={{
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(13, 38, 69, 0.75)", // dark blue overlay
    zIndex: 0,
  }}
/>
            {/* Snowfall ONLY for left panel */}
            <Snowfall
              color="#82C3D9"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <div className="px-lg-5 text-center" style={{ zIndex: 2 }}>
              {/*  Logo */}
              <img
                src={tlogo} // Image source is now the imported logo variable
                alt="Logo"
                className="mb-4"
                style={{ height: "80px" }}
              />
              <h1 className="fw-bold mb-3" style={{ color: "#EEB43B" }}>
                PustakVerse
              </h1>{" "}
              {/* Gold color for title */}
              <p className=" mb-4" style={{ color: "#fcfcfc" }}>
                Your universe of stories, knowledge, and endless possibilities.
              </p>
            </div>
          </Col>

          {/* RIGHT PANEL */}

          <Col
            lg={5}
            className="d-flex flex-column  justify-content-centre align-items-centre p-5 bg-white"
            style={{ textAlign: "left", height: "100vh", overflow: "hidden" }}
          >
            <div
              className="p-2 shadow-sm rounded"
              style={{
                width: "100%",

                backgroundColor: "#ffffff",
              }}
            >
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
