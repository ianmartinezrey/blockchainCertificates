import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../css/style_global.css'

import Home from './Home';
import Institucion from './Institucion';
import CertificadoCrear from './CertificadoCrear'
import RepCertsAll from './RepCertsAll'
import RepCertsxInstitucion from './RepCertsxInstitucion'
import RepCertsxEstudiante from './RepCertsxEstudiante'
import CertificadoVerificar from './CertificadoVerificar'

class App extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/institucion" element={<Institucion />} />
                            <Route path="/crearcertificado" element={<CertificadoCrear />} />
                            <Route path="/verificarcertificado" element={<CertificadoVerificar />} />
                            <Route path="/certsall" element={<RepCertsAll />} />
                            <Route path="/certsxinstitucion" element={<RepCertsxInstitucion />} />
                            <Route path="/certsxestudiante" element={<RepCertsxEstudiante />} />
                        </Routes>
                    </div>
                    
                </div>
            </BrowserRouter>
        );
    }

}

export default App;