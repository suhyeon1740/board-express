const express = require("express")
const compression = require("compression")
const router = require("./router")
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(compression()) //gzip 방식으로 압축
app.use(express.static("public"))

// 미들웨어: 서버가 요청을 받아들이는 것과 응답을 전송하는 것 사이에서 작동하는 코드
// 간단하게 말하면 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하려는 중간(미들)에
// 목적에 맞게 처리를 하는, 말하자면 거쳐가는 함수들

app.use("/", router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
