import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Signup'
import Login from './Login';
import Home from './Home'
import Voting from './Voting';
import Votingregister from './Votingregister';
import Result from './Result'

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
      <Route path="/result" element={<Result />}></Route>
      <Route path='/votingregister' element={<Votingregister/>}></Route>
      <Route path='/voting' element={<Voting/>}></Route>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
