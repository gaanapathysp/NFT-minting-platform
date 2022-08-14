import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                    HOME
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/mint">
                    MINT NOW
                </NavLink>
            </li>
        </ul>
    );
};

export default Navbar;
