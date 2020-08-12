const mysql = require("mysql")
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "study",
})

connection.connect()

// connection.query("SELECT * FROM posts", (err, rows, fields) => {
//     if (err) throw err
//     console.log(rows)
// })

// connection.end()

module.exports = connection
