import { API_ENDPOINTS } from "../config";
import { useState } from "react";
import type { FormEvent } from "react";
import {Form, Button, Alert, Card,InputGroup, Spinner} from "react-bootstrap";
import { Icon } from "../icons";

function FormularioUrl() {
    //estado para almacenar lo que el usuario escribe y la respuesta del servidor
    const [urlLarga, setUrlLarga] = useState('');
    const [urlCorta, setUrlCorta] = useState('');
    const [cargado, setCargado] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [copiado, setCopiado] = useState(false);

    const copiarAlPortapapeles = async (texto: string) => {
        try {
            await navigator.clipboard.writeText(texto);
        } catch {
            // Fallback para navegadores/contextos sin API de portapapeles
            const t = document.createElement('textarea');
            t.value = texto;
            document.body.appendChild(t);
            t.select();
            document.execCommand('copy');
            document.body.removeChild(t);
        }
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
    };

    const manejarEnvio = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault(); //evita que la pagina se recargue
        setError('');
        setUrlCorta('');
        //Aquí iría la lógica para enviar la URL larga al servidor y obtener la URL corta
        //Por ahora, simularemos la respuesta del servidor generando una URL corta aleatoria
        if (!urlLarga) return;

        setCargado(true);
        try{
            //Hacemos la peticion real al servidor para acortar la URL
            const respuesta = await fetch(`${API_ENDPOINTS}/acortar`,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({url_original: urlLarga}),
            });
            
            const datos = await respuesta.json();

            console.log("Datos del servidor:",datos);

            if (!respuesta.ok){
                throw new Error(datos.error || 'Ocurrio un error al acortar la URL');
            }

            //Guardamos la Url que nos devuelve el servidor
            setUrlCorta(datos.url_corta);
            setUrlLarga('');//Limpiamos el input
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error de conexión con el servidor');
            }
        } finally {
            setCargado(false);
        }
    };

    return (
        <Card className="card-app border-0 shadow-sm mb-4">
            <Card.Body className="p-3 p-md-4">
                <div className="mb-3 d-flex align-items-center gap-2">
                    <span className="badge-icono bg-primary-subtle text-primary">
                        <Icon name="scissors" />
                    </span>
                    <div>
                        <h2 className="section-title mb-0">Acortar una URL</h2>
                        <p className="section-subtitle mb-0">Pega tu enlace largo y genera uno corto al instante</p>
                    </div>
                </div>
                <Form onSubmit={manejarEnvio}>
                    {/* En móvil el InputGroup se apila verticalmente (clase .grupo-form-movil) */}
                    <InputGroup className="grupo-form-movil mb-0">
                        <Form.Control
                            className="form-input-app"
                            placeholder="Pega tu URL larga aquí (ej. https://ejemplo.com/larga)"
                            value={urlLarga}
                            onChange={(e)=> setUrlLarga(e.target.value)}
                            required
                            type="url"
                            inputMode="url"
                            autoComplete="off"
                            disabled={cargado}
                            aria-label="URL larga a acortar"
                        />
                        <Button variant="primary" className="btn-acortar" type="submit" disabled={cargado}>
                            {cargado
                                ? <Spinner animation="border" size="sm"/>
                                : <><Icon name="lightning" className="me-1" />Acortar URL</>}
                        </Button>
                    </InputGroup>
                </Form>

                {/* Mostrar mensaje de error si el servidor falla */}
                {error && <Alert variant="danger" className="mt-3 mb-0">{error}</Alert>}

                {/* Mostrar la URL corta que viene del backend */}
                {urlCorta && (
                    <Alert variant="success" className="resultado-fila d-flex flex-wrap justify-content-between align-items-center mt-3 mb-0">
                        <div className="resultado-url d-flex flex-wrap justify-content-between align-items-center gap-2">
                            <div>
                                <strong>
                                    <Icon name="check" className="me-1" />
                                    URL acortada:{' '}
                                </strong>
                                <a href={urlCorta} target="_blank" rel="noreferrer">
                                    {urlCorta}
                                </a>
                            </div>
                            <Button
                                variant="outline-success"
                                size="sm"
                                className="btn-copiar"
                                onClick={() => copiarAlPortapapeles(urlCorta)}
                            >
                                <Icon name={copiado ? 'clipboard-check' : 'copy'} className="me-1" />
                                {copiado ? '¡Copiado!' : 'Copiar'}
                            </Button>
                        </div>
                    </Alert>
                )}
            </Card.Body>
        </Card>
    )
}

export default FormularioUrl;