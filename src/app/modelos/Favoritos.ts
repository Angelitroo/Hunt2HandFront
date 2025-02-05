import {Perfil} from "./Perfil";
import {Producto} from "./Producto";

export interface Favoritos {
  id: number;
  perfil: Perfil;
  producto: Producto;
}
