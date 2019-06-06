import React, { Component, ReactNode } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

class Menu extends Component<Props> {
    render(): ReactNode {
        return (
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand href='#home'>CultiSoft</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link href='#home'>Cultivos</Nav.Link>
                        <Nav.Link href='#link'>Guias</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

interface Props {}

export default Menu;
