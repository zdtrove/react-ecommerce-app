const Category = require('../models/categoryModel')
const slugify = require('slugify')

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify.default(req.body.name)
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }

    const cat = new Category(categoryObj)
    cat.save((err, category) => {
        if (err) return res.status(400).json({ err })
        if (category) {
            return res.status(201).json({ category })
        }
    })
}

exports.getCategories = (req, res) => {
    Category.find({})
        .exec((err, categories) => {
            if (err) return res.status(400).json({ err })
            if (categories) {
                res.status(200).json({ categories })
            }
        })
}