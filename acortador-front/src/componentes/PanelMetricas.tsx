import {Card, Table, Badge} from 'react-bootstrap';
import type {MetricasURL} from '../types';

interface PanelMetricasProps {
    datos: MetricasURL;
}

function PanelMetricas({datos}: PanelMetricasProps) {
    return (
        <Card className= "shadow-sm p-4 mb-5 border-0 bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Metricas del Enlace</h4>
                <h4><Badge bg="primary">{datos.total_clics} Clics Totales</Badge></h4>
            </div>

            <div className="mb-3">
                <small className="text-muted d-block">URL Original:</small>
                <a href={datos.url_original} target="_blank" rel="noreferrer" className="text-truncate d-block" >
                    {datos.url_original}
                </a>
            </div>

            <h5 className="mt-4 mb-3">Historial Reciente</h5>
            <Table responsive striped bordered hover size="sm" className="bg-white">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Pais</th>
                        <th>Dispositivo</th>
                        <th>Referencia</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.historial.map((clic) => (
                        <tr key={clic.id_clic}>
                            <td>{new Date(clic.fecha_hora).toLocaleString()}</td>
                            <td>{clic.pais ||'Desconocido'}</td>
                            <td>{clic.dispositivo}</td>
                            <td>{clic.referencia}</td>
                        </tr>
                    ))}

                    {datos.historial.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center text-muted py-3">
                                Aún no hay clics registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Card>
    )
}

export default PanelMetricas;