const express = require("express")
const fs = require("fs")
const template = require("./template.js")
const app = express()
const port = 3000

app.get("/", (req, res) => {
    if (!req.query.id) {
        fs.readdir("./data", (error, fileList) => {
            const title = "Welcome"
            const list = template.listTemplate(fileList)
            const contents = "Hello, Node.js"
            const html = template.htmlTemplate(
                title,
                list,
                `<h2>${title}</h2><div>${contents}</div>`,
                `<a href="/create"> create</a>`
            )
            res.send(html)
        })
    } else {
        fs.readdir("./data", (error, fileList) => {
            fs.readFile(`./data/${req.query.id}`, "utf8", (err, data) => {
                const title = req.query.id
                const contents = data
                const list = template.listTemplate(fileList)
                const html = template.htmlTemplate(
                    title,
                    list,
                    `<h2>${title}</h2><div>${contents}</div>`
                )
                res.send(html)
            })
        })
    }
})

app.get("/create", (req, res) => {
    fs.readdir("./data", (error, fileList) => {
        const list = template.listTemplate(fileList)
        const html = template.htmlTemplate(
            "create",
            list,
            `<form action="create_file">
                <div><input type="text" placeholder="title" /></div>
                <div><textarea placeholder="content"></textarea></div>
                <input type="submit" />
            </form>`
        )
        res.send(html)
    })
})

app.get("/create_file", (req, res) => {
    fs.writeFile("./data", req.params.contents, () => {
        //redirection
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
