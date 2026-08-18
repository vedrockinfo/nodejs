const http = require("http")
const fs = require("fs")

http.createServer((req, resp) => {
    let collectHeader = fs.readFileSync("./html/include/header.html", "utf-8")
    let collectFooter = fs.readFileSync("./html/include/footer.html", "utf-8")

    let mainFile = "/index"
    if (req.url != "/") {
        mainFile = req.url;
    }

    if (req.url != "/style.css") {
        fs.readFile("./html/"+ mainFile +".html", "utf-8", (err, data) => {
            if (err) {
                resp.writeHead(500, { "Content-Type": "text/plain" })
                resp.end("Internal Server Error");
                return;
            }
            resp.writeHead(200, { "content-type": "text/html" })
            resp.write(collectHeader + "" +  data + "" + collectFooter);
            resp.end();
        })
    }
    else if (req.url == "/style.css") {
        fs.readFile("./html/asset/css/style.css", "utf-8", (err, data) => {
            if (err) {
                resp.writeHead(500, { "Content-Type": "text/plain" })
                resp.end("CSS Not Found");
                return;
            }
            resp.writeHead(200, { "content-type": "text/css" })
            resp.end(data);
        })
    }
    else {

        resp.writeHead(404, {
            "Content-Type": "text/plain"
        });

        resp.end("404 - Page Not Found");
    }
}).listen(3400)