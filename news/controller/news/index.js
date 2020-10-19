const newsModel = require("../../service/news");
module.exports = {
    async index(ctx) {
        let p = ctx.query.p || 1;
        let perPage = 5;
        let newsData = await newsModel.getData(p, perPage);
        let TotalCount = await newsModel.getTotalCount();
        let pCount = Math.ceil(TotalCount / perPage);
        console.log(pCount);
        // 在app.js中views已经给定了确切的views文件夹的路径，所以这里只需要相对于views
        await ctx.render("./news/index.pug",{
            newsData,
            pCount
        });
    },
    async detail(ctx){
        await ctx.render("./news/detail.pug");
    }
}