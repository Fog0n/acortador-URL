import { API_ENDPOINTS, getUrlCorta } from '../config';
import { useState, useEffect } from 'react';

export default function HistorialUrls() {
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
        console.error('Error cargando el historial', error);
      }
    };

    cargarHistorial();
  }, []);

  return (
    <div style={{ marginTop: '2rem', textAlign: 'left', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>Historial de Enlaces Acortados</h3>
      {historial.length === 0 ? (
        <p>Aún no hay enlaces en el historial.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {historial.map((item: any) => (
            <li 
              key={item.id} 
              style={{ 
                background: '#f9f9f9', 
                margin: '10px 0', 
                padding: '12px', 
                borderRadius: '5px',
                border: '1px solid #ddd'
              }}
            >
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
                🔗 <a href={getUrlCorta(item.hash_id)} target="_blank" rel="noopener noreferrer">
                  {getUrlCorta(item.hash_id)}
                </a>
              </p>
              <p style={{ margin: 0, fontSize: '0.9em', color: '#555', wordBreak: 'break-all' }}>
                Original: {item.url_original}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}