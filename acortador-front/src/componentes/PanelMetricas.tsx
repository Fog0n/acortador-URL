import { API_ENDPOINTS, getUrlCorta } from '../config';
import { useState, useEffect } from 'react';

export default function PanelMetricas() {
  const [historial, setHistorial] = useState([]);

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
      }
    };

    cargarHistorial();
  }, []);

  // Calculamos el total de clics sumando los clics de cada elemento del historial
  const totalClicksCalculados = historial.reduce((acc: number, item: any) => acc + (item.clicks || 0), 0);
  const totalUrlsCalculadas = historial.length;

  return (
    <div style={{ marginTop: '2rem', padding: '25px', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', textAlign: 'left', border: '1px solid #e1e4e8' }}>
      
      {/* Encabezado con el botón azul usando la suma directa de la tabla */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#1f2937', fontSize: '1.4rem' }}>Métricas del Enlace</h2>
        <div style={{ background: '#2563eb', color: '#ffffff', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem' }}>
          {totalClicksCalculados} Clics Totales
        </div>
      </div>

      <p style={{ color: '#4b5563', fontSize: '0.95rem', marginBottom: '25px' }}>
        Total de enlaces administrados: <strong>{totalUrlsCalculadas}</strong>
      </p>

      <h3 style={{ color: '#374151', fontSize: '1.1rem', marginBottom: '15px', borderBottom: '2px solid #f3f4f6', paddingBottom: '8px' }}>
        Historial Reciente
      </h3>

      {/* Tabla del historial */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px' }}>Fecha</th>
              <th style={{ padding: '12px' }}>Enlace Corto</th>
              <th style={{ padding: '12px' }}>URL Original</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Clics</th>
            </tr>
          </thead>
          <tbody>
            {historial.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                  No hay registros en el historial todavía.
                </td>
              </tr>
            ) : (
              historial.map((item: any, index: number) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0', background: index % 2 === 0 ? '#ffffff' : '#fcfcfc' }}>
                  <td style={{ padding: '12px', color: '#334155' }}>
                    {new Date(item.fecha_creacion).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <a href={getUrlCorta(item.hash_id)} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
                      /{item.hash_id}
                    </a>
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.url_original}>
                    {item.url_original}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#0f172a' }}>
                    {item.clicks || 0}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}