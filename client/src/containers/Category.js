import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../components/Layout'
import { addCategory } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../components/common/Input'
import Modal from '../components/common/Modal'

const Category = () => {
    const { category } = useSelector(state => state)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')

    const renderCategories = categories => {
        let categoryList = []
        categories && categories.forEach((cat, index) => {
            categoryList.push(
                <li key={index}>
                    {cat.name}
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

    const createCategoryList = (categories, options = []) => {
        categories && categories.forEach(cat => {
            options.push({ value: cat._id, name: cat.name })
            if (cat.children.length > 0) {
                createCategoryList(cat.children, options)
            }
        })

        return options
    }

    const handleCategoryImage = e => {
        setCategoryImage(e.target.files[0])
    }

    const handleSubmit = () => {
        setShow(false)
        dispatch(addCategory({
            name: categoryName,
            parentId: parentCategoryId,
            categoryImage: "https://res.cloudinary.com/dj7zmqrth/image/upload/v1621245029/social-media-app/awcnvz4mxeeyn51agzhv.jpg"
        }))
        setCategoryName('')
        setParentCategoryId('')
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={() => setShow(true)}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderCategories(category.categories)}
                    </Col>
                </Row>
            </Container>
            <Modal
                show={show}
                setShow={setShow}
                handleSubmit={handleSubmit}
                modalTitle={'Add New Category'}
            >
                <Input 
                    placeholder={`Category Name`}
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                />
                <select className="form-control" value={parentCategoryId} onChange={e => setParentCategoryId(e.target.value)}>
                    <option>select category</option>
                    {
                        createCategoryList(category.categories).map((option, index) => (
                            <option key={index} value={option.value}>{option.name}</option>
                        ))
                    }
                </select>
                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>
        </Layout>
    )
}

export default Category
