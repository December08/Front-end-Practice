const Router = require("koa-router");
const adminRouter = require("../controller/admin");
const admin = require("../service/admin");
const router = new Router({
    prefix: "/admin"
});
router.get("/", ctx => { ctx.redirect("/admin/index") });
router.get("/index", adminRouter.index);
router.get("/addNews", adminRouter.addNews);
router.get("/newsList", adminRouter.newsList);
router.post("/addData", adminRouter.addData);
module.exports = router;