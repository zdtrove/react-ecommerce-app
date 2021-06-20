import React, { useState, useEffect } from 'react'
import Layout from '../../components/admin/Layout'
import Modal from '../../components/common/Modal'
import { Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/common/Input'
import linearCategories from '../../helpers/linearCategories'
import { useSelector } from 'react-redux'

const Page = () => {
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [title, setTitle] = useState('')
	const { category } = useSelector(state => state)
	const [categories, setCategories] = useState([])
	const [categoryId, setCategoryId] = useState('')
	const [desc, setDesc] = useState('')
	const [banners, setBanners] = useState([])
	const [products, setProducts] = useState([])

	useEffect(() => {
		setCategories(linearCategories(category.categories))
		console.log('categories', categories)
	}, [category])
	
	const renderCreatePageModal = () => {
		return (
			<Modal
				show={showCreateModal}
				setShow={() => setShowCreateModal(false)}
				modalTitle={'Create New Page'}
			>
				<Container>
					<Row>
						<Col>
							<select
								className="form-control form-control-sm"
								value={categoryId}
								onChange={e => setCategoryId(e.target.value)}
							>
								<option value="">select category</option>
								{
									categories.map(cat => 
										<option key={cat._id} value={cat._id}>{cat.name}</option>
									)
								}
							</select>
						</Col>
					</Row>
					<Row>
						<Col>
							<Input
								className="form-control-sm"
								value={title}
								onChange={e => setTitle(e.targer.value)}
								placeholder={'Page Title'}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Input
								className="form-control-sm"
								value={desc}
								onChange={e => setDesc(e.targer.value)}
								placeholder={'Page Desc'}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<input 
								type="file"
								name="banners"
								onChange={handleBannerImages}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<input 
								type="file"
								name="products"
								onChange={handleProductImages}
							/>
						</Col>
					</Row>
				</Container>
			</Modal>
		)
	}

	const handleBannerImages = () => {

	}

	const handleProductImages = () => {

	}
	
	return (
		<Layout sidebar>
			{renderCreatePageModal()}
			<button onClick={() => setShowCreateModal(true)}>Create Page</button>
		</Layout>
	)
}

export default Page