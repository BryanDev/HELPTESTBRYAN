import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://127.0.0.1:3000/helptestback/login/iniciarsesion/'

  constructor(private http:HttpClient) { }




  public loguearse(usuario: String, contrasena: String) :Observable<any> {
    const urlconparametros = `${this.url}${usuario}/${contrasena}`;
    return this.http.post<any>(urlconparametros, {});
  }
}
