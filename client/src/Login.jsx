import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 


function Login() {
const[name , setName]= useState('')
const[email , setEmail]= useState('')
const[password , setPassword]= useState('')

const navigate = useNavigate();



const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:3001/login', {  email, password })
    .then(res => {                                                              //res means result
      console.log('Response:', res.data);                                     // Log the response data
      if(res.data === "Success"){
        navigate('/home');
      }
      
    })
    .catch(err => {
      console.error('Error:', err); // Log the error
    });
}


  return (
    <section
      className="vh-100 bg-image"
      style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Login</h2>

                  <form onSubmit={handleSubmit}>
                    {/* <div className="form-outline mb-4">
                      <input type="text" id="form3Example1cg" value={name} onChange={(e)=> setName(e.target.value)} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                    </div> */}

                    <div className="form-outline mb-4">
                      <input type="email" id="form3Example3cg" onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" required />
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" id="form3Example4cg" onChange={(e) => setPassword (e.target.value)} className="form-control form-control-lg" required/>
                      <label className="form-label" htmlFor="form3Example4cg">Password</label>
                    </div>

                  

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                      <label className="form-check-label" htmlFor="form2Example3cg">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                    </div>

                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
