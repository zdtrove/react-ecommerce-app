const Product = require('../models/product.model')
const slugify = require('slugify')

exports.createProduct = (req, res) => {
    const {
        name, price, description, quantity, productPictures, category
    } = req.body

    const product = new Product({
        name,
        slug: slugify(name),
        price,
        description,
        quantity,
        productPictures,
        category,
        createdBy: req.user._id
    })

    product.save((err, product) => {
        if (err) return res.status(400).json({ err })
        if (product) {
            res.status(201).json({ product })
        }
    })
}