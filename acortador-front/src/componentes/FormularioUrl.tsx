import {useState} from "react";
import {Form, Button, Alert, Card, InputGroup} from "react-bootstrap";

function FormularioUrl() {
    //estado para almacenar lo que el usuario escribe y la respuesta del servidor
    const [urlLarga, setUrlLarga] = useState('');
    const [urlCorta, setUrlCorta] = useState('');

    const manejarEnvio = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); //evita que la pagina se recargue

        //Aquí iría la lógica para enviar la URL larga al servidor y obtener la URL corta
        //Por ahora, simularemos la respuesta del servidor generando una URL corta aleatoria
        if (urlLarga) {
            setUrlCorta('http://localhost:3000/x7B9qW');
            setUrlLarga(''); //limpia el campo de entrada
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
                    />
                    <Button variant="primary" type="submit">
                        Acortar URL
                    </Button>
                </InputGroup>
            </Form>

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