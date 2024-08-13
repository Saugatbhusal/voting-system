import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


function Votingregister() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [imgPath, setImgPath] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('position', position);
        formData.append('email', email);
        if (imgPath) {
            formData.append('imgPath', imgPath);
        }

        const response = await fetch('http://localhost:3001/votingregister', {
            method: "POST", // Type of request
            body: formData,
        });

    if (response.ok){
      const result = await response.json();
       console.log("User registered successfully", result);

        // Clear form inputs
        setName("");
        setPosition("");
        setEmail("");
        setImgPath("");

        // Display pop-up message
        alert("You have been registered successfully!");
    }else{
      console.log("registration failed")
    }

  } catch(error) {
    console.error("Registration error", error)


  }




  }

  return (
    <>
    <h2 className="text-center">Enter the data</h2>
      <form onSubmit={handleSubmit}>
      
        <div className="mb-3">
          <label htmlFor="exampleInputImage" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            
            className="form-control"
            id="exampleInputImage"
            accept="image/*"
            onChange={(e) => setImgPath(e.target.files[0])}//
          />

           <label htmlFor="name" className="form-label">
           Name
          </label>
          <input
            type="string"
            className="form-control"
            value={name}
            onChange={(e)=>setName(e.target.value)}//

          />

          <label htmlFor="name" className="form-label">
           Position
          </label>
          <input
            type="string"
            className="form-control"
            value={position}
            onChange={(e)=>setPosition(e.target.value)}//
          />

          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={(e)=>setEmail(e.target.value)}

          />

          <div id="emailHelp" className="form-text">
            We'll  share your email with voters.
          </div>
        </div>

       
      
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
export default Votingregister;
