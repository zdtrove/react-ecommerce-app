import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Input from '../components/common/Input'
import { signup } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Signup = () => {
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const onSubmit = e => {
		e.preventDefault()
		dispatch(signup({ firstName, lastName, email, password }))
	}

	if (auth.authenticate) {
		return <Redirect to={`/`} />
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
							<Row>
								<Col md={6}>
									<Input
										label="First Name"
										placeholder="First Name"
										type="text"
										value={firstName}
										onChange={e => setFirstName(e.target.value)}
									/>
								</Col>
								<Col md={6}>
									<Input
										label="Last Name"
										placeholder="Last Name"
										type="text"
										value={lastName}
										onChange={e => setLastName(e.target.value)}
									/>
								</Col>
							</Row>
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
								type="text"
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

export default Signup