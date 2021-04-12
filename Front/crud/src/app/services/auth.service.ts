import { Injectable } from '@angular/core';
import { UserModel, IdentType, BasicResponse } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = 'https://localhost:44340/api';
  userToken: string;

  constructor( private http: HttpClient ) { }

  getIdentTypes(): Observable< IdentType[] > {

    return this.http.get<IdentType[]>(`${this.url}/TipoIdentificacions`);
  }

  logIn(user: UserModel): any {
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/Usuarios/PostUsuariosLogin`,
      authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['id'] );
        return resp;
      })
    );

  }

  newUser(newUser: UserModel): any {
    const authData = {
      ...newUser
    };

    return this.http.post(
      `${this.url}/Usuarios`,
      authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['id'] );
        return resp;
      })
    );
  }

  private saveToken( idToken: string ): void {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    const TODAY = new Date();
    TODAY.setSeconds(3600);

    localStorage.setItem('expires', TODAY.getTime().toString());

  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    this.userToken = '';

  }

  isAutenticated(): boolean  {

    if ( this.userToken ){
      if (this.userToken.length < 2) {
        return false;
      }
    }

    const EXPIRES = Number(localStorage.getItem('expires'));
    const EXPIRESDATE = new Date();
    EXPIRESDATE.setTime(EXPIRES);

    if (EXPIRESDATE > new Date() ){
      return true;
    } else{
      return false;
    }

  }

  getUsers(): Observable<any>{
    return this.http.get(`${this.url}/Usuarios`);
  }

  deleteUser( id: string ): Observable<UserModel> {

    return this.http.delete< UserModel >(`${this.url}/Usuarios/${id}` );
  }

  editUser( user: UserModel ): Observable<any> {

    return this.http.put(`${this.url}/Usuarios/${user.id}`, user );
  }

}
