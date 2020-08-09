const express = require("express")
const fs = require("fs")
const template = require("./template.js")
const compression = require("compression")
const viewRouter = require("./router/view")
const createRouter = require("./router/create")
const updateRouter = require("./router/update")
const deleteRouter = require("./router/delete")
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(compression()) //gzip 방식으로 압축
app.use(express.static("public"))

// 미들웨어: 서버가 요청을 받아들이는 것과 응답을 전송하는 것 사이에서 작동하는 코드
// 간단하게 말하면 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하려는 중간(미들)에
// 목적에 맞게 처리를 하는, 말하자면 거쳐가는 함수들
app.get("*", (req, res, next) => {
    // 모든 get방식 요청에서만 글 목록 가져옴
    fs.readdir("./data", (error, list) => {
        req.list = list
        next()
    })
})

app.get("/", (req, res) => {
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

app.use("/view", viewRouter)
app.use("/create", createRouter)
app.use("/update", updateRouter)
app.use("/delete", deleteRouter)

// 제일 마지막에 404 처리하는 미들웨어 추가
// 미들웨어는 위에서부터 순차적으로 실행되니 이 미들웨어 도달했다는건 찾은게 없는거이기 때문
app.use((req, res) => {
    // 미들웨어
    res.status(404).send(`Page not found`)
})

app.use((err, req, res, next) => {
    res.status(500).send("no such file or directory")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
