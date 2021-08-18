import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioNoticiasService {
  sUrlApi = environment.apiPortal;
  constructor(private httpClient: HttpClient) { }

  listarSecciones() {
    return this.httpClient.get(`${this.sUrlApi}/f_ListarSecciones`);
  }

  crearNoticia(objNoticia, archivo) {
    return this.httpClient.post<any>(this.sUrlApi + "/f_CrearNoticia", { "form": JSON.stringify(objNoticia), "archivo": archivo, "token": localStorage.getItem('token') });
  }
}
