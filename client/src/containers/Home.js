import React from 'react'

const Home = () => {
    return (
        <div className="home">
            <div className="menu">
                <ul>
                    <li className="level0 drop-submenu">
                        <a href="#" className="title">All products</a>
                        <div className="wrap_submenu">
                            <ul className="level0">
                                <li>
                                    <a href="#">Folding Tables</a>
                                </li>
                                <li className="parent">
                                    <a href="#">Living Room Tables</a>
                                    <div className="wrap_submenu">
                                        <ul>
                                             <li>
                                                <a href="#">Dining Room Tables</a>
                                            </li>
                                            <li>
                                                <a href="#">Folding Tables</a>
                                            </li>
                                            <li>
                                                <a href="#">Living Room Tables</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="parent">
                                    <a href="#">Bed Rooms</a>
                                    <div className="wrap_submenu">
                                        <ul>
                                             <li>
                                                <a href="#">Bed Room Tables</a>
                                            </li>
                                            <li>
                                                <a href="#">Bed Folding Tables</a>
                                            </li>
                                            <li>
                                                <a href="#">Bed Living Tables</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a href="#">End Tables</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
    	</div>
    )
}

export default Home
