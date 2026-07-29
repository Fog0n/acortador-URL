import {Container, Row, Col} from 'react-bootstrap';
import FormularioUrl from './componentes/FormularioUrl';
import PanelMetricas from './componentes/PanelMetricas';
import type {MetricasURL} from './types';

function App() {
  // Simulación de datos (Mock) de métricas para la demostración 
  const datosMock: MetricasURL = {
    hash_id: 'x7B9qW',
    url_original: 'https://www.ejemplo.com/una-url-muy-larga',
    url_corta: 'http://localhost:3000/x7B9qW',
    total_clics: 42,
    historial: [
      {
        id_clic: 1,
        fecha_hora: '2024-06-01T12:34:56Z',
        pais: 'España',
        dispositivo: 'Móvil',
        referencia: 'https://www.google.com'
      },
      {
        id_clic: 2,
        fecha_hora: '2024-06-02T14:20:30Z',
        pais: 'México',
        dispositivo: 'Escritorio',
        referencia: 'https://www.facebook.com'
      },
      {
        id_clic: 3,
        fecha_hora: '2024-06-03T09:15:45Z',
        pais: 'Argentina',
        dispositivo: 'Tablet',
        referencia: 'https://www.twitter.com'
      }
    ]
  }



  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center text-center">
        <Col md={8}>
          <h1 className="mb-4">Acortador de URLs</h1>
          <p className="lead">Pega tu enlace largo y genera una vercion corta con métricas</p>

          <FormularioUrl />

          <PanelMetricas datos={datosMock} />


        </Col>
      </Row>
    </Container>
  );

}

export default App;