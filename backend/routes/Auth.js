const express = require('express')
const router = express.Router()
const db = require('../database.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// GET ALL from Users
router.get("/", (req,res) => {
    const q = "SELECT * FROM Users"
    db.query(q, (err, result) => {
        if (err) return res.status(400).json(err)
        return res.json(result);
    })
})

// REGISTER 
router.post("/register", (req,res) => {
    const {username, password} = req.body;
    // Check if username exists
    const q = "SELECT * FROM Users WHERE username = ?"
    db.query(q, [username], (err,result) => {
        if (err) return res.status(400).json(err)
        if (result.length) return res.status(409).json("Username already exists!")

        // Hash the password and create User
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Add user to database
        const q = "INSERT INTO `Users` (`username`, `password`) VALUES (?, ?)"
        db.query(q, [username, hash], (err,result) => {
            if (err) return res.status(400).json(err)
            return res.status(200).json("Registered Successfully! You can login now");
        })
    })
})

// LOGIN
router.post("/login", (req,res) => {
    const {username, password} = req.body;

    // Check if username exists
    const q = "SELECT * FROM Users WHERE username = ?"
    db.query(q, [username], (err,result) => {
        if (err) return res.status(400).json(err)
        if (result.length == 0) return res.status(404).json("User not found!!")
        
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, result[0].password);
        
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!!")
            
        const token = jwt.sign({id: result[0].id}, process.env.JWTKEY)
        const {password, ...other} = result[0]
    
        res.cookie("access_token", token,{
            httpOnly: true,
        }).status(200).json(other)
        // return res.status(200).json("Login successfully")
    })
})

router.post("/logout", (req,res) => {
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out.")
})

module.exports = router;