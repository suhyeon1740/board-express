const express = require("express")
const fs = require("fs")
const router = express.Router()
const connection = require("../db")

router.get("/", (req, res) => {
    connection.query(`DELETE FROM posts WHERE titles = '${req.query.id}'`, (err) => {
        if (err) throw err
        res.redirect(`/`)
    })
})

module.exports = router
