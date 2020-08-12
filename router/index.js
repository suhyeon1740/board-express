const express = require("express")
const fs = require("fs")
const router = express.Router()
const template = require("../template.js")
const viewRouter = require("./view")
const createRouter = require("./create")
const updateRouter = require("./update")
const deleteRouter = require("./delete")
const connection = require("../db")

router.get("*", (req, res, next) => {
    // 모든 get방식 요청에서만 글 목록 가져옴    
    connection.query("SELECT title FROM posts", (err, rows) => {
        if (err) throw err
        req.list = rows
        next()
    })
})

router.get("/", (req, res) => {
    const title = "Welcome"
    const list = template.listTemplate(req.list)
    const contents = "Hello, Node.js"
    const html = template.htmlTemplate(
        title,
        list,
        `<h2>${title}</h2><div>${contents}</div><img src="/images/hello.jpg" width="200">`,
        `<a href="/create"> create</a>`
    )
    res.send(html)
})

router.use("/view", viewRouter)
router.use("/create", createRouter)
router.use("/update", updateRouter)
router.use("/delete", deleteRouter)

// 제일 마지막에 404 처리하는 미들웨어 추가
// 미들웨어는 위에서부터 순차적으로 실행되니 이 미들웨어 도달했다는건 찾은게 없는거이기 때문
router.use((req, res) => {
    // 미들웨어
    res.status(404).send(`Page not found`)
})

module.exports = router
