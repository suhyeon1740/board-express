const express = require("express")
const fs = require("fs")
const template = require("../template.js")
const router = express.Router()

router.get("/", (req, res) => {
    const title = req.query.id
    fs.readFile(`./data/${title}`, "utf8", (err, data) => {
        const list = template.listTemplate(req.list)
        const html = template.htmlTemplate(
            "update",
            list,
            `<form action="/update/file" method="post">
                <div><input type="text" placeholder="title" name="title" value="${title}"/></div>
                <div><textarea placeholder="contents" name="contents">${data}</textarea></div>
                <input type="submit" />
            </form>`
        )
        res.send(html)
    })
})

router.post("/file", (req, res) => {
    fs.writeFile(`./data/${req.body.title}`, req.body.contents, () => {
        res.redirect(`/view?id=${req.body.title}`)
    })
})

module.exports = router