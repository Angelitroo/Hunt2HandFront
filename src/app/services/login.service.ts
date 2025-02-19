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
  private authState = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  authState$ = this.authState.asObservable();

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  setAuthState(isAuthenticated: boolean): void {
    this.authState.next(isAuthenticated);
  }

  login(loginData: Login): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, loginData);
  }

  register(registro: Registro): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/registro`, registro);
  }
}
