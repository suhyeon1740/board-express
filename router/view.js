const express = require("express")
const fs = require("fs")
const template = require("../template.js")
const router = express.Router()
const connection = require("../db")

router.get("/", (req, res, next) => {
    connection.query(`SELECT * FROM posts WHERE number = '${req.query.number}'`, (err, rows) => {
        if (err) {
            next(err) // error 미들웨어 호출
        }
        const list = template.listTemplate(req.list)
        const number = rows[0].number
        const title = rows[0].title
        const contents = rows[0].contents
        const html = template.htmlTemplate(
            title,
            list,
            `<h2>${title}</h2><div>${contents}</div>`,
            `<a href="/update?number=${number}">update</a>
                     <a href="/delete?number=${number}">delete</a>`
        )
        res.send(html)
    })
})

router.use((err, req, res, next) => {
    res.status(500).send("no such file or directory")
})

module.exports = router
