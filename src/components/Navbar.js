import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, NavItem, NavDropdown } from 'react-bootstrap';

import * as FaIcons from 'react-icons/fa';


const Navigation = ({ account }) => {
    return (
        <Navbar bg='primary'  >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/institucion">Instituciones</Nav.Link>
            <NavDropdown title="Certificados" id="basic-nav-dropdown">
            <NavDropdown.Item href="/crearcertificado">Crear</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/verificarcertificado">Verificar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Reportes" id="basic-nav-dropdown">
            <NavDropdown.Item href="/certsxestudiante">Certificados por Estudiante</NavDropdown.Item>
            <NavDropdown.Item href="/certsxinstitucion">Certificados por Institucion</NavDropdown.Item>
            <NavDropdown.Item href="/certsall">Certifificados Emitidos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        <Nav pullright="true">
            <NavItem  href="#">
                <a
                    href={`https://etherscan.io/address/${account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button nav-button btn-sm mx-4">
                    <Button className='btn-success' >
                        Wallet: {account.slice(0, 5) + '...' + account.slice(37, 42)}
                    </Button>
                </a>
            </NavItem>
        </Nav>
          
        </Navbar.Collapse>
    </Navbar>
    )

}

export default Navigation;