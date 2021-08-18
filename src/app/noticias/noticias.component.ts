import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServicioNoticiasService } from './servicio-noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  frmNoticia: FormGroup;
  enviado = false;
  datosNoticia = {
    titulo: null,
    imagen: null,
    contenido: null,
    seccion: null,
    autor: null
  }
  secciones: null;
  archivo = {
    nombreArchivo: null,
    base64textString: null
  }

  constructor(private servicioNoticias: ServicioNoticiasService, private formBuilder: FormBuilder, private router: Router) {
    servicioNoticias.listarSecciones().subscribe(
      datos => {
        if (datos["resultado"]) {
          this.secciones = datos["data"];
        }
      }
    );
  }

  ngOnInit() {
    this.frmNoticia = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      contenido: ['', Validators.required],
      seccion: ['', Validators.required],
      autor: ['', Validators.required]
    });
  }

  seleccionarArchivo(event) {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;

    if(files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }

  get f() { return this.frmNoticia.controls; }
  f_CrearNoticia() {
    this.enviado = true;
    if (this.frmNoticia.invalid) {
      return;
    }
    this.servicioNoticias.crearNoticia(this.frmNoticia.value, this.archivo).subscribe(
      res => {
        if (res["resultado"]) {
          alert(res["data"][0].mensaje);
          const redirect = '/noticias';
          this.router.navigate([redirect]);
        }
      }
    );
  }
}
