// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificadosAcademicos {
    struct Certificado {
        address estudiante;
        string nombre;
        address institucion;
        string fechaEmision;
        string titulo;
        bool autorizado;
        string ipfsHash;
    }

    mapping(string => Certificado) public certificados;
    Certificado[] private certs;

    struct InstitucionAcademica {
        address institucion;
        string institucion_name;
        string resolucion;
        bool estado;
    }

    mapping(address => InstitucionAcademica) public instituciones;
    InstitucionAcademica[] private insts;

    event CertificadoEmitido(address indexed estudiante, string ipfsHash, string nombre, address institucion, string fechaEmision, string titulo);
    event CertificadoAutorizado(string indexed estudiante, string ipfsHash, uint fechaAutorizacion);
    event InstitucionAgregada(address indexed institucion, string institucion_name, string resolucion, bool estado);
    event EstadoInstitucionActualizado(address indexed institucion, bool estado);

    function emitirCertificado(
        string memory ipfsHash,
        address estudiante,
        string memory nombre,
        string memory fechaEmision,
        string memory titulo
    ) public {
        //require(instituciones[msg.sender].institucion == address(0), "La direccion del emisor no se encuentra autorizada para emitir certificados");
        require(certificados[ipfsHash].estudiante == address(0), "El certificado ya existe.");

        Certificado memory nuevoCertificado = Certificado({
            estudiante: estudiante,
            nombre: nombre,
            institucion: msg.sender,
            fechaEmision: fechaEmision,
            titulo: titulo,
            autorizado: false,
            ipfsHash: ipfsHash
        });

        certs.push(nuevoCertificado);
        certificados[ipfsHash] = nuevoCertificado; // Almacenar el certificado en el mapping
        emit CertificadoEmitido(estudiante, ipfsHash, nombre, msg.sender, fechaEmision, titulo);
    }
    
    function obtenerTodosLosCertificados() public view returns (string[] memory) {
        string[] memory certificadosGenerados = new string[](certs.length);
        uint contador = 0;

        // Recorrer todos los certificados y agregar los hash IPFS a la lista
        for (uint i = 0; i < certs.length; i++) {
            string memory ipfsHash = certs[i].ipfsHash;
            certificadosGenerados[contador] = ipfsHash;
            contador++;
        }

        return certificadosGenerados;
    }
    
    // Obtener todos los certificados emitidos
    function getAllCertificados() public view returns (Certificado[] memory) {
        return certs;
    }

    function getCertsxEstudiante(address estudiante) public view returns (Certificado[] memory) {
        Certificado[] memory certificadosGenerados = new Certificado[](certs.length);
        uint contador = 0;

        // Recorrer todos los certificados y agregar los hash IPFS a la lista
        for (uint i = 0; i < certs.length; i++) {
            if (estudiante == certs[i].estudiante) {
                certificadosGenerados[contador] = certs[i];
                contador++;
            }
        }

        return certificadosGenerados;
    }

    function getCertsxInstitucion(address institucion) public view returns (Certificado[] memory) {
        Certificado[] memory certificadosGenerados = new Certificado[](certs.length);
        uint contador = 0;

        // Recorrer todos los certificados y agregar los hash IPFS a la lista
        for (uint i = 0; i < certs.length; i++) {
            if (institucion == certs[i].institucion) {
                certificadosGenerados[contador] = certs[i];
                contador++;
            }
        }

        return certificadosGenerados;
    }

    function verCertificadoPorIPFS(string memory ipfsHash) public view returns (Certificado memory) {
        Certificado storage cert = certificados[ipfsHash];
        require(cert.estudiante != address(0), "Certificado no encontrado para el hash IPFS proporcionado.");
        return cert;
    }

    function autorizarCertificado(string memory ipfsHash) public {
        Certificado storage cert = certificados[ipfsHash];
        require(cert.estudiante != address(0), "Certificado no encontrado para el hash IPFS proporcionado.");
        require(cert.autorizado == false, "El certificado ya esta autorizado.");
        cert.autorizado = true;
        emit CertificadoAutorizado(addressToString(cert.estudiante), ipfsHash, block.timestamp);
    }

    //operaciones institucion
    function agregarInstitucion(
        address institucion_wallet,
        string memory institucion_name,
        string memory resolucion
    ) public {
        require(!instituciones[institucion_wallet].estado, "La institucion ya esta registrada.");
        InstitucionAcademica memory nuevaInstitucion = InstitucionAcademica({
            institucion: institucion_wallet,
            institucion_name: institucion_name,
            resolucion: resolucion,
            estado: true
        });

        insts.push(nuevaInstitucion);
        instituciones[institucion_wallet] = nuevaInstitucion;
        emit InstitucionAgregada(institucion_wallet, institucion_name, resolucion, true);
    }

    function actualizarEstadoInstitucion(address institucion_wallet, bool nuevoEstado) public {
        require(instituciones[institucion_wallet].estado, "La institucion no esta registrada.");
        instituciones[institucion_wallet].estado = nuevoEstado;
        emit EstadoInstitucionActualizado(institucion_wallet, nuevoEstado);
    }

    function institucionExisteYActiva(address institucion_wallet) internal view returns (address) {
        return instituciones[institucion_wallet].institucion;
    }

    function getAllInstituciones() public view returns (InstitucionAcademica[] memory) {
        return insts;
    }


    // Función auxiliar para convertir una dirección Ethereum en una cadena (para el evento)
    function addressToString(address _address) internal pure returns (string memory) {
        bytes32 _bytes = bytes32(uint256(uint160(_address)));
        bytes memory HEX = "0123456789ABCDEF";
        bytes memory _string = new bytes(42);
        _string[0] = "0";
        _string[1] = "x";
        for (uint i = 0; i < 20; i++) {
            _string[2 + i * 2] = HEX[uint8(_bytes[i + 12] >> 4)];
            _string[3 + i * 2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
        }
        return string(_string);
    }


}
