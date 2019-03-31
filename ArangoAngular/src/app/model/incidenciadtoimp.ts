import { IncidenciaDTO, EmpleadoDTO } from './model';

export class IncidenciaDTOImp implements IncidenciaDTO {
    origen = ''; destino = '';
    titulo = '';
    descripcion = '';
    fechaInicio = new Date();
    fechaFin = null;
    urgente = false;
    key = '';

    constructor(empOrigen: EmpleadoDTO) {
        this.origen = empOrigen.username;
    }
}
