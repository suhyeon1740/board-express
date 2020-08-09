const express = require("express")
const fs = require("fs")
const template = require("../template.js")
const router = express.Router()

router.get("/", (req, res, next) => {
    fs.readFile(`./data/${req.query.id}`, "utf8", (err, data) => {
        if (err) {
            next(err) // error 미들웨어 호출
        }
        const title = req.query.id
        const contents = data
        const list = template.listTemplate(req.list)
        const html = template.htmlTemplate(
            title,
            list,
            `<h2>${title}</h2><div>${contents}</div>`,
            `<a href="/update?id=${title}">update</a>
                     <a href="/delete?id=${title}">delete</a>`
        )
        res.send(html)
    })
})

router.use((err, req, res, next) => {
    res.status(500).send("no such file or directory")
})

module.exports = router
