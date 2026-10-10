import { API_ENDPOINTS, getUrlCorta } from '../config';
import { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Badge, Spinner } from 'react-bootstrap';
import { Icon } from '../icons';

interface ItemHistorial {
  id: number;
  hash_id: string;
  url_original: string;
  clicks?: number;
  fecha_creacion?: string;
}

export default function PanelMetricas() {
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
        console.error('Error al cargar el historial:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarHistorial();
  }, []);

  // Totales calculados a partir del historial
  const totalClicks = historial.reduce((acc, item) => acc + (item.clicks || 0), 0);
  const totalUrls = historial.length;

  const formatearFecha = (fecha?: string) => {
    if (!fecha) return '—';
    const d = new Date(fecha);
    return Number.isNaN(d.getTime())
      ? '—'
      : d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <Card className="card-app border-0 shadow-sm mb-4">
      <Card.Body className="p-3 p-md-4">
        {/* Encabezado de la sección */}
        <div className="mb-3">
          <h2 className="section-title">
            <Icon name="bar-chart" className="me-2 text-primary" />
            Métricas del Enlace
          </h2>
          <p className="section-subtitle mb-0">Resumen de actividad de tus URLs acortadas</p>
        </div>

        {/* Tarjetas de estadísticas con el grid de Bootstrap: 2 columnas en móvil, 2 expandidas en escritorio */}
        <Row className="g-2 g-md-3 mb-4">
          <Col xs={6}>
            <div className="stat-card">
              <div className="stat-icon bg-primary-subtle text-primary">
                <Icon name="link" />
              </div>
              <div>
                <div className="stat-value">{cargando ? '…' : totalUrls}</div>
                <div className="stat-label">Enlaces creados</div>
              </div>
            </div>
          </Col>
          <Col xs={6}>
            <div className="stat-card">
              <div className="stat-icon bg-success-subtle text-success">
                <Icon name="cursor" />
              </div>
              <div>
                <div className="stat-value">{cargando ? '…' : totalClicks}</div>
                <div className="stat-label">Clics totales</div>
              </div>
            </div>
          </Col>
        </Row>

        <h3 className="subtitulo-seccion">Historial reciente</h3>

        {/* Tabla nativa de Bootstrap con .table-responsive: scroll horizontal táctil en móvil sin romper el layout */}
        {cargando ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" size="sm" className="me-2" />
            <span className="text-secondary">Cargando métricas…</span>
          </div>
        ) : historial.length === 0 ? (
          <div className="estado-vacio">
            <Icon name="bar-chart" className="d-block mx-auto mb-2 fs-3 text-secondary" />
            No hay registros en el historial todavía.
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover size="sm" className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Enlace corto</th>
                  <th>URL original</th>
                  <th className="text-center">Clics</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((item) => (
                  <tr key={item.id}>
                    <td className="text-nowrap text-secondary">{formatearFecha(item.fecha_creacion)}</td>
                    <td>
                      <a
                        className="enlace-hash text-decoration-none fw-semibold"
                        href={getUrlCorta(item.hash_id)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        /{item.hash_id}
                        <Icon name="box-arrow-up-right" className="ms-1 small" />
                      </a>
                    </td>
                    <td className="celda-url text-secondary" title={item.url_original}>
                      {item.url_original}
                    </td>
                    <td className="text-center">
                      <Badge bg="primary" pill>
                        {item.clicks ?? 0}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
