const express = require("express");
const mongoose = require("mongoose");
const User = require('../models/Employee'); // Ensure the path is correct
const sas = require('../models/userModel')
const multer = require("multer");
const Vote = require ('../models/Votecasting')

const router = express.Router();

router.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the folder to store the uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid name conflicts
    }
  });
  
  const upload = multer({ storage: storage });
  


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.status(401).json("The password is incorrect");
            }
        } else {
            res.status(404).json("No record exists");
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

router.post('/votingregister', upload.single('imgPath'), async (req, res) =>{
try{

    const { name, position, email } = req.body;
    const imgPath = req.file ? req.file.path : null; // Get the path of the uploaded file
    // if (imgPath) {
    //   imgPath = imgPath.replace(/\\/g, '/'); // Replace backslashes with forward slashes(this was the reason why image was not rendering for a long time)
    // }
    const userAdded = await  sas.create(
        {
            name:name,
            position:position,
            email:email,
            imgPath:imgPath // name msitake


        }
    )

    res.status(201).json(userAdded)
}catch(error){
  console.error("Registration error:", error); // Log the error for debugging 
    res.status(501).json({error: error.message})
}

   
})



router.get('/voting', async(req,res) => {
try{
    const showAll = await sas.find()
    res.status(201).json(showAll)


}
catch(error){
    console.log(error)
    res.status(500).json({error:err.message})

}

})

router.post('/votecasted',async(req,res)=>{
    try{ 
        const{id}= req.body;
        if(!id){
            return res.status(400).json({error:'candidateId is required'});
        }
    const voteAdded = await Vote.create({
        candidateId:id
 
    }) 
    res.status(201).json(voteAdded)
 }catch(error){
    res.status(500).json({error:error.message})

 }
    

}

)


// needs to learn 

router.get('/vote-counts', async (req, res) => {
    try {
      const voteCounts = await Vote.aggregate([
        {
          $group: {
            _id: "$candidateId",
            count: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "candidateDetails"
          }
        },
        {
          $unwind: "$candidateDetails"
        },
        {
          $project: {
            _id: 1,
            count: 1,
            name: "$candidateDetails.name",
            position: "$candidateDetails.position"
          }
        }
      ]);
      res.json(voteCounts);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
module.exports = router;
