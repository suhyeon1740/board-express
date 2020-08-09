const express = require("express")
const fs = require("fs")
const template = require("../template.js")
const router = express.Router()

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
    fs.writeFile(`./data/${req.body.title}`, req.body.contents, () => {
        res.redirect(`/view?id=${req.body.title}`)
    })
})

module.exports = router