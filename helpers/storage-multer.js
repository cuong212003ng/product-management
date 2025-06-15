//Hàm storage để lưu file vào thư mục uploads
const multer = require('multer')     
module.exports = () =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/uploads')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now()
          cb(null, `${uniqueSuffix} - ${file.originalname}`)
        }
    }) 

    return storage
}