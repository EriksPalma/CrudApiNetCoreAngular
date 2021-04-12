import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel, IdentType } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { combineLatest } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {

  user: UserModel;
  usuarios: UserModel[];
  identType = Array<IdentType>();

  constructor(private auth: AuthService, private router: Router) {}


  ngOnInit(): void {

    combineLatest([
      this.auth.getUsers(),
      this.auth.getIdentTypes()
     ]).subscribe( ( [ respUser, respTypes ] ) => {

      this.usuarios = respUser;
      this.identType = respTypes;

      this.usuarios.forEach( u => {
        const ti = this.identType.find( e => e.id === u.idTipoIdentificacion );
        u.TipoIdentificacion = ti.nombre;
      });

     });
  }

  logOut(): void {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  onSubmit(form: NgForm): any {

    if ( form.valid ){
      this.auth.editUser( form.value ).subscribe(
        resp => {

          const index = this.usuarios.findIndex( u => u.id === this.user.id );
          const ti = this.identType.find( e => e.id === form.value.idTipoIdentificacion );
          form.value.TipoIdentificacion = ti.nombre;
          this.usuarios[index] = form.value;

          Swal.fire({
            title: 'Usuario Actualizado',
            text: form.value.nombre,
            icon: 'success'
          });
        }, ( error ) => {
          console.log(error);

          Swal.fire({
            title: 'Error',
            text: error,
            icon: 'error'
          });

        });
    }

  }

  setModal(content: UserModel ): void {

    this.user = content;
  }

  deleteUser(id: string): void {

    this.auth.deleteUser(id).subscribe(
      resp => {
        const index = this.usuarios.findIndex( u => u.id === resp.id );
        this.usuarios.splice( index, 1 );
        Swal.fire({
          title: 'Usuario eliminado',
          text: resp.nombre,
          icon: 'success'
        });
      }, ( error ) => {
        console.log(error);

        Swal.fire({
          title: 'Error',
          text: error.error.title,
          icon: 'error'
        });

      });
  }
}
