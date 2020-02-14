import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Menu extends Component<Props> {
    render() {
        return (
            <Navbar bg="primary" expand="lg">
                <NavLink className="navbar-brand" to="/">CultiSoft</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className="nav-link" to="/cultivos">Cultivos</NavLink>
                        <NavLink className="nav-link" to="/guias">Guias</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

interface Props {}

export default Menu;
