import FormularioUrl from './componentes/FormularioUrl';
import PanelMetricas from './componentes/PanelMetricas';
import HistorialUrls from './componentes/HistorialUrls';
import { Container } from 'react-bootstrap';
import { Icon } from './icons';

function App() {
  return (
    <>
      {/* Cabecera con degradado: escala la tipografía según el ancho de pantalla */}
      <header className="app-header">
        <Container className="py-4 py-md-5 text-center">
          <h1 className="d-inline-flex align-items-center gap-2 flex-wrap justify-content-center">
            <Icon name="link" /> Acortador de URLs
          </h1>
          <p className="lead mb-0">
            Pega tu enlace largo y genera una versión corta con métricas de clics
          </p>
        </Container>
      </header>

      {/* Contenido principal: en móvil ocupa todo el ancho, en escritorio se centra */}
      <main className="app-content">
        <Container className="px-3 px-md-4" style={{ maxWidth: '860px' }}>
          <FormularioUrl />
          <PanelMetricas />
          <HistorialUrls />
        </Container>
      </main>

      <footer className="app-footer">
        Hecho con React, Bootstrap 5 y mucho ☕
      </footer>
    </>
  );
}

export default App;
