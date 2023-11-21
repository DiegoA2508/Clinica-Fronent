import { Component } from '@angular/core';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Alerta } from 'src/app/modelo/alerta';
import { ImagenService } from 'src/app/servicios/imagen.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroPacienteDTO: RegistroPacienteDTO;
  ciudades:string[];
  alerta!:Alerta;

  constructor(private imagenService: ImagenService,private authService: AuthService,private clinicaService: ClinicaService){
    this.registroPacienteDTO= new RegistroPacienteDTO();
    this.ciudades = [];
    this.cargarCiudades();
  }

  public registrar(){

    if(this.registroPacienteDTO.urlFoto.length != 0){
      this.authService.registrarPaciente(this.registroPacienteDTO).subscribe({
        next: data => {
          this.alerta = { mensaje: data.respuesta, tipo: "sucess"}
        },
        error: error =>{
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger"}
        }
      });

    }else{
      this.alerta = { mensaje: "Debe subir una imagen", tipo: "danger" }
    }
  }

  public sonIguales():boolean{
    return this.registroPacienteDTO.password == this.registroPacienteDTO.confirmaPassword;
  }

  private cargarCiudades(){
    this.clinicaService.listarCiudades().subscribe({
      next: data => {
        this.ciudades = data.respuesta
      },
      error: error => {
        console.log(error)
      }
    });

  }

  public onFileChange(event:any){
    if(event.target.files.length > 0){
      this.registroPacienteDTO.urlFoto = event.target.files[0].name;
    }
  }

  public subirImagen(){
    if (this.alerta != null && this.alerta){

      const formData = new FormData();

      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.registroPacienteDTO.urlFoto = data.respuesta.url;
        },
        error: error => {
          this.alerta = { mensaje: error.error, tipo: "danger"};
        }
      });

    } else {
      this.alerta = { mensaje: 'Debe seleccionar una imagen y subirla', tipo: "danger"};
    }
  }

}
