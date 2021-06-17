import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../redux/actions'

const MenuHeader = () => {
    const { category } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategory())
    }, [dispatch])

    const renderCategories = categories => {
        let categoryList = []
        categories && categories.forEach((cat, index) => {
            categoryList.push(
                <li key={index}>
                    {
                        cat.parentId
                            ? <a href={cat.slug}>{cat.name}</a>
                            : <span>{cat.name}</span>
                    }
                    {cat.children.length > 0 ? (
                        <ul>
                            {renderCategories(cat.children)}
                        </ul>
                    ) : null}
                </li>
            )
        })
        return categoryList
    }

    return (
        <div className="menu-client">
            <ul>
                {category.categories.length > 0 ? renderCategories(category.categories) : null}
            </ul>
        </div>
    )
}

export default MenuHeader
