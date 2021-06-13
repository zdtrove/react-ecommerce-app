import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Container, Row, Col } from 'react-bootstrap'
import Input from '../components/common/Input'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../redux/actions'
import Modal from '../components/common/Modal'

const Products = () => {
	const [name, setName] = useState('')
	const [quantity, setQuantity] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [categoryId, setCategoryId] = useState('')
	const [productPictures, setProductPictures] = useState([])
	const [show, setShow] = useState(false)
	const { category } = useSelector(state => state)
	const dispatch = useDispatch()

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
	        productPictures: ["https://res.cloudinary.com/dj7zmqrth/image/upload/v1621245029/social-media-app/awcnvz4mxeeyn51agzhv.jpg"],
	        category: categoryId
		}))
		setShow(false)
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

                	</Col>
                </Row>
            </Container>
            <Modal
            	show={show}
            	setShow={setShow}
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
        </Layout>
    )
}

export default Products
