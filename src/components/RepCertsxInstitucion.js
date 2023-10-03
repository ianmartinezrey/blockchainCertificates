import React, { Component } from 'react';
import smart_contract from '../abis/CertificadosAcademicos.json';
import Web3 from 'web3';
import '../css/style_global.css'

import { Table, Card, Container } from 'react-bootstrap';
import Navigation from './Navbar';

class RepCertsxInstitucion extends Component {

    async componentDidMount() {
        // 1. Carga de Web3
        await this.loadWeb3()
        // 2. Carga de datos de la Blockchain
        await this.loadBlockchainData()
    }
    
    // 1. Carga de Web3
    async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log('Accounts: ', accounts)
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('¡Deberías considerar usar Metamask!')
        }
    }  

    // 2. Carga de datos de la Blockchain
    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        const networkId = await web3.eth.net.getId() 
        const networkData = smart_contract.networks[networkId]
        console.log(networkData)
        if (networkData) {
        const contract = new web3.eth.Contract(smart_contract.abi, networkData.address)
        this.setState({contract})  
        this.setState({ account: accounts[0] })

        let certs = await contract.methods.getCertsxInstitucion(accounts[0]).call({ from: accounts[0] })
        const certemit = []
        certs.map(cert =>{
            if(cert.ipfsHash.length > 0){
                certemit.push(cert)
            }
        })
        this.setState({ certemit })
        } else {
        window.alert('¡El Smart Contract no se ha desplegado en la red!')
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            contract: null,
            loading: false,
            account: '0x0',
            certemit: [],
            show: false
        }
    }

    render() {
        return (
        <div>
            <Navigation account={this.state.account}  />
            <br />
            <Container>
                <Card >
                    <Card.Header className=' subtitle4 page-header-blue'>Certificados por Institucion</Card.Header>
                    <Card.Body className='div_gradient2'>
                        <Table className='dataTable' responsive stripped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>Estudiante</th>
                                <th>Titulo</th>
                                <th>Fecha Emision</th>
                                <th>Hash</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.certemit.map(cert=>{
                                return(
                                    <tr>
                                    <td>{cert.nombre}</td>
                                    <td>{cert.titulo}</td>
                                    <td>{cert.fechaEmision}</td>
                                    <td>{cert.ipfsHash}</td>
                                    </tr>
                                )
                                })}
                                
                            </tbody>
                        </Table>
                                    
                    </Card.Body>
                </Card>
            </Container>
        </div>
        );
    }
}

export default RepCertsxInstitucion;
