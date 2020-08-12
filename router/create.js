const express = require("express")
const fs = require("fs")
const template = require("../template.js")
const router = express.Router()
const connection = require("../db")

router.get("/", (req, res) => {
    const list = template.listTemplate(req.list)
    const html = template.htmlTemplate(
        "create",
        list,
        `<form action="/create/file" method="post">
                <div><input type="text" placeholder="title" name="title" /></div>
                <div><textarea placeholder="contents" name="contents"></textarea></div>
                <input type="submit" />
            </form>`
    )
    res.send(html)
})

router.post("/file", (req, res) => {
    connection.query(
        `INSERT INTO posts(title, contents) VALUES('${req.body.title}', '${req.body.contents}')`,
        (err, rows) => {
            if (err) throw err
            res.redirect(`/view?id=${req.body.title}`)
        }
    )
})

module.exports = router
