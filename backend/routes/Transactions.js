const express = require('express')
const router = express.Router()
const db = require('../database.js')

// GET ALL from Transactions Associated with User
router.get("/:uid", (req,res) => {
    const {uid} = req.params;
    const q = "SELECT * FROM Transactions WHERE uid = ?"
    db.query(q, [uid], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})

// ADD Transactions 
router.post("/add", (req,res) => {
    const {date, person, amount, desc, uid} = req.body;
    const q = "INSERT INTO Transactions(`date`, `person`, `amount`, `desc`, `uid`) VALUES (?,?,?,?,?)"
    db.query(q, [date, person, amount, desc, uid], (err,result) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json("Transaction added successfully!")
    })
})

// DELETE Transactions
router.delete("/delete/:id", (req,res) => {
    const {id} = req.params;
    const q = "DELETE FROM Transactions WHERE (`id` = ?)"
    db.query(q, [id], (err,result) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json("Transaction deleted successfully!")
    })
})

// Get Overview
router.get("/overview/:uid", (req,res) => {
    const {uid} = req.params;
    const q = "SELECT person, SUM(amount) as amount FROM Transactions WHERE uid = ? GROUP BY person"
    db.query(q, [uid], (err,result) => {
        if (err) return res.status(400).json(err)
        return res.status(200).json(result)
    })
})

module.exports = router;