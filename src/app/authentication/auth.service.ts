import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response.model';
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { ServicesUtil } from '../util/services.util';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient,
    private servicesUtil: ServicesUtil) { }

  register(email: string, password: string){


    return this.http.post<AuthResponse>(`${this.servicesUtil.registerUrl}${this.servicesUtil.api_key}`,{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response =>{

        this.handleUser(response.email,response.localId,response.idToken,response.expiresIn)

      }),
      catchError(this.handleError)
    );

  }

  logout(){
    this.user.next(null);
    localStorage.removeItem("user");
  }

  login(email: string, password: string){
    return this.http.post<AuthResponse>(`${this.servicesUtil.loginUrl}${this.servicesUtil.api_key}`,{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response =>{

        this.handleUser(response.email,response.localId,response.idToken,response.expiresIn)
      }),
      catchError(this.handleError)
    );
  }

  autoLogin(){
    if (localStorage.getItem("user") == null) {
      return;
    }else{
      const user = JSON.parse(localStorage.getItem('user') || "{}");
      
      const currentUser = new User(user.email,user.id,user._token,new Date(user._tokenExpirationDate))
      if (currentUser.token) {
        this.user.next(currentUser);
      }
    }
  }

  private handleError(err: HttpErrorResponse){
    let message = "Hata oluştu";

    if (err.error.error) {
      switch (err.error.error.message) {
        case "INVALID_PASSWORD":
         message = "Hatalı şifre";
          break;
      
        case "EMAIL_NOT_FOUND":
          message = "Kullanıcı bulunamadı";
          break;

        case "EMAIL_EXISTS":
          message= "Bu mail adresi zaten kullanılıyor.";
          break;  

        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "Daha sonra tekrar deneyin.";
          break; 

        default:
          break;
      }
    }
    return throwError(()=>message);
  }

  private handleUser(email: string, localId: string, idToken: string, expiresIn: string){
    
    const expirationDate = new Date(new Date().getTime() + (Number(expiresIn) * 1000));
    const user = new User(email, localId, idToken,expirationDate);
    
    this.user.next(user);

    localStorage.setItem("user", JSON.stringify(user));
  }
}
