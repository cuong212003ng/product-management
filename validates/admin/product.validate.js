const { prefixAdmin } = require("../../config/system.js");

module.exports.createPost = (req, res, next ) => {
    if (!req.body.title) {
      req.flash("error", "Vui lòng nhập tiêu đề sản phẩm!");
      res.redirect(`${prefixAdmin}/products/create`);
      return;
    }

    next();
}