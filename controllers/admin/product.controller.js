const Product = require("../../models/product.model");
const fillterStatusHelper = require("../../helpers/fillterstatus");
const searchKeywordHelper = require("../../helpers/searchkeyword");
const paginationHelper = require("../../helpers/pagination");

const { prefixAdmin } = require("../../config/system.js");

// [GET] /admin/products
module.exports.product = async (req, res) => {
  // console.log(req.query.status);

  //Đoạn bộ lọc
  const fillterStatus = fillterStatusHelper(req.query);

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  //Đoạn tìm kiếm
  const objectSearch = searchKeywordHelper(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // Đoạn Phân Trang Paginatiom
  const countProduct = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 5,
    },
    req.query,
    countProduct
  );

  //End Đoạn Phân Trang Paginatiom
  const products = await Product.find(find)
    .sort({ position: "desc" }) //Sắp xếp theo vị trí 
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/product/index", {
    titlePage: "Danh sách sản phẩm",
    products: products,
    fillterStatus: fillterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
};
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  // console.log(req.params);
  const { status, id } = req.params;

  await Product.updateOne({ _id: id }, { status: status });

  req.flash("success", "Cập nhật trạng thái sản phẩm thành công");

  res.redirect(req.headers.referer || `${prefixAdmin}/products`); //req.headers.referer là url của trang trước đó
  //Neu trang wed truoc do khong co thi chuyen den trang admin/products
};
// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
      break;      
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      req.flash("success", `Đã xóa ${ids.length} sản phẩm thành công`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      break;
    default:
      break;
  }

  res.redirect(req.headers.referer || `${prefixAdmin}/products`);
};
// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  // console.log(req.params);
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(), //Ghi la ngày xóa sản phẩm
    }
  ); //Xóa sản phẩm bằng cách đánh dấu deleted là true

  req.flash("success", `Xóa sản phẩm thành công`);
  res.redirect(req.headers.referer || `${prefixAdmin}/products`); //req.headers.referer là url của trang trước đó
  //Neu trang wed truoc do khong co thi chuyen den trang admin/products
};
// [GET] /admin/products/create
module.exports.createGET = async (req, res) => {
  res.render("admin/pages/product/create", {
    titlePage: "Thêm sản phẩm mới",
  });
};
// [POST] /admin/products/create
module.exports.createPOST = async (req, res) => {
  try {
    // Kiểm tra req.body
    if (!req.body) {
      req.flash("error", "Không nhận được dữ liệu sản phẩm!");
      return res.redirect(`${prefixAdmin}/products`);
    }

    // Xử lý dữ liệu đầu vào an toàn
    const productData = {
      title: req.body.title,
      description: req.body.description,
      price: parseInt(req.body.price) || 0,
      discountPercentage: parseInt(req.body.discountPercentage) || 0,
      stock: parseInt(req.body.stock) || 0,
      rating: parseFloat(req.body.rating) || 0,
      category: req.body.category || "other",
      status: req.body.status || "active",
      deleted: false,
    };

    // Xử lý vị trí
    if (!req.body.position || req.body.position === "") {
      const countProduct = await Product.countDocuments();
      productData.position = countProduct + 1;
    } else {
      productData.position = parseInt(req.body.position);
    }

    // Xử lý thumbnail nếu có
    if (req.file) {
      productData.thumbnail = `/uploads/${req.file.filename}`;
    }

    console.log("Dữ liệu sản phẩm đã xử lý:", productData);

    // Tạo sản phẩm mới
    const newProduct = new Product(productData);
    await newProduct.save();

    req.flash("success", "Thêm sản phẩm mới thành công!");
    res.redirect(`${prefixAdmin}/products`);
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    req.flash("error", "Có lỗi xảy ra khi tạo sản phẩm!");
    return res.redirect(`${prefixAdmin}/products`);
  }
};
