import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Container, Row, Col, Table } from 'react-bootstrap'
import Input from '../components/common/Input'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../redux/actions'
import Modal from '../components/common/Modal'

const Products = () => {
    const { category, product } = useSelector(state => state)
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productPictures, setProductPictures] = useState([])
    const [show, setShow] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [productDetail, setProductDetail] = useState(null)

    const createCategoryList = (categories, options = []) => {
        categories && categories.forEach(cat => {
            options.push({ value: cat._id, name: cat.name })
            if (cat.children.length > 0) {
                createCategoryList(cat.children, options)
            }
        })

        return options
    }

    const handleProductPictures = e => {

    }

    const handleSubmit = () => {
        dispatch(addProduct({
            name,
            price,
            description,
            quantity,
            productPictures: [
                {
                    "public_id": "social-media-app/vbnyqms6q49kzfs82qlm",
                    "url": "https://res.cloudinary.com/dj7zmqrth/image/upload/v1621415206/social-media-app/vbnyqms6q49kzfs82qlm.jpg"
                }
            ],
            category: categoryId
        }))
        setShow(false)
    }

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product, index) => (
                                <tr onClick={() => showProductDetail(product)} key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                </tr>
                            )) : null
                    }

                </tbody>
            </Table>
        )
    }

    const renderAddProductModal = () => {
        return (
            <Modal
                show={show}
                setShow={() => setShow(false)}
                handleSubmit={handleSubmit}
                modalTitle={'Add New Product'}
            >
                <Input
                    label="Name"
                    placeholder={`Product Name`}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    label="Quantity"
                    placeholder={`Quantity`}
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                />
                <Input
                    label="Price"
                    placeholder={`Price`}
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <Input
                    label="Description"
                    placeholder={`Description`}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <select className="form-control" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                    <option>select category</option>
                    {
                        createCategoryList(category.categories).map((option, index) => (
                            <option key={index} value={option.value}>{option.name}</option>
                        ))
                    }
                </select>
                <input type="file" name="productPictures" onChange={handleProductPictures} />
            </Modal>
        )
    }

    const showProductDetail = product => {
        setProductDetail(product)
        setShowDetail(true)
    }

    const renderProductDetailModal = () => {
        if (!productDetail) return null
        return (
            <Modal
                show={showDetail}
                setShow={() => setShowDetail(false)}
                modalTitle={'Product Detail'}
                size="lg"
            >
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetail.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetail.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetail.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetail.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetail.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Pictures</label>
                        <div style={{ display: 'flex' }}>
                            {productDetail.productPictures.map(picture => (
                                <div className="productImg">
                                    <img src={picture.url} alt="product" />
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <button onClick={() => setShow(true)}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {renderAddProductModal()}
            {renderProductDetailModal()}
        </Layout>
    )
}

export default Products
