const adminModel = require("../../service/admin");
module.exports = {
    async index(ctx) {
        await ctx.render("./admin/admin.pug");
    },
    async addNews(ctx) {
        await ctx.render("./admin/addNews.pug");
    },
    async newsList(ctx) {
        await ctx.render("./admin/newsList.pug");
    },
    async addData(ctx) {
        let res = await adminModel.addData(ctx.request);
        console.log(res);
        let info;
        if (res.affectedRows > 0) {
            info = {
                info: "操作成功",
                status: 1
            }
        } else {
            info = {
                info: "操作失败",
                status: 0
            }
        }
        ctx.body = info;
    }
}