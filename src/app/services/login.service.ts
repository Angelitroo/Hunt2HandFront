import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Login} from "../modelos/Login";
import {Registro} from "../modelos/Registro";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authState = new BehaviorSubject<boolean>(!!sessionStorage.getItem('authToken'));
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {
  }
  setAuthState(isAuthenticated: boolean): void {
    this.authState.next(isAuthenticated);
  }


  loguear(login: Login): Observable<any>{
    return this.http.post<any>(`api/auth/login`,login) ;
  }

  autorizarPeticion() {
    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
    });

    return {headers: headers}
  }



  registrar(registro: Registro): Observable<any>{
    return this.http.post<any>(`api/auth/registro/perfil`,registro) ;
  }

}
