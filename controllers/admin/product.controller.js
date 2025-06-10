const Product = require("../../models/product.model")
const fillterStatusHelper = require("../../helpers/fillterstatus")
const searchKeywordHelper = require("../../helpers/searchkeyword")
const paginationHelper = require("../../helpers/pagination")

// [GET] /admin/products
module.exports.product = async (req, res) => {
    // console.log(req.query.status);

    //Đoạn bộ lọc
    const fillterStatus = fillterStatusHelper(req.query)

    let find = {
        deleted: false
    }
    
    if(req.query.status) {
        find.status = req.query.status
    }

    //Đoạn tìm kiếm
    const objectSearch = searchKeywordHelper(req.query)

    if(objectSearch.regex) {
        find.title = objectSearch.regex
    }

    // Đoạn Phân Trang Paginatiom
    const countProduct = await Product.countDocuments(find)

    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 5
        },
        req.query,
        countProduct
    )

    //End Đoạn Phân Trang Paginatiom
    const products = await Product.find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);  

    res.render("admin/pages/product/index", {
        titlePage: "Danh sách sản phẩm",
        products: products,
        fillterStatus: fillterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}
// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    console.log(req.params);
    const {status, id} = req.params
    
    await Product.updateOne({_id: id}, {status: status})

    res.redirect(req.headers.referer || "/admin/products")  //req.headers.referer là url của trang trước đó
                                                            //Neu trang wed truoc do khong co thi chuyen den trang admin/products
}
