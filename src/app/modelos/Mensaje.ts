export interface Mensaje {
  id: number;
  id_chat: number;
  id_emisor: number;
  id_receptor: number;
  contenido: string;
  fecha: Date;
}
