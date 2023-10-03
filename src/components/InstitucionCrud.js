import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

function InstitucionCrud(props) {
    const {contract, account} = props;  
    const [show, setShow] = useState(false);
    const [but_disable, setbut_disable] = useState('');

    const [institucion_address, setinstitucion_address] = useState('');
    const [institucion_name, setinstitucion_name] = useState('');
    const [resolucion, setresolucion] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value)
    }

    const addinst = async (institucion_address, institucion_name, resolucion) => {
        try {
            await contract.methods.agregarInstitucion(
                institucion_address,
                institucion_name,
                resolucion
            ).send({ from: account }).then();
            Swal.fire('Institucion ' + institucion_name + ' creada con exito','' , 'success')
            setinstitucion_address('')
            setinstitucion_name('')
            setresolucion('')
            handleClose()
            setbut_disable(false);
        }catch(err){
            Swal.fire('Institucion no creada', err.message, 'error')
            setbut_disable(false);
        } 
    }

    return (
        <>
        <Button variant="success" onClick={handleShow}>
            Agregar
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Agregar Institucion</Modal.Title>
            </Modal.Header>
            
            <Form
                onSubmit={(event) => {
                event.preventDefault()
                setbut_disable(true);
                addinst(institucion_address, institucion_name, resolucion)
                }}
            >
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="institucion">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control type="text"  
                            onChange={(e)=>inputChangeHandler(setinstitucion_address, e)}
                            placeholder="Dirección Wallet" 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="institucion_name" required>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control 
                            type="text" 
                            onChange={(e)=>inputChangeHandler(setinstitucion_name, e)}
                            placeholder="Universidad AAA" 
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="resolucion">
                        <Form.Label>Resolucion</Form.Label>
                        <Form.Control 
                            type="text" 
                            onChange={(e)=>inputChangeHandler(setresolucion, e)}
                            placeholder="AAAAAA" 
                            required
                        />
                    </Form.Group>
                
                </Modal.Body>
                <Modal.Footer>
                <Button type='button' variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button type='submit' id='but_send' variant="success" disabled={but_disable} >
                    Guardar
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
}

export default InstitucionCrud;