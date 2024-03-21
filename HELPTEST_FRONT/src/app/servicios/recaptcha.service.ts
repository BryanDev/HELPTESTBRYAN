import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  private url = 'http://127.0.0.1:3000/helptestback/capcha/'
  constructor(private http:HttpClient) {

   }

   public validarCaptcha(token: String) :Observable<any> {
    const respuestaToken = `${this.url}${token}`;
    return this.http.post<any>(respuestaToken, {});
  }
}
