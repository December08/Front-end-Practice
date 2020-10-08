const http = require("http");
const url = require("url");
const data = require("./data/data.json");
const fs = require("fs");
const cheerio = require("cheerio");
const path = require("path");
const mime = require("./data/mime.json");
const { parse } = require("path");
const server = http.createServer((req, res) => {
    res.setHeader("content-type", "text/html;charset=utf-8");
    let urlObj = url.parse(req.url, true);
    if (urlObj.pathname === "/" || urlObj.pathname === "/index") {
        // 文件读取；
        // let indexData =  fs.readFileSync("./views/index.html")
        // res.end(indexData);
        // 流方式；
        // 组装html；
        // 规定每页数据个数，计算数据页数
        let p = parseInt(urlObj.query.p) || 1;
        let perPage = 5;
        let newData = JSON.parse(JSON.stringify(data)).splice((p - 1) * perPage, perPage);
        let pageCount = Math.ceil(data.length / perPage);
        console.log(pageCount);
        let str = "";
        newData.forEach(v => {
            str += `<li class="news">
            <a href="${v.imgUrl}">
                <img src="${v.imgUrl}" alt="">
            </a>
            <div>
                <h3>
                    <a href="/detail?id=${v.id}">${v.title}</a>
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

        // 组装分页
        let pageHtml = `<a href="/index?p=${p <= 1 ? 1 : (p - 1)}" class="prev">⌜</a>`;
        for (let i = 1; i <= pageCount; i++) {
            pageHtml += `<a href="/index?p=${i}">${i}</a>`;
        }
        pageHtml += `<a href="/index?p=${p >= pageCount ? pageCount : (p + 1)}" class="next">⌝</a>`;
        $(".pagination").html(pageHtml);
        res.end($.html());
    } else if (urlObj.pathname === "/detail") {
        let id = parseInt(urlObj.query.id) || 1;
        let detailData = JSON.parse(JSON.stringify(data)).filter(v=>v.id === id)[0];
        let indexData = fs.readFileSync("./views/detail.html");
        let $ = cheerio.load(indexData);
        
        let str = 
        `<h1 class="title">${detailData.title}</h1>
        <div class="article-info"> ${detailData.from} 时间：${detailData.newTime}</div>
        <p class="content">
            ${detailData.title}
        </p>`;
        $(".text").html(str);
        res.end($.html());
    } else {
        if (urlObj.pathname !== "/favicon.ico") {
            // 获取扩展名
            let ext = path.extname(urlObj.pathname);
            res.setHeader("Content-Type", mime[ext]);
            let resData = fs.createReadStream("./views/css" + urlObj.pathname);
            resData.pipe(res);
        }
    }
})
server.listen(3000);