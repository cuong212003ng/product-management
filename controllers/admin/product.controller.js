const Product = require("../../models/product.model")
// [GET] /admin/products
module.exports.product = async (req, res) => {
    // console.log(req.query.status);

    let fillterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    let find = {
        deleted: false
    }

    if(req.query.status) {
        const index = fillterStatus.findIndex(item => item.status === req.query.status)
        fillterStatus[index].class = "active"
    }else {
        const index = fillterStatus.findIndex(item => item.status === "")
        fillterStatus[index].class = "active"
    }

    if(req.query.status) {
        find.status = req.query.status
    }
    const products = await Product.find(find);
    // console.log(products);   

    res.render("admin/pages/product/index", {
        titlePage: "Danh sách sản phẩm",
        products: products,
        fillterStatus: fillterStatus
    })
}