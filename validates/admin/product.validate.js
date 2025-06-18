const { prefixAdmin } = require("../../config/system.js");

module.exports.createPOST = (req, res, next ) => {
    if (!req.body.title) {
      req.flash("error", "Vui lòng nhập tiêu đề sản phẩm!");
      res.redirect(`${prefixAdmin}/products/create`);
      return;
    }

    next();
}

module.exports.editPATCH = (req, res, next ) => {
  if (!req.body.title) {
    req.flash("error", "Vui lòng nhập tiêu đề sản phẩm!");
    res.redirect(`${prefixAdmin}/products/edit/${req.params.id}`);
    return;
  }

  next();
}