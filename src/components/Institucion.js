import React, { Component } from 'react';
import smart_contract from '../abis/CertificadosAcademicos.json';
import Web3 from 'web3';
import logo from '../logo.png';
import '../css/style_global.css'

import { Table, Card, Container } from 'react-bootstrap';
import Navigation from './Navbar';
import InstitucionCrud from './InstitucionCrud'

class Institucion extends Component {

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

        let instituciones = await contract.methods.getAllInstituciones()
            .call({ from: accounts[0] })
        console.log("instituciones registradas")
        console.log(instituciones)
        this.setState({ instituciones })

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
            instituciones: [],
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
                    <Card.Header className=' subtitle4 page-header-blue'>Instituciones</Card.Header>
                    <Card.Body className='div_gradient2'>
                        <Table className='dataTable' responsive stripped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>Address</th>
                                <th>Nombre</th>
                                <th>Resolución</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.instituciones.map(inst=>{
                                return(
                                    <tr>
                                    <td>{inst.institucion}</td>
                                    <td>{inst.institucion_name}</td>
                                    <td>{inst.resolucion}</td>
                                    </tr>
                                )
                                })}
                                
                            </tbody>
                        </Table>
                                    
                        <InstitucionCrud contract={this.state.contract} account={this.state.account} />
                    </Card.Body>
                </Card>
            </Container>
        </div>
        );
    }
}

export default Institucion;
