import {useState, FormEvent} from "react";
import {Form, Button, Alert, Card,InputGroup, Spinner} from "react-bootstrap";

function FormularioUrl() {
    //estado para almacenar lo que el usuario escribe y la respuesta del servidor
    const [urlLarga, setUrlLarga] = useState('');
    const [urlCorta, setUrlCorta] = useState('');
    const [cargado, setCargado] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

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
            const respuesta = await fetch('http://localhost:3000/api/urls/acortar',{
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
        <Card className= "shadow-sm p-4 mb-5 border-0 bg-light">
            <Form onSubmit={manejarEnvio}>
                <InputGroup className="mb-3 size-lg">
                    <Form.Control
                        placeholder="Pega tu URL larga aquí (ej. https://www.ejemplo.com/una-url-muy-larga)"
                        value={urlLarga}
                        onChange={(e)=> setUrlLarga(e.target.value)}
                        required
                        type="url"
                        disabled={cargado}
                    />
                    <Button variant="primary" type="submit" disabled={cargado}>
                        {cargado ? <Spinner animation="border" size="sm"/>:'Acortar URL'}
                    </Button>
                </InputGroup>
            </Form>

            {/* Mostrar mensaje de error si el servidor falla */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Mostrar la URL corta que viene del backend */}
            {urlCorta && (
                <Alert variant="success" className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                        <strong>URL acortada:</strong>
                        <a href={urlCorta} target="_blank" rel="noreferrer">
                            {urlCorta}
                        </a>
                    </div>
                    <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(urlCorta)}
                    >
                        Copiar
                    </Button>
                </Alert>  
            )}
        </Card>
    )
}

export default FormularioUrl;