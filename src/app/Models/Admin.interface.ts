import { Time } from "@angular/common";

export interface AdminI{    
    ciudadOrigen: string;
    ciudadDestino: string;
    fecha: Date;
    horaSalida: Date;
    horaLlegada: Date;
    numeroVuelo: number;
    aerolinea: string;
    estadoVuelo: string;
}