const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,  // product title
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    position: Number,
    slug: { // Slug field for SEO-friendly URLs
        type: String,
        slug: 'title', // Automatically generate slug from title
        unique: true,
        slug_padding_size: 2 // Ensures that slugs are unique by padding with numbers
    },
    deletedAt: Date
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
})

const Product = mongoose.model('Product', productSchema, 'products')
module.exports = Product