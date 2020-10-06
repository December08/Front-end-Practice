const http = require("http");
const url = require("url");
const data = require("./data/data.json");
const fs = require("fs");
const cheerio = require("cheerio");
const path = require("path");
const mime = require("./data/mime.json");
const server = http.createServer((req, res) => {
    res.setHeader("content-type", "text/html;charset=utf-8");
    console.log(req.url);
    let urlObj = url.parse(req.url);
    console.log(urlObj);
    if (urlObj.pathname === "/" || urlObj.pathname === "/index") {
        // 文件读取；
        // let indexData =  fs.readFileSync("./views/index.html")
        // res.end(indexData);
        // 流方式；
        // 组装html；
        let str = "";
        data.forEach(v => {
            str += `<li class="news">
            <a href="${v.imgUrl}">
                <img src="${v.imgUrl}" alt="">
            </a>
            <div>
                <h3>
                    <a href="javascript:;">${v.title}</a>
                </h3>
                <div class="info">
                    <span class="tips"><span>${v.from}</span></span>
                    <!-- <span class="line"></span> -->
                    <span class="time">| &nbsp;&nbsp;${v.newTime}</span>
                </div>
            </div>
        </li>`
        });
        let indexData = fs.readFileSync("./views/index.html");
        let $ = cheerio.load(indexData);
        $(".news-list").html(str);
        res.end($.html());
    } else if (urlObj.pathname === "/detail") {
        let indexData = fs.createReadStream("./views/detail.html");
        // 不想读了文件之后又写回本地，而是直接打印在网页上让用户看到
        // 不需要writeStream了，取而代之的就是将pipe括号中的值变成res
        // 已经有值返回网页端，end值可以不需要了
        indexData.pipe(res);
    } else {
        if (urlObj.pathname !== "/favicon.ico") {
            // 获取扩展名
            let ext = path.extname(urlObj.pathname);
            console.log("扩展名",ext);
            res.setHeader("Content-Type",mime[ext]);
            let resData = fs.createReadStream("./views/css" + urlObj.pathname);
            resData.pipe(res);
        }
    }
})
server.listen(3000);