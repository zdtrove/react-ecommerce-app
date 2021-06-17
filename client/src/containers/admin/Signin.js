import React, { useState } from 'react'
import Layout from '../../components/admin/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Input from '../../components/common/Input'
import { login } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Signin = () => {
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = e => {
		e.preventDefault()
		dispatch(login({ email, password }))
	}

	if (auth.authenticate) {
		return <Redirect to={`/admin`} />
	}

	if (auth.loading) {
		return <p>Loading...</p>
	}

	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: '50px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={onSubmit}>
							<Input
								label="Email"
								placeholder="Email"
								type="text"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							<Input
								label="Password"
								placeholder="Password"
								type="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export default Signin