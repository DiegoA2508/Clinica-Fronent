import { Component } from '@angular/core';
import { LoginPacienteDTO } from 'src/app/modelo/login-paciente-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginPacienteDTO = LoginPacienteDTO;

  constructor(){
    this.loginPacienteDTO = LoginPacienteDTO;
  }

  public ingresar(){
    console.log(this.loginPacienteDTO);
  }

}
