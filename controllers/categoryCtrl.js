const Category = require('../models/categoryModel')
const slugify = require('slugify')

function createCategories(categories, parentId = null) {
    const categoryList = []
    let category
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate.id,
            name: cate._name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        })
    }

    return categoryList
}

exports.addCategory = (req, res) => {
    try {
        const categoryObj = {
            name: req.body.name,
            slug: slugify.default(req.body.name),
            categoryImage: req.body.categoryImage
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
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
}

exports.getCategories = (req, res) => {
    Category.find({})
        .exec((err, categories) => {
            if (err) return res.status(400).json({ err })
            if (categories) {
                const categoryList = createCategories(categories)
                res.status(200).json({ categoryList })
            }
        })
}