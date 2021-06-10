import React from 'react'
import Layout from '../components/Layout'
import { Container, Row, Col } from 'react-bootstrap'

const Home = () => {
	return (
		<Layout>
			<Container fluid>
				<Row>
					<Col md={2} className="sidebar">Sidebar</Col>
					<Col md={10} style={{ marginLeft: 'auto' }}>Container</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export default Home