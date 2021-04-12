import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserModel, IdentType } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel;
  rememberUser = false;
  identType = Array<IdentType>();

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.user = new UserModel();
    this.user.idTipoIdentificacion = null;

    this.getIdentType();

  }

  getIdentType( ): void {

    this.auth.getIdentTypes().subscribe( resp => {
      this.identType = resp;
    });

  }

  onSubmit(form: NgForm): any {
    if (form.invalid) {
      return false;
    }
    this.user.idTipoIdentificacion = form.value.idTipoIdentificacion;
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info'
    });
    Swal.showLoading();

    this.auth.newUser( this.user ).subscribe( resp => {

      Swal.close();

      if ( this.rememberUser ) {
        localStorage.setItem( 'numeroIdentificaion', String(this.user.numeroIdentificaion) );
      }else {
        localStorage.removeItem('numeroIdentificaion');
      }

      this.router.navigateByUrl('/home');

    }, ( error ) => {

      Swal.fire({
        title: 'Error',
        text: error.error,
        icon: 'error'
      });

    });
  }


}
