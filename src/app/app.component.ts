import { Component } from '@angular/core';
import { ServicioLoginService } from './login/servicio-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  autenticado: boolean;
  constructor(private servicioLogin: ServicioLoginService) {
    servicioLogin.getLoggedInName.subscribe(name => this.changeName(name));
    if (this.servicioLogin.isLoggedIn()) {
      console.log("loggedin");
      this.autenticado = true;
    } else {
      this.autenticado = false;
    }
  }

  private changeName(name: boolean): void {
    this.autenticado = !name;
  }

  logout() {
    this.servicioLogin.deleteToken();
    window.location.href = "/home";

  }
}
