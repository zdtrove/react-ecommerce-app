const linearCategories = (categories, options = []) => {
    categories && categories.forEach(cat => {
        options.push({
            value: cat._id,
            name: cat.name,
            parentId: cat.parentId,
            type: cat.type
        })
        if (cat.children && cat.children.length > 0) {
            linearCategories(cat.children, options)
        }
    })

    return options
}

export default linearCategories