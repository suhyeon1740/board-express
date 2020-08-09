const express = require("express")
const fs = require("fs")
const template = require("./template.js")
const compression = require("compression")
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(compression()) //gzip 방식으로 압축
app.use(express.static("public"))

// 미들웨어: 서버가 요청을 받아들이는 것과 응답을 전송하는 것 사이에서 작동하는 코드
// 간단하게 말하면 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하려는 중간(미들)에 
// 목적에 맞게 처리를 하는, 말하자면 거쳐가는 함수들
app.get('*', (req, res, next) => { // 모든 get방식 요청에서만 글 목록 가져옴
    fs.readdir("./data", (error, list) => {
        req.list = list
        next()
    })
})

app.get("/", (req, res) => {
    if (!req.query.id) {
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
    } else {
        fs.readFile(`./data/${req.query.id}`, "utf8", (err, data) => {
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
    }
})

app.get("/create", (req, res) => {
    const list = template.listTemplate(req.list)
    const html = template.htmlTemplate(
        "create",
        list,
        `<form action="/create_file" method="post">
                <div><input type="text" placeholder="title" name="title" /></div>
                <div><textarea placeholder="contents" name="contents"></textarea></div>
                <input type="submit" />
            </form>`
    )
    res.send(html)
})

app.post("/create_file", (req, res) => {
    fs.writeFile(`./data/${req.body.title}`, req.body.contents, () => {
        res.redirect(`/?id=${req.body.title}`)
    })
})

app.get("/update", (req, res) => {
    const title = req.query.id
    fs.readFile(`./data/${title}`, "utf8", (err, data) => {
        const list = template.listTemplate(req.list)
        const html = template.htmlTemplate(
            "update",
            list,
            `<form action="/update_file" method="post">
                <div><input type="text" placeholder="title" name="title" value="${title}"/></div>
                <div><textarea placeholder="contents" name="contents">${data}</textarea></div>
                <input type="submit" />
            </form>`
        )
        res.send(html)
    })
})

app.post("/update_file", (req, res) => {
    fs.writeFile(`./data/${req.body.title}`, req.body.contents, () => {
        res.redirect(`/?id=${req.body.title}`)
    })
})

app.get("/delete", (req, res) => {
    fs.unlink(`data/${req.query.id}`, function (error) {
        res.redirect(`/`)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
