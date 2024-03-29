import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import FormData from 'form-data';

function CertificadoCrearForm(props) {
    const {contract, account} = props;  
    const [estudiante_address, setestudiante_address] = useState('');
    const [estudiante_name, setestudiante_name] = useState('');
    const [fecha_emision, setfecha_emision] = useState('');
    const [titulo, settitulo] = useState('');
    const [but_disable, setbut_disable] = useState('');
    const [but_text, setbut_text] = useState('Crear');
    
    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value)
    }

    const addcert = async (ipfsHash, estudiante_address, estudiante_name, fecha_emision, titulo) => {
        await contract.methods.emitirCertificado(
            ipfsHash,
            estudiante_address,
            estudiante_name,
            fecha_emision,
            titulo
        ).send({ from: account });
        }
    
        
    const uploadFile = async(fileInput) => {
        const formData = new FormData();
        console.log(fileInput)
        console.log(fileInput.files[0])
        formData.append("file", fileInput.files[0])

        const pinataMetadata = JSON.stringify({
            name: fileInput.files[0].name,
        });
        formData.append('pinataMetadata', pinataMetadata);
        
        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        })
        formData.append('pinataOptions', pinataOptions);

        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              authorization: 'Bearer ' + process.env.REACT_APP_WEB3_STORAGE_KEY
            }
        };
          
        options.body = formData;
          
        const rootCid = fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', options)
            .then(response => response.json())
            .then((response) => {
                console.log(response)
                return response.IpfsHash;
            })
            .catch(err => console.error(err));

        return rootCid
    }
    
    
    const sendform = async () =>{
        setbut_text('Cargando...')
        await Swal.fire({
            title: 'Certificado',
            text: 'Por favor confirma que deseas crear el certificado',
            showCancelButton: true,
            icon: 'question',
            
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const fileInput = document.querySelector('input[type="file"]')
                    uploadFile(fileInput)
                        .then(cid => {
                            console.log('https://ipfs.io/ipfs/' + cid)
                            addcert(cid, estudiante_address, estudiante_name, fecha_emision, titulo)
                                .then((result2) => {
                                    Swal.fire('Certificado creado', '<a href="https://ipfs.io/ipfs/' + cid + '">IPFS</a>', 'success')
                                    .then((result3) => {
                                        window.location.href = "/verificarcertificado?id=" + cid;
                                    })
                                }) 
                        })
                        .catch(err => {
                            Swal.fire('Error al cargar el certificado al IPFS', err.message, 'error')
                        })

                }catch(err){
                    Swal.fire('Certificado no creado', err.message, 'error')
                    setbut_disable(false);
                }

            } 
          })
    }

    return (
        <>
            <Form
                onSubmit={(event) => {
                event.preventDefault()
                setbut_disable(true);
                sendform()
                }}
            >
                
                <Form.Group className="mb-3" controlId="estudiante_name">
                    <Form.Label>Nombre Estudiante</Form.Label>
                    <Form.Control 
                        type="text" 
                        onChange={(e)=>inputChangeHandler(setestudiante_name, e)}
                        placeholder="Pablo Perez" 
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="estudiante_address" required>
                    <Form.Label>Wallet Estudiante</Form.Label>
                    <Form.Control 
                        type="text" 
                        onChange={(e)=>inputChangeHandler(setestudiante_address, e)}
                        placeholder="0x0" 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="titulo">
                    <Form.Label>Titulo obtenido</Form.Label>
                    <Form.Control 
                        type="text" 
                        onChange={(e)=>inputChangeHandler(settitulo, e)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fecha_emision">
                    <Form.Label>Fecha Emision</Form.Label>
                    <Form.Control 
                        type="date" 
                        onChange={(e)=>inputChangeHandler(setfecha_emision, e)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ipfsfile" >
                    <Form.Label>Certificado</Form.Label>
                    <Form.Control type="file"  
                        required 
                    />
                </Form.Group>
                <Button type='submit' id='but_send' variant="success" disabled={but_disable} >
                    {but_text}
                </Button>
            </Form>
        </>
    );
}

export default CertificadoCrearForm;