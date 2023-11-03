import { Component } from '@angular/core';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroPacienteDTO: RegistroPacienteDTO;
  ciudades:string[];

  constructor(){
    this.registroPacienteDTO= new RegistroPacienteDTO();
    this.ciudades = [];
    this.cargarCiudades();
  }

  public registrar(){
    console.log(this.registroPacienteDTO);
  }

  public sonIguales():boolean{
    return this.registroPacienteDTO.password == this.registroPacienteDTO.confirmaPassword;
  }

  private cargarCiudades(){
    this.ciudades.push("Armenia");
    this.ciudades.push("Calarcá");
    this.ciudades.push("Pereira");
    this.ciudades.push("Manizales")
    this.ciudades.push("Medellin")
  }

  public onFileChange(event:any){
    if(event.target.files.length > 0){
    const files = event.target.files;
    console.log(files);
    }
  }

}
