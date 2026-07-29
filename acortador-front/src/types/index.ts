
//Interfaz para cada clic individual
export interface DetalleClic{
    id_clic: number;
    fecha_hora: string;
    pais: string;
    dispositivo: string;
    referencia: string;
}

//Interfaz principal para las metricas de una URL
export interface MetricasURL{
    hash_id: string;
    url_original: string;
    url_corta: string;
    total_clics: number;
    historial: DetalleClic[];

}