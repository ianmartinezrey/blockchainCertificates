import React, { Component } from 'react';
//import smart_contract from '../abis/Migrations.json';
import smart_contract from '../abis/CertificadosAcademicos.json';
import Web3 from 'web3';
import logo from '../logo.png';

import Navigation from './Navbar';
import { Table, Button } from 'react-bootstrap';

import { event } from 'jquery';

class RegistrarInstitucion extends Component {

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
    this.setState({ account: accounts[0] })
    // Ganache -> 5777, Rinkeby -> 4, BSC -> 97
    const networkId = await web3.eth.net.getId() 
    console.log('networkid:', networkId)
    const networkData = smart_contract.networks[networkId]
    console.log('NetworkData:', networkData)

    if (networkData) {
      const abi = smart_contract.abi
      console.log('abi', abi)
      const address = networkData.address
      console.log('address:', address)
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })

      const estudianteAddress = "0x2b5A1AfEe78e65e87268ECfe26a784f0812ECFCB";
      const nombre = "Ian";
      const institucion_address = "0x2b5A1AfEe78e65e87268ECfe26a784f0812ECFCB";
      const institucion_name = "ECCI";
      const fechaEmision = 123455;
      const titulo = "Ing";
      const ipfsHash = "asd12312312312";
      const resolucion = "abcde";
      /*  
      let emitirCertificado = await contract.methods.emitirCertificado(
        estudianteAddress,
        nombre,
        institucion,
        fechaEmision,
        titulo,
        ipfsHash
      ).send({ from: accounts[0] });
      this.setState({ emitirCertificado })
      */
      /*  
      let addinst = await contract.methods.agregarInstitucion(
        institucion_address,
        institucion_name,
        resolucion
      ).send({ from: accounts[0] });
      console.log(addinst)
      console.log("Se agregó la institucion " + institucion_name)
      */
      
      let instituciones = await contract.methods.getAllInstituciones().call({ from: accounts[0] });
      console.log("instituciones registradas")
      console.log(instituciones)
      this.setState({ instituciones })
      
      //console.log("Se agregó la institucion " + institucion_name)

    } else {
      window.alert('¡El Smart Contract no se ha desplegado en la red!')
    }

    
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      loading: true,
      instituciones: []
    }
  }



  render() {
    return (

      <div>
        <Navigation account={this.state.account}  />
        <br />
        
        <h2>Instituciones</h2>
        <div className='col-md-10' >
          <Table responsive stripped bordered hover size="sm">
            <thead>
              <tr>
                <th>Address</th>
                <th>Nombre</th>
                <th>Resolucion</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
                {this.state.instituciones.map(inst=>{
                  return(
                    <tr>
                      <td>{inst['institucion']}</td>
                      <td>{inst.institucion_name}</td>
                      <td>{inst.resolucion}</td>
                      <td>{String(inst.estado)}</td>
                    </tr>
                  )
                })}
                   
            </tbody>
          </Table>
          <hr />
          <Button className='btn-success' value={'Agregar'} name='add' >Agregar</Button>
          
        </div>
      </div>
    );
  }
}

export default RegistrarInstitucion;
