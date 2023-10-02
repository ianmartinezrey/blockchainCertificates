import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//import sidebar from 'startbootstrap-sb-admin-2'
import 'startbootstrap-sb-admin-2/css/sb-admin-2.css';
import { Button } from 'react-bootstrap';


const Navigation = ({ account }) => {
    return (
        
        

            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion flex">
                <li className="nav-item">
                    <a href={`https://etherscan.io/address/${account}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button nav-button btn-sm mx-4">
                        <Button variant="outline-light">
                            {account} asa sas 
                        </Button>
                    </a>
                </li>
                
                
                <li className="nav-item">
                    <a className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tables</span></a>
                </li>
                <hr className="sidebar-divider" />

                <li className="nav-item active">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Components</span>
                    </a>
                </li>
            </ul>
            

    )
  }


export default Navigation;