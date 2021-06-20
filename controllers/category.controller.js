const Category = require('../models/category.model')
const slugify = require('slugify')
const shortid = require('shortid')

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
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id)
        })
    }

    return categoryList
}

exports.addCategory = (req, res) => {
    try {
        const categoryObj = {
            name: req.body.name,
            slug: `${slugify(req.body.name)}-${shortid.generate()}`,
            categoryImage: req.body.categoryImage
        }

        if (req.body.parentId) {
            categoryObj.parentId = req.body.parentId
        }

        const cat = new Category(categoryObj)
        cat.save((err, category) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ err })
            }
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

exports.updateCategories = async (req, res) => {
    const { _id, name, parentId, type } = req.body
    const updatedCategories = []
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            }
            if (parentId[i] !== "") {
                category.parentId = parentId[i]
            }

            const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true })
            updatedCategories.push(updatedCategory)
        }
        return res.status(201).json({ updatedCategories })
    } else {
        const category = {
            name, type
        }
        if (parentId !== "") {
            category.parentId = parentId
        }
        const updatedCategory = await Category.findOneAndUpdate({ _id }, category, { new: true })

        return res.status(201).json({ updatedCategory })
    }
}

exports.deleteCategories = async (req, res) => {
    const { ids } = req.body
    const deletedCategories = []
    for (let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id })
        deletedCategories.push(deleteCategory)
    }
    if (deletedCategories.length == ids.length) {
        res.status(200).json({ msg: 'Categories removed' })
    } else {
        res.status(400).json({ msg: 'Something went wrong' })
    }
}