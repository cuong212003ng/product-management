const Product = require("../../models/product.model")
const fillterStatusHelper = require("../../helpers/fillterstatus")
const searchKeywordHelper = require("../../helpers/searchkeyword")


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
    let keyword = ""
    const regex = searchKeywordHelper(req.query)

    if(regex) {
        find.title = regex
        keyword = req.query.keyword
    }
    


    
    const products = await Product.find(find);  

    res.render("admin/pages/product/index", {
        titlePage: "Danh sách sản phẩm",
        products: products,
        fillterStatus: fillterStatus,
        keyword: keyword
    })
}