import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/admin/Layout'
import { addCategory } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import CheckBoxTree from 'react-checkbox-tree'
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown

} from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'

const Category = () => {
    const { category } = useSelector(state => state)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkArray, setCheckArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [showCategoryModal, setShowCategoryModal] = useState(false)

    const renderCategories = categories => {
        let categoryList = []
        categories && categories.forEach((cat, index) => {
            categoryList.push(
                {
                    label: cat.name,
                    value: cat._id,
                    children: cat.children.length > 0 && renderCategories(cat.children)
                }
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

    const addCategory = () => {
        setShow(false)
        dispatch(addCategory({
            name: categoryName,
            parentId: parentCategoryId,
            categoryImage: "https://res.cloudinary.com/dj7zmqrth/image/upload/v1621245029/social-media-app/awcnvz4mxeeyn51agzhv.jpg"
        }))
        setCategoryName('')
        setParentCategoryId('')
    }

    const updateCategory = e => {
        setShowCategoryModal(true)
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
                        <CheckBoxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button>Delete</button>
                        <button onClick={() => setShowCategoryModal(true)}>Edit</button>
                    </Col>
                </Row>
            </Container>
            <Modal
                show={show}
                setShow={() => setShow(false)}
                handleSubmit={addCategory}
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

            <Modal
                show={showCategoryModal}
                setShow={() => setShowCategoryModal(false)}
                handleSubmit={updateCategory}
                modalTitle={'Update Category'}
                size="lg"
            >
                <Row>
                    <Col>
                        <Input
                            placeholder={`Category Name`}
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <select className="form-control" value={parentCategoryId} onChange={e => setParentCategoryId(e.target.value)}>
                            <option>select category</option>
                            {
                                createCategoryList(category.categories).map((option, index) => (
                                    <option key={index} value={option.value}>{option.name}</option>
                                ))
                            }
                        </select>
                    </Col>
                </Row>
                
                
                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>
        </Layout>
    )
}

export default Category
