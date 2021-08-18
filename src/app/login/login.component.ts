import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServicioLoginService } from './servicio-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  frmLogin: FormGroup;
  enviado = false;
  datosLogin = {
    idPersona: null,
    user: null,
    password: null
  }
  constructor(private servicioLogin: ServicioLoginService, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit() {
    this.frmLogin = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.frmLogin.controls; }
  f_IniciarSesion() {
    this.enviado = true;
    if (this.frmLogin.invalid) {
      return;
    }
    this.servicioLogin.login(this.frmLogin.value.user, this.frmLogin.value.password)
      .pipe(map(res => {
        if (!res.data[0].hasOwnProperty("mensaje")) {
          alert("Usuario Autenticado");
        } else {
          alert(res.data[0].mensaje);
        }
      }))
      .subscribe(
        data => {
          const redirect = '/noticias';
          this.router.navigate([redirect]);
        });
  }
}
