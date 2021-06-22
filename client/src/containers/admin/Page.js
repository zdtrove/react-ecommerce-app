import React, { useState, useEffect } from 'react'
import Layout from '../../components/admin/Layout'
import Modal from '../../components/common/Modal'
import { Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/common/Input'
import linearCategories from '../../helpers/linearCategories'
import { useDispatch, useSelector } from 'react-redux'
import { createPage } from '../../redux/actions'

const Page = () => {
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [title, setTitle] = useState('')
	const [categories, setCategories] = useState([])
	const [categoryId, setCategoryId] = useState('')
	const [desc, setDesc] = useState('')
	const [type, setType] = useState('')
	const [banners, setBanners] = useState([])
	const [products, setProducts] = useState([])
	const { category, page } = useSelector(state => state)
	const dispatch = useDispatch()

	useEffect(() => {
		setCategories(linearCategories(category.categories))
		setBanners([
			{
				img: "https://res.cloudinary.com/dj7zmqrth/image/upload/v1623380571/social-media-app/wxqkjqqy3adequv1t7dg.jpg"
			},
			{
				img: "https://res.cloudinary.com/dj7zmqrth/image/upload/v1623380571/social-media-app/wxqkjqqy3adequv1t7dg.jpg"
			},
			{
				img: "https://res.cloudinary.com/dj7zmqrth/image/upload/v1623380571/social-media-app/wxqkjqqy3adequv1t7dg.jpg"
			}
		])
		setProducts([
			{
				img: "https://res.cloudinary.com/dj7zmqrth/image/upload/v1623380571/social-media-app/wxqkjqqy3adequv1t7dg.jpg"
			},
			{
				img: "https://res.cloudinary.com/dj7zmqrth/image/upload/v1623380571/social-media-app/wxqkjqqy3adequv1t7dg.jpg"
			},
			{
				img: "https://res.cloudinary.com/dj7zmqrth/image/upload/v1623380571/social-media-app/wxqkjqqy3adequv1t7dg.jpg"
			}
		])
	}, [category])

	useEffect(() => {
		if (!page.loading) {
			setShowCreateModal(false)
			setTitle('')
			setCategoryId('')
			setDesc('')
			setProducts([])
			setBanners([])
		}
	}, [page])

	const onCategoryChange = e => {
		const category = categories.find(category => category.value === e.target.value)
		setCategoryId(e.target.value)
		setType(category.type)
	}

	const submitPageForm = e => {
		e.preventDefault()
		dispatch(createPage({ title, description: desc, category: categoryId, type, banners, products }))
	}

	const renderCreatePageModal = () => {
		return (
			<Modal
				show={showCreateModal}
				setShow={() => setShowCreateModal(false)}
				modalTitle="Create New Page"
				handleSubmit={submitPageForm}
			>
				<Container>
					<Row>
						<Col>
							<Input
								type="select"
								value={categoryId}
								onChange={onCategoryChange}
								options={categories}
								placeholder={`Select Category`}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Input
								className="form-control-sm"
								value={title}
								onChange={e => setTitle(e.target.value)}
								placeholder={'Page Title'}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Input
								className="form-control-sm"
								value={desc}
								onChange={e => setDesc(e.target.value)}
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
			{
				page.loading ?
					<p>Creating Page...please wait...</p>
					: <>
						{renderCreatePageModal()}
						<button onClick={() => setShowCreateModal(true)}>Create Page</button>
					</>
			}

		</Layout>
	)
}

export default Page