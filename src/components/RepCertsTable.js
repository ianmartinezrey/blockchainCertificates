import { useState } from 'react';
import { useLocation } from "react-router-dom"
import { Button, Card, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import QRCode from 'react-qr-code';

function CertificadoVerificarForm(props) {
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const {contract, account, instituciones} = props;   
    const [ipfsHash, setipfsHash] = useState(params.get('id'));
    const [but_disable, setbut_disable] = useState('');
    const [showResults, setShowResults] = useState(false)
    const [certificado, setcertificado] = useState([])
    
    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value)
    }

    const searchcert = async (ipfsHash) => {
        try{
            let certi = await contract.methods.verCertificadoPorIPFS(ipfsHash).call({ from: account })
            setcertificado(certi)
            setShowResults(true)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Certificado encontado!',
                showConfirmButton: false,
                timer: 1000
            })
        }catch(err){
            console.log(err.message)
            Swal.fire('Certificado no encontrado', '', 'error')
            setbut_disable(false);
        }
    }

    const Results = (cert) => (
        <>
            <div className='row'>&nbsp;</div>
            <div className='row'>&nbsp;</div>
            
            <Card >
                <Card.Body className='div_gradient2'>
                    <div className='row' >
                        <div className="col col-md-5 text-center align-middle">
                            Codigo de validacion
                            <div className='row'>&nbsp;</div>
                            {certificado.ipfsHash && (
                                <QRCode
                                    title="GeeksForGeeks"
                                    value={"http://localhost:3000/verificarcertificado?id=" + certificado.ipfsHash}
                                    size={256}
                                />
                            )}
                        </div>
                        <div className="col col-md-7">
                            <Form.Group className="mb-3" controlId="nombre">
                                <Form.Label>Nombre Estudiante</Form.Label>
                                <Form.Control type="text" value={certificado.nombre} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="titulo">
                                <Form.Label>Titulo obtenido</Form.Label>
                                <Form.Control type="text" value={certificado.titulo} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="institucion">
                                <Form.Label>Institucion Emisora</Form.Label>
                                <Form.Control type="text" value={instituciones.get(certificado.institucion).institucion_name} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="fecha_emision">
                                <Form.Label>Fecha Emision</Form.Label>
                                <Form.Control type="text" value={certificado.fechaEmision} disabled />
                            </Form.Group>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )

    return (
        <>
            <Card >
                <Card.Header className=' subtitle4 page-header-blue'>Verificar Certificado</Card.Header>
                <Card.Body className='div_gradient2'>
                    <Form
                        onSubmit={(event) => {
                        event.preventDefault()
                        setbut_disable(true);
                        searchcert(ipfsHash)
                        }}
                    >
                        <Form.Group className="mb-3" controlId="ipfsHash">
                            <Form.Label>Hash certificado</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={(e)=>inputChangeHandler(setipfsHash, e)}
                                placeholder="0x0" 
                                value={ipfsHash}
                                required
                            />
                        </Form.Group>
                        
                        <Button type='submit' id='but_send' variant="success" disabled={but_disable} >
                            Consultar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            { showResults ? <Results cert={certificado} /> : null }
            
        </>
    );
}

export default CertificadoVerificarForm;