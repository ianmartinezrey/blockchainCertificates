import React, { Component } from 'react';
import smart_contract from '../abis/CertificadosAcademicos.json';
import Web3 from 'web3';
import logo from '../logo.png';
import img from '../img/secure_cert.png'

import { Form, Card, Container } from 'react-bootstrap';
import Navigation from './Navbar';
import CertificadoCrearForm from './CertificadoCrearForm'

class CertificadoCrear extends Component {

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
                    <Card.Header className=' subtitle4 page-header-blue'>Emitir Certificado</Card.Header>
                    <Card.Body className='div_gradient2'>
                      <div className="row">
                        <div className="col col-lg-5 text-center">
                          <img src={img} />
                        </div>
                        <div className="col col-lg-7">
                          <CertificadoCrearForm contract={this.state.contract} account={this.state.account} />
                        </div>
                      </div>
                        
                    </Card.Body>
                </Card>
            </Container>
        </div>
        );
    }
}

export default CertificadoCrear;
