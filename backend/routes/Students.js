const router = require('express').Router();
let Student = require('../models/Student.js');

router.route("/add").post( (req, res)=>{

    const name = req.body.name;
    const gender = req.body.gender;
    const age = Number(req.body.age);
    const address = req.body.address;
    const email = req.body.email;
    
    
//like javascript object
    const newStudent = new Student({
        name,
        gender,
        age,
        address,
        email
    })

    //javascript promises
    newStudent.save().then( ()=>{
        res.json("Student Added"); // send feedback to fronend using json format
    }).catch((err)=>{
        console.log(err);  //exception handling
    })
});

// get method use for retrive data from database
router.route("/").get( (req, res) => {

    Student.find().then((students_details)=>{
        res.json(students_details);
    }).catch((err) => {
        console.log(err);
    })
})

//when data is being updated for use PUT & POST two methods 
router.route("/update/:id").put( async(req, res)=>{

    //user can is used easily through async function and increase resposness 
    let studentId = req.params.id; //params = parameter

            //this method also correct
    // const uName = req.body.name;
    // const uGender = req.body.gender;
    // const uAge = Number(req.body.age);
    // const uAddress = req.body.address;
    // const uEmail = req.body.email;

    // D Structure new feature of javascript
    const {name, gender, age, address, email} = req.body;

    const updateStudent = {
        name,
        gender,
        age,
        address,
        email
    }

    const update = await Student.findByIdAndUpdate(studentId, updateStudent).then(()=>{
        //status code
        // 404 - not found 
        // 200 - sucess
        // 401 - unauthorized
        // 500 - Internal serverError
        res.status(200).send({status: "User Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with data updating", error: err.message});
    }) 
})
//when data is being deleted for use PUT, POST & DELETE two methods 
router.route("/delete/:id").delete( async(req, res)=>{

    let studentId = req.params.id;
    await Student.findByIdAndDelete(studentId).then(()=>{

        res.status(200).send({status: "User was deleted"});

    }).catch((err)=>{

        console.log(err);
        res.status(500).send({status: "Error with data updating", error: err.message});
    })
})

router.route("/get/:id").get(async(req, res)=>{

    let studentId = req.params.id;
    const studentdetail = await Student.findById(studentId).then((Student)=>{

        res.status(200).send({status: "User was Fetched", Student});

    }).catch((err)=>{

        console.log(err);
        res.status(500).send({status: "Error with data fetching", error: err.message});
    })
})
module.exports = router;
