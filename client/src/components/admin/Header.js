import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signout } from '../../redux/actions'

const Header = () => {
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch()

	const logout = () => {
		dispatch(signout())
	}

	const renderLoggedInLinks = () => {
		return <Nav>
			<li className="nav-item">
				<span onClick={logout} style={{ cursor: 'pointer' }} className="nav-link">Signout</span>
			</li>
		</Nav>
	}

	const renderNonLoggedInLinks = () => {
		return <Nav>
			<li className="nav-item">
				<NavLink to="signin" className="nav-link">Signin</NavLink>
			</li>
			<li className="nav-item">
				<NavLink to="signup" className="nav-link">Signup</NavLink>
			</li>
		</Nav>
	}

	return (
		<>
			<Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
				<Container>
					<Link className="navbar-brand" to="/">Admin Dashboard</Link>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto">

						</Nav>
						{auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Header