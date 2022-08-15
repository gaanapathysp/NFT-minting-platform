import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/"
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/mint">
                </NavLink>
            </li>
        </ul>
    );
};

export default Navbar;
