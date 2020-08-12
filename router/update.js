const express = require("express")
const fs = require("fs")
const template = require("../template.js")
const router = express.Router()
const connection = require("../db")

router.get("/", (req, res) => {
    const number = req.query.number
    connection.query(`SELECT * FROM posts WHERE number = '${number}'`, (err, rows) => {
        const list = template.listTemplate(req.list)
        const html = template.htmlTemplate(
            "update",
            list,
            `<form action="/update/file" method="post">
                <input type="hidden" name="number" value="${number}"/>
                <div><input type="text" placeholder="title" name="title" value="${rows[0].title}"/></div>
                <div><textarea placeholder="contents" name="contents">${rows[0].contents}</textarea></div>
                <input type="submit" />
            </form>`
        )
        res.send(html)
    })
})

router.post("/file", (req, res) => {
    connection.query(
        `UPDATE posts SET contents = '${req.body.contents}' WHERE number='${req.body.number}'`,
        (err) => {
            if (err) throw err
            res.redirect(`/view?number=${req.body.number}`)
        }
    )
})

module.exports = router
