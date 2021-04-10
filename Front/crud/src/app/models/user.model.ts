

export class UserModel {
    id: string  ;
    nombre: string ;
    apellido: string ;
    idTipoIdentificacion: string ;
    numeroIdentificaion: string ;
    contrasena: string ;
    correo: string ;
}

export class IdentType {
     id: string;
     nombre: string;
     acronimo: string;
 }

export class BasicResponse {
     success: boolean;
     msg: string;
     data: Array< any >;
}
