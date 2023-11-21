import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { LoginDTO } from 'src/app/modelo/login-dto';
import { LoginPacienteDTO } from 'src/app/modelo/login-paciente-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginPacienteDTO: LoginPacienteDTO;
  loginDTO: LoginDTO;
  alerta!:Alerta;

  constructor(private authService: AuthService, private tokenService: TokenService){
    this.loginPacienteDTO = new LoginPacienteDTO();
    this.loginDTO = new LoginDTO();
  }

  public login(){

    this.authService.login(this.loginDTO).subscribe({
      next: data=> {
        this.tokenService.login(data.respuesta.token);
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

}
