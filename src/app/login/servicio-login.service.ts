import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioLoginService {
  sUrlApi = environment.apiPortal;

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public login(user, password) {
    return this.httpClient.post<any>(this.sUrlApi + "/f_Login", { 'usuario': user, 'contrasenia': password }).pipe(map(result => {
      if (!result.data[0].hasOwnProperty("mensaje")) {
        this.setToken(result.data[0].cedula);
        this.getLoggedInName.emit(true);
      }
      return result;
    }));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
}
