import { API_ENDPOINTS, getUrlCorta } from '../config';
import { useState, useEffect } from 'react';
import { Card, ListGroup, Spinner } from 'react-bootstrap';
import { Icon } from '../icons';

interface ItemHistorial {
  id: number;
  hash_id: string;
  url_original: string;
}

export default function HistorialUrls() {
  const [historial, setHistorial] = useState<ItemHistorial[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const respuesta = await fetch(API_ENDPOINTS);
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setHistorial(datos);
        }
      } catch (error) {
        console.error('Error cargando el historial', error);
      } finally {
        setCargando(false);
      }
    };

    cargarHistorial();
  }, []);

  return (
    <Card className="card-app border-0 shadow-sm">
      <Card.Body className="p-3 p-md-4">
        <div className="mb-3">
          <h2 className="section-title">
            <Icon name="clock" className="me-2 text-primary" />
            Historial de Enlaces Acortados
          </h2>
          <p className="section-subtitle mb-0">Tus enlaces generados recientemente</p>
        </div>

        {cargando ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" size="sm" className="me-2" />
            <span className="text-secondary">Cargando historial…</span>
          </div>
        ) : historial.length === 0 ? (
          <div className="estado-vacio">
            <Icon name="clock" className="d-block mx-auto mb-2 fs-3 text-secondary" />
            Aún no hay enlaces en el historial.
          </div>
        ) : (
          <ListGroup variant="flush" className="lista-historial">
            {historial.map((item) => (
              <ListGroup.Item key={item.id} className="item-historial px-0">
                <a
                  className="url-corta-link fw-semibold text-decoration-none"
                  href={getUrlCorta(item.hash_id)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="link-45deg" className="me-1 text-primary" />
                  {getUrlCorta(item.hash_id)}
                </a>
                <p className="url-original text-secondary small mb-0 mt-1">
                  Original: {item.url_original}
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}
