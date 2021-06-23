const Product = require('../models/product.model')
const slugify = require('slugify')
const Category = require('../models/category.model')

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

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params
    Category.findOne({ slug })
        .select('_id')
        .exec((err, category) => {
            if (err) return res.status(400).json({ err })

            if (category) {
                Product.find({ category: category._id })
                    .exec((err, products) => {
                        if (err) return res.status(400).json({ err })

                        if (products.length > 0) {
                            res.status(200).json({
                                products,
                                productsByPrice: {
                                    under5k: products.filter(product => product.price <= 5000),
                                    uder10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                                    uder15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                                    uder20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                                    uder30k: products.filter(product => product.price > 20000 && product.price <= 30000)
                                }
                            })
                        }
                    })
            }
        })
}

exports.getProductDetailById = (req, res) => {
    const { productId } = req.params
    if (productId) {
        Product.findOne({ _id: productId })
            .exec((err, product) => {
                if (err) return res.status(400).json({ err })
                if (product) {
                    res.status(200).json({ product })
                }
            })
    } else {
        return res.status(400).json({ error: 'Params required' })
    }
}