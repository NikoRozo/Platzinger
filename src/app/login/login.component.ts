import { UserService } from './../services/user.service';
import { User } from './../interfaces/user';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation: string = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;
  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password).then( (data) => {
      alert('Logeando Correctamente');
      console.log(data);
      this.router.navigate(['home']);
    }).catch( (error) => {
      alert('Ocurrio error');
      console.log(error);
    });
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password).then( (data) => {
      const user: User = {
        uid: data.user.uid,
        email: this.email,
        nick: this.nick
      };
      this.userService.createUser(user).then( (dataUser) => {
        alert('Registrado Correctamente');
        console.log(dataUser);
      }).catch( (error) => {
        alert('Ocurrio error');
        console.log(error);
      });;
    }).catch( (error) => {
      alert('Ocurrio error');
      console.log(error);
    });
  }

}
