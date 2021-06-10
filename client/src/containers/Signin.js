import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Input from '../components/common/Input'
import { isUserLoggedIn, login } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Signin = () => {
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		if (!auth.authenticated) {
			dispatch(isUserLoggedIn())
		}
	}, [])

	const userlogin = e => {
		e.preventDefault()
		dispatch(login({ email, password }))
	}

	if (auth.authenticate) {
		return <Redirect to={`/`} />
	}

	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: '50px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={userlogin}>
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