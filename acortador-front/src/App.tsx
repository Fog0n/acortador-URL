import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col} from 'react-bootstrap';

import FormularioUrl from './componentes/FormularioUrl';
import PanelMetricas from './componentes/PanelMetricas';
import HistorialUrls from './componentes/HistorialUrls';
//import type {MetricasURL} from './types';

function App() {
  // Simulación de datos (Mock) de métricas para la demostración 



  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center text-center">
        <Col md={8}>
          <h1 className="mb-4">Acortador de URLs</h1>
          <p className="lead">Pega tu enlace largo y genera una vercion corta con métricas</p>

          <FormularioUrl />

          <HistorialUrls />

          <PanelMetricas />


        </Col>
      </Row>
    </Container>
  );

}

export default App;