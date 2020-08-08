exports.htmlTemplate = (title, list, body, control='') => {
    return `<!doctype html>
                <html>
                <head>
                <title>board - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                ${control}
                ${body}            
                </body>
                </html>`
}

exports.listTemplate = (fileList) => {
    return `<ul>${fileList.map(
        (item) => `<li><a href=/?id=${item}>${item}</a></li>`
    ).join('')}</ul>`
}
