import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from '../../models/user.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {

  usuarios: UserModel[];

  constructor(private auth: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.auth.getUsers().subscribe(
      resp => this.usuarios = resp
    );
  }

  logOut(): void {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  setModal(content , id){

    console.log(content, id);
  }

  deleteUser(id){

    console.log(id);
  }
}
