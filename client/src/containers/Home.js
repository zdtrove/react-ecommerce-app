import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="home">
            <div className="menu">
                <ul>
                    <li>
                        <Link to="/" className="title">All products</Link>
                        <div className="submenu">
                            <ul>
                                <li>
                                    <Link to="/">Folding Tables</Link>
                                </li>
                                <li className="parent">
                                    <Link to="/">Living Room Tables</Link>
                                    <div className="submenu">
                                        <ul>
                                            <li>
                                                <Link to="/">Dining Room Tables</Link>
                                            </li>
                                            <li>
                                                <Link to="/">Folding Tables</Link>
                                            </li>
                                            <li>
                                                <Link to="/">Living Room Tables</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="parent">
                                    <Link to="/">Bed Rooms</Link>
                                    <div className="submenu">
                                        <ul>
                                            <li>
                                                <Link to="/">Bed Room Tables</Link>
                                            </li>
                                            <li>
                                                <Link to="/">Bed Folding Tables</Link>
                                            </li>
                                            <li>
                                                <Link to="/">Bed Living Tables</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link to="/">End Tables</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error quia aut aliquid corporis ducimus ipsa aspernatur perferendis, culpa non deleniti sequi quisquam, fugit cum ipsam corrupti, quo nihil quidem voluptates?</p>
        </div>
    )
}

export default Home
