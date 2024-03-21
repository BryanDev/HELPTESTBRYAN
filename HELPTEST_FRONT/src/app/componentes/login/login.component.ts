import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { RecaptchaService } from '../../servicios/recaptcha.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaV3Module,ReCaptchaV3Service } from 'ng-recaptcha';
import { response } from 'express';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RecaptchaV3Module],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  data: any[] = [];
  mensajeconfirmacion: string | undefined;
  mensajealerta: string | undefined;
  mensajeerror: string | undefined;
  usuario: string = '';
  contrasena: string = '';
  vercontrasena: boolean = false;
  captcharesuelto : boolean = false;
  captchahabilitado : boolean = true;
  tokencaptcha : string = '';

  constructor(
  private loginService: LoginService,
  private RecaptchaService :RecaptchaService,
  private router: Router,
  private recaptchaV3Service: ReCaptchaV3Service,
  ) {
  }

  /*esta parte crear el token*/
  iniciarCaptcha(){
    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token: string) => {
     // console.debug(`Token [${token}] generated`);
      this.tokencaptcha = token;
    });
  }

  /*aqui enviamos el token al back para ver si es valido */

  validarTockenCaptcha(){
    this.RecaptchaService.validarCaptcha(this.tokencaptcha).subscribe(response =>{
      this.data = response.body;
      console.log(`Captcha valido con un ${response.body.score}% de validez desde:${response.body.hostname}`)
      console.log(this.data)
      console.log(response.body.success)
      if (response.body.success == true) {
        this.captcharesuelto = true;
      } else {
        if(response.tipomsg == 'INFO'){
          this.mensajeconfirmacion = response.msg;
        }else if(response.tipomsg == 'ERROR'){
          this.mensajeerror = response.msg;
        }else{
          this.mensajealerta = response.msg;
        }
        this.captcharesuelto = false;
      }
      this.iniciarCaptcha()
    })
}


  contrasenaVisible(): void {
    this.vercontrasena = !this.vercontrasena;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
        passwordField.type = this.vercontrasena ? 'text' : 'password';
    }
  }


  iniciarSesion() {

    if(this.captchahabilitado == true || this.captcharesuelto== true){
      this.loginService.loguearse(this.usuario, this.contrasena).subscribe(response => {
        this.data = response.body;
        console.log(this.data);
        if (response.logueado === true) {
          this.router.navigate(['paginaprincipal']);
        } else {
          if(response.tipomsg == 'INFO'){
            this.mensajeconfirmacion = response.msg;
          }else if(response.tipomsg == 'ERROR'){
            this.mensajeerror = response.msg;
          }else{
            this.mensajealerta = response.msg;
          }
        }
      });
    }else{
      this.mensajeerror = 'captcha no resuelto';
    }



    setTimeout(() => {
      this.mensajeconfirmacion = undefined;
      this.mensajeerror = undefined;
      this.mensajealerta = undefined;
      //window.location.reload();
    }, 4000);

  }

  ngOnInit(): void {
    this.iniciarCaptcha()

  }
}

