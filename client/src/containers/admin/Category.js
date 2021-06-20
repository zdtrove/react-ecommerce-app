import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/admin/Layout'
import { 
    addCategory, 
    updateCategories, 
    getAllCategory, 
    deleteCategories as deleteCategoriesAction
} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import CheckBoxTree from 'react-checkbox-tree'
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload

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
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [showDeleteCategory, setShowDeleteCategory] = useState(false)

    const renderCategories = categories => {
        let categoryList = []
        categories && categories.forEach((cat, index) => {
            categoryList.push(
                {
                    label: cat.name,
                    value: cat._id,
                    children: (cat.children && cat.children.length > 0) && renderCategories(cat.children)
                }
            )
        })
        return categoryList
    }

    const createCategoryList = (categories, options = []) => {
        categories && categories.forEach(cat => {
            options.push({ 
                value: cat._id, 
                name: cat.name, 
                parentId: cat.parentId,
                type: cat.type
            })
            if (cat.children && cat.children.length > 0) {
                createCategoryList(cat.children, options)
            }
        })

        return options
    }

    const handleCategoryImage = e => {
        setCategoryImage(e.target.files[0])
    }

    const addCategoryForm = () => {
        setShow(false)
        dispatch(addCategory({
            name: categoryName,
            parentId: parentCategoryId,
            categoryImage: "https://res.cloudinary.com/dj7zmqrth/image/upload/v1621245029/social-media-app/awcnvz4mxeeyn51agzhv.jpg"
        }))
        setCategoryName('')
        setParentCategoryId('')
    }

    const showUpdateCategoriesModal = e => {
        updateCheckedAndExpandedCategories()
        setShowCategoryModal(true)
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories)
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((catId, index) => {
            const category = categories.find((cat, _index) => catId === cat.value)
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((catId, index) => {
            const category = categories.find((cat, _index) => catId === cat.value)
            category && expandedArray.push(category)
        })

        console.log(checkedArray, expandedArray)

        setCheckedArray(checkedArray)
        setExpandedArray(expandedArray)
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setCheckedArray(updatedCheckedArray)
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setExpandedArray(updatedExpandedArray)
        }
    }

    const updateCategoriesForm = () => {
        const data = {
            _id: [],
            name: [],
            parentId: [],
            type: []
        }
        expandedArray.forEach((item, index) => {
            data._id.push(item.value)
            data.name.push(item.name)
            data.parentId.push(item.parentId ? item.parentId : "")
            data.type.push(item.type)
        })
        checkedArray.forEach((item, index) => {
            data._id.push(item.value)
            data.name.push(item.name)
            data.parentId.push(item.parentId ? item.parentId : "")
            data.type.push(item.type)
        })
        dispatch(updateCategories(data))
        setShowCategoryModal(false)
    }

    const renderUpdateCategoriesModal = () => {
        return (
            <Modal
                show={showCategoryModal}
                setShow={() => setShowCategoryModal(false)}
                handleSubmit={updateCategoriesForm}
                modalTitle={'Update Category'}
                size="lg"
            >
                <Row>
                    <Col>
                        <h6>Expanded</h6>
                    </Col>
                </Row>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    placeholder={`Category Name`}
                                    value={item.name}
                                    onChange={e => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    onChange={e => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                                >
                                    <option>select category</option>
                                    {
                                        createCategoryList(category.categories).map((option, index) => (
                                            <option key={index} value={option.value}>{option.name}</option>
                                        ))
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.type}
                                    onChange={e => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                >
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }
                <h6>Checked Categories</h6>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    placeholder={`Category Name`}
                                    value={item.name}
                                    onChange={e => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    onChange={e => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                >
                                    <option>select category</option>
                                    {
                                        createCategoryList(category.categories).map((option, index) => (
                                            <option key={index} value={option.value}>{option.name}</option>
                                        ))
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.type}
                                    onChange={e => handleCategoryInput('type', e.target.value, index, 'checked')}
                                >
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }

                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>
        )
    }

    const renderAddCategoryModal = () => {
        return (
            <Modal
                show={show}
                setShow={() => setShow(false)}
                handleSubmit={addCategoryForm}
                modalTitle={'Add New Category'}
            >
                <Row>
                    <Col>
                        <Input
                            placeholder={`Category Name`}
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                            className="form-control-sm"
                        />
                    </Col>
                    <Col>
                        <select className="form-control form-control-sm" value={parentCategoryId} onChange={e => setParentCategoryId(e.target.value)}>
                            <option>select category</option>
                            {
                                createCategoryList(category.categories).map((option, index) => (
                                    <option key={index} value={option.value}>{option.name}</option>
                                ))
                            }
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                    </Col>
                </Row>
            </Modal>
        )
    }

    const showDeleteCategoriesModal = () => {
        updateCheckedAndExpandedCategories()
        setShowDeleteCategory(true)
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }))
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }))
        const idsArray = expandedIdsArray.concat(checkedIdsArray)
        console.log(idsArray)
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
            setShowDeleteCategory(false)
        }
    }

    const renderDeleteCategoryModal = () => {
        console.log('delete', checkedArray)
        return (
            <Modal
                modalTitle="Confirm"
                show={showDeleteCategory}
                setShow={() => setShowDeleteCategory(false)}
                handleSubmit={() => setShowDeleteCategory(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no')
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >
                <h5>Expanded</h5>
                {
                    expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
                }
                <h5>Checked</h5>
                {
                    checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
                }
            </Modal>
        )
    }


    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="action-btn-container">
                                <span>Actions: </span>
                                <button onClick={() => setShow(true)}><IoIosAdd /> <span>Add</span></button>
                                <button onClick={showDeleteCategoriesModal}><IoIosTrash /><span>Delete</span></button>
                                <button onClick={showUpdateCategoriesModal}><IoIosCloudUpload /><span>Edit</span></button>
                            </div>
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
            </Container>
            {renderAddCategoryModal()}
            {renderUpdateCategoriesModal()}
            {renderDeleteCategoryModal()}
        </Layout>
    )
}

export default Category
