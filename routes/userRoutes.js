const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

//create
router.post("/create", (req,res) => {
    const data = req.body;//form encoded data
    let newUser = {
        ...data, 
        professionalCards: [],
        socialCards: [],
        otherCards: []
    }
    User.create(newUser, (err, createdUser) => {
        if(err){
            console.error(err);
            res.send({
                error : err.message
            });
            return;
        }
        else{
            console.log("User created");
            res.send(createdUser);
        }
    });
});

//read
router.get("/get/:uid", (req,res) => {
    const userId = req.params.uid;

    User.findById(userId, (err, foundUser) => {
        if (err) {
            console.error(err);
            res.send({
                error: err.message
            });
            return;
        }
        else if (foundUser == null){
            console.log("Empty User fetched : ", userId);
            res.send([]);
            return;
        }
        else {
            console.log("User fetched : ", userId);
            res.send(foundUser);
            return;
        }
    });
});

//update
router.put("/update", (req, res) => {
    const data = req.body;
    console.log(data);
    const userId = data.userId;
    delete data.userId;
    console.log("user found");
    // User.findOneAndUpdate({ _id: userId }, data, {
    //     new: true
    // })
    // .then((updatedUser) => {
    //     if (updatedUser == null){
    //         console.log("Empty User fetched : ", userId);
    //         res.send([]);
    //         return;
    //     }
    //     else {
    //         console.log("User fetched : ", userId);
    //         res.send(foundUser);
    //         return;
    //     }
    // })
    // .catch(err => {
    //     console.error(err);
    //     res.send({
    //         error: err.message
    //     });
    //     return;
    // })
    User.findById(userId, (err, foundUser) => {
        if (err) {
            console.error(err);
            res.send({
                error: err.message
            });
            return;
        }
        else if (foundUser == null){
            console.log("No user found : ", userId);
            res.send([]);
            return;
        }
        else {
            Object.keys(data).forEach(key => {
                foundUser[key] = data[key];
            });
            foundUser.save();
            console.log("user updated");
            res.send(foundUser);
            return;
        }
    });
    // })
});

//delete
router.delete("/delete/:uid", (req,res) => {
    const uid = req.params.uid;
    User.deleteOne({_id : uid}, err => {
        if(err){
            console.error(err);
            res.send({
                error: err.message
            });
            return;
        }
        else {
            console.log("User Deleted");
            res.send({
                status : "DELETED"
            });
            return;
        }
    })
});


module.exports = router;