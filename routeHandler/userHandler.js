const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const userSchema = require('../schemas/userSchema');
const User = mongoose.model("User", userSchema);


// Create user
router.post('/signup', async function(req, res) {
    try{
        hasPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: hasPassword
        });

        await newUser.save();
        res.status(200).json({
            message: "Signup was successful!",
        });
        } catch{
            res.status(500).json({
                message: "Signup failed!",
        });
    }
});


router.post('/login', async function(req, res){
    try{
        const user = await User.find({username:req.body.username});
        console.log(user);
        if(user && user.length > 0){
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if(isValidPassword){
                const token= JWT.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, process.env.JWT_SECRET,{
                    expiresIn: '5h'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "Login successful!"
                });
            } else {
                res.status(401).json({
                    "error": "Authetication failed!"
                });
            }
        }
    } catch{
        res.status(401).json({
            "error": "Authetication failed!"
        });
    }
});

module.exports =router; 