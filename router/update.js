const express = require("express")
const fs = require("fs")
const template = require("../template.js")
const router = express.Router()
const connection = require("../db")

router.get("/", (req, res) => {
    const title = req.query.id
    connection.query(`SELECT * FROM posts WHERE title = '${title}'`, (err, rows) => {
        const list = template.listTemplate(req.list)
        const html = template.htmlTemplate(
            "update",
            list,
            `<form action="/update/file" method="post">
                <div><input type="text" placeholder="title" name="title" value="${title}"/></div>
                <div><textarea placeholder="contents" name="contents">${rows[0].contents}</textarea></div>
                <input type="submit" />
            </form>`
        )
        res.send(html)
    })
})

router.post("/file", (req, res) => {
    connection.query(`UPDATE posts SET contents = '${req.body.contents}'`, (err) => {
        if (err) throw err
        res.redirect(`/view?id=${req.body.title}`)
    })
})

module.exports = router
