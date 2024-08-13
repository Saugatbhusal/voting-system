import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function Voting() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:3001/voting", {
      method: "GET", //you do not need to specify the get GET method beacusedefault method is GET
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setData(result);
      console.log(data);
      //
      

      
    }// i was here
  };

  const handleVote = async(id)=>{
    try{
    
   axios.post("http://localhost:3001/votecasted",{ id

   })
   
   .then(res => {                                                              //res means result
    console.log('Response:', res.data);                                     // Log the response data
    if(res.data === "Success"){
      navigate('/home');
    }
    
  })
}catch(err)  {
    console.error('Error:', err); // Log the error
  };
   
    
  }

  useEffect(()=>{
    getData();

  },[])

  return (
    <>
    <h2 className="text-center">All data</h2>

    <div className="row">  
    {data.map((ele)=>(
      <div key={ele._id} className="col-3 mb-10">
      <div className="card" style={{ width: "18rem" }}>
      
      <img src={`http://localhost:3001/${ele.imgPath}`}  className="card-img-top" alt="profile pic" />
      

      <div className="card-body">
        <p className="card-title">Name:{ele.name}</p>
        <p className="card-text">
          Position:{ele.position}
        </p>
        <p className="card-title">Email:{ele.email}</p>
      </div>
      
      <div className="card-body">
      <button type="button" onClick={()=>handleVote(ele._id)} className="btn btn-success">Vote</button>
      </div>
    </div>
    </div>
    ))}
      
      </div>

    </>
  );
}
export default Voting;
